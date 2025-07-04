"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Pencil,
  CheckSquare,
  Calendar as CalendarIcon,
  GripVertical,
} from "lucide-react";
import { format, isToday, isPast, parseISO } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  priority?: "high" | "medium" | "low";
  edited?: boolean;
}
const STORAGE_KEY = "smart-tools-todos";

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>();
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const saveTodosToLocalStorage = (todosToSave: TodoItem[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todosToSave));
        console.log("Saved todos to localStorage:", todosToSave);
      } catch (error) {
        console.error("Error saving todos to localStorage:", error);
      }
    }
  };

  const loadFromLocalStorage = (): TodoItem[] => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      if (savedTodos) {
        try {
          const parsed = JSON.parse(savedTodos);
          setTodos(parsed);
          console.log("Loaded from localStorage:", parsed);
          return parsed;
        } catch (error) {
          console.error("Error loading from localStorage:", error);
          localStorage.removeItem(STORAGE_KEY);
        }
      } else {
        console.log("No data found in localStorage");
      }
    }
    return [];
  };


  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      saveTodosToLocalStorage(todos);
    }
  }, [todos]);

  const addTodo = () => {
    if (!newTask.trim()) return;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      task: newTask.trim(),
      completed: false,
      dueDate: newDueDate?.toISOString(),
      createdAt: new Date().toISOString(),
      priority: newPriority,
      edited: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTask("");
    setNewDueDate(undefined);
    setNewPriority("medium");
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };


  const confirmDelete = () => {
    if (confirmDeleteId) {
      setTodos(todos.filter(t => t.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const confirmClear = () => {
    setTodos([]);
    localStorage.removeItem(STORAGE_KEY);
    setConfirmClearAll(false);
  };

  const saveEdit = () => {
    if (editTaskId && editTaskValue.trim()) {
      setTodos(todos.map(t =>
        t.id === editTaskId ? { ...t, task: editTaskValue.trim(), edited: true } : t
      ));
      setEditTaskId(null);
      setEditTaskValue("");
    }
  };


  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(t => t.id === active.id);
      const newIndex = todos.findIndex(t => t.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  const filteredTodos = filter === "all"
    ? todos
    : todos.filter(t => (filter === "completed" ? t.completed : !t.completed));

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" /> Todo Summary
          </CardTitle>
          <CardDescription>Overview of your tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <div className="text-xl font-bold">{todos.length}</div>
            <div className="text-muted-foreground text-sm">Total Tasks</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-xl font-bold text-green-600">{todos.filter(t => t.completed).length}</div>
            <div className="text-muted-foreground text-sm">Completed</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-xl font-bold text-yellow-600">{todos.filter(t => !t.completed).length}</div>
            <div className="text-muted-foreground text-sm">Pending</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Manage Your Tasks</CardTitle>
          {todos.length > 0 && (
            <Dialog open={confirmClearAll} onOpenChange={setConfirmClearAll}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" /> Clear All
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear All Tasks</DialogTitle>
                  <DialogDescription>This will delete all your tasks. Are you sure?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setConfirmClearAll(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmClear}>Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Add a new task"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTodo()}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newDueDate ? format(newDueDate, "PPP") : "Set Due Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar mode="single" selected={newDueDate} onSelect={setNewDueDate} />
              </PopoverContent>
            </Popover>
            <select
              className="border rounded px-2 text-sm"
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as any)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button onClick={addTodo}>Add</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "completed", "pending"].map(type => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                onClick={() => setFilter(type as any)}
                size="sm"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredTodos.map(t => t.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                  <p className="text-muted-foreground text-center">No tasks found.</p>
                ) : (
                  filteredTodos.map(todo => (
                    <SortableItem key={todo.id} id={todo.id}>
                      <Card className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className={`text-sm font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                              {editTaskId === todo.id ? (
                                <Input
                                  value={editTaskValue}
                                  onChange={e => setEditTaskValue(e.target.value)}
                                  onKeyDown={e => e.key === "Enter" && saveEdit()}
                                />
                              ) : (
                                todo.task
                              )}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant={todo.completed ? "secondary" : "outline"}>
                                {todo.completed ? "Completed" : "Pending"}
                              </Badge>
                              {todo.dueDate && (
                                <Badge variant="outline" className={isPast(parseISO(todo.dueDate)) && !todo.completed ? "bg-red-200 text-red-800" : isToday(parseISO(todo.dueDate)) ? "bg-yellow-200 text-yellow-800" : ""}>
                                  Due: {format(new Date(todo.dueDate), "dd MMM yyyy")}
                                </Badge>
                              )}
                              <Badge variant="outline">Priority: {todo.priority}</Badge>
                              {todo.edited && <Badge variant="outline">Edited</Badge>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <GripVertical className="cursor-move mt-1" />
                            {editTaskId === todo.id ? (
                              <Button size="sm" onClick={saveEdit}>Save</Button>
                            ) : (
                              <>
                                <Button size="icon" variant="ghost" onClick={() => toggleComplete(todo.id)} className="text-green-600">
                                  ✓
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => {
                                  setEditTaskId(todo.id);
                                  setEditTaskValue(todo.task);
                                }}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Dialog open={confirmDeleteId === todo.id} onOpenChange={open => !open && setConfirmDeleteId(null)}>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost" className="text-red-600" onClick={() => setConfirmDeleteId(todo.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Delete Task</DialogTitle>
                                      <DialogDescription>Are you sure you want to delete <strong>{todo.task}</strong>?</DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-end gap-2 pt-4">
                                      <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                                      <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </>
                            )}
                          </div>
                        </div>
                      </Card>
                    </SortableItem>
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
