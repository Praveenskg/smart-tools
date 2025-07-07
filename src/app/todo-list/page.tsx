'use client';

import { CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import { useDynamicTitle } from '@/hooks/use-dynamic-title';
import TodoList from '@/components/tools/todo-list';

export default function TodoPage() {
  useDynamicTitle({
    currentTool: {
      id: 'todo-list',
      name: 'Todo List',
      category: 'Productivity',
      description: 'Create, manage, and complete your daily tasks efficiently',
    },
    selectedCategory: 'Productivity',
    baseTitle: 'Smart Tools',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Todo List" icon={CheckSquare} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
              <p className="text-lg text-muted-foreground">
                Create, manage, and complete your daily tasks efficiently
              </p>
            </div>
            <div className="w-full flex justify-center sm:justify-start my-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md border border-border">
              <CardContent className="p-6">
                <TodoList />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
