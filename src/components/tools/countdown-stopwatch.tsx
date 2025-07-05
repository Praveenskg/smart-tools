import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";

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
  const [minutesInput, setMinutesInput] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const remainingMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  useEffect(() => {
    if (running && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    if (totalSeconds === 0 && running) {
      clearInterval(intervalRef.current!);
      setRunning(false);
      toast("⏰ Time's Up!", {
        description: "Your countdown has completed.",
      });
    }

    return () => clearInterval(intervalRef.current!);
  }, [running, totalSeconds]);

  const start = () => {
    const total = minutesInput * 60 + secondsInput;
    if (total > 0) {
      setTotalSeconds(total);
      setRunning(true);
      setPaused(false);
    }
  };

  const pause = () => {
    setRunning(false);
    setPaused(true);
  };

  const resume = () => {
    setRunning(true);
    setPaused(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setPaused(false);
    setTotalSeconds(0);
    setMinutesInput(0);
    setSecondsInput(0);
  };
  const totalInitialSeconds = minutesInput * 60 + secondsInput || 1;
  const circumference = 2 * Math.PI * 45;
  const offset =
    running || paused
      ? circumference - (totalSeconds / totalInitialSeconds) * circumference
      : circumference;

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full success-gradient"></div>
          Countdown Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!running && !paused ? (
          <>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                max={59}
                placeholder="Minutes"
                value={minutesInput || ""}
                onChange={e => setMinutesInput(parseInt(e.target.value) || 0)}
              />
              <Input
                type="number"
                min={0}
                max={59}
                placeholder="Seconds"
                value={secondsInput || ""}
                onChange={e => setSecondsInput(parseInt(e.target.value) || 0)}
              />
            </div>
            <Button onClick={start} disabled={minutesInput === 0 && secondsInput === 0}>
              Start
            </Button>
          </>
        ) : (
          <>
            <div className="relative w-56 h-56 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#4caf50"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-mono font-bold">
                  {String(remainingMinutes).padStart(2, "0")}:
                  {String(remainingSeconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {running ? (
                <Button onClick={pause} className="w-1/2 bg-red-500 hover:bg-red-600 text-white">
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={resume}
                  className="w-1/2 bg-green-600 hover:bg-green-700 text-white"
                >
                  Resume
                </Button>
              )}
              <Button variant="outline" onClick={reset} className="w-1/2">
                Reset
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleLap = () => {
    if (running) {
      setLaps(prev => [time, ...prev]);
    }
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stopwatch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-5xl font-bold font-mono">{formatTime(time)}</div>

        <div className="flex justify-center gap-3">
          {running ? (
            <>
              <Button onClick={handleStop} className="bg-red-500 hover:bg-red-600 text-white">
                Stop
              </Button>
              <Button variant="outline" onClick={handleLap}>
                Lap
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700 text-white">
                {time === 0 ? "Start" : "Resume"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={time === 0}
                className={time === 0 ? "cursor-not-allowed opacity-50" : ""}
              >
                Reset
              </Button>
            </>
          )}
        </div>

        {laps.length > 0 && (
          <div className="pt-4">
            <div className="border rounded-md">
              <div className="flex justify-between  py-2 border-b text-sm font-semibold text-muted-foreground bg-muted">
                <span className="w-1/3 text-center">Lap</span>
                <span className="w-1/3 text-center">Lap Time</span>
                <span className="w-1/3 text-center">Overall Time</span>
              </div>

              <ScrollArea className="max-h-100 overflow-auto">
                <ul className="text-sm divide-y">
                  {laps.map((lap, idx) => {
                    const currentLapTime = lap;
                    const previousLapTime = laps[idx + 1] ?? 0;
                    const lapDiff = currentLapTime - previousLapTime;
                    return (
                      <li key={idx} className="flex justify-between  py-2 items-center">
                        <span className="w-1/3 text-center">{laps.length - idx}</span>
                        <span className="w-1/3 text-center font-mono text-blue-600">
                          {formatTime(lapDiff)}
                        </span>
                        <span className="w-1/3 text-center font-mono text-muted-foreground">
                          {formatTime(currentLapTime)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
