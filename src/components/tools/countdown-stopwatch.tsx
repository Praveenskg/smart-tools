import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TimerTools() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="countdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="countdown">Countdown</TabsTrigger>
          <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
        </TabsList>
        <TabsContent value="countdown">
          <CountdownTimer />
        </TabsContent>
        <TabsContent value="stopwatch">
          <Stopwatch />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CountdownTimer() {
  const [input, setInput] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    if (seconds === 0 && running) {
      setRunning(false);
      alert("\u23F0 Time's up!");
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, seconds]);

  const start = () => {
    if (input > 0) {
      setSeconds(input);
      setRunning(true);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setSeconds(0);
    setInput(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Enter seconds"
          value={input || ""}
          onChange={e => setInput(parseInt(e.target.value) || 0)}
          disabled={running}
        />
        <div className="text-4xl font-bold text-center">{seconds}s</div>
        <div className="flex justify-center gap-2">
          <Button onClick={start} disabled={running || input <= 0}>
            Start
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setTime(0);
    clearInterval(intervalRef.current!);
  };

  const format = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stopwatch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold text-center">{format(time)}</div>
        <div className="flex justify-center gap-2">
          <Button onClick={() => setRunning(true)} disabled={running}>
            Start
          </Button>
          <Button onClick={() => setRunning(false)} disabled={!running}>
            Pause
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
