'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner';
import { Pause, RotateCcw, Play, Bell, StopCircle, Flag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TimePickerColumn } from '../TimePickerColumn';

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
  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const remainingHours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  const totalInitialSeconds =
    hoursInput * 3600 + minutesInput * 60 + secondsInput || 1;

  const circumference = 2 * Math.PI * 45;
  const offset =
    running || paused
      ? circumference - (totalSeconds / totalInitialSeconds) * circumference
      : circumference;

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
      const alarm = new Audio('/alarm.mp3');
      alarm.play();
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      toast("\u23F0 Time's Up!", {
        description: 'Your countdown has completed.',
      });
    }

    return () => clearInterval(intervalRef.current!);
  }, [running, totalSeconds]);

  const start = () => {
    const total = hoursInput * 3600 + minutesInput * 60 + secondsInput;
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
    setHoursInput(0);
  };

  return (
    <div className="flex justify-center transition-all duration-500 px-4">
      <Card
        className={`w-full max-w-xl ${running ? 'max-w-4xl' : ''} transition-all duration-500`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Countdown Timer
          </CardTitle>
          <CardDescription>
            Select hours, minutes, and seconds by scrolling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {!running && !paused ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex justify-center gap-4 w-full  mx-auto">
                    <TimePickerColumn
                      label="Hours"
                      max={24}
                      value={hoursInput}
                      onChange={setHoursInput}
                      id="hours-scroll"
                    />
                    <TimePickerColumn
                      label="Minutes"
                      max={60}
                      value={minutesInput}
                      onChange={setMinutesInput}
                      id="minutes-scroll"
                    />
                    <TimePickerColumn
                      label="Seconds"
                      max={60}
                      value={secondsInput}
                      onChange={setSecondsInput}
                      id="seconds-scroll"
                    />
                  </div>

                  <Button
                    onClick={start}
                    disabled={
                      hoursInput === 0 &&
                      minutesInput === 0 &&
                      secondsInput === 0
                    }
                    className="w-full sm:w-1/2"
                  >
                    Start
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="timer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative w-56 h-56 mx-auto ${running && !paused ? 'animate-pulse' : ''}`}
                >
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
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
                      style={{ transition: 'stroke-dashoffset 0.5s linear' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col justify-center items-center space-y-5">
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(totalInitialSeconds / 3600) > 0 &&
                        `${Math.floor(totalInitialSeconds / 3600)}h `}
                      {Math.floor((totalInitialSeconds % 3600) / 60) > 0 &&
                        `${Math.floor((totalInitialSeconds % 3600) / 60)}m `}
                      {totalInitialSeconds % 60 > 0 &&
                        `${totalInitialSeconds % 60}s`}
                    </div>
                    <span className="text-3xl font-mono font-bold">
                      {remainingHours > 0 &&
                        `${String(remainingHours).padStart(2, '0')}:`}
                      {String(remainingMinutes).padStart(2, '0')}:
                      {String(remainingSeconds).padStart(2, '0')}
                    </span>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Bell className="h-4 w-4" />
                      {new Date(
                        Date.now() + totalSeconds * 1000,
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  {running ? (
                    <Button
                      onClick={pause}
                      className="w-1/2 bg-red-500 hover:bg-red-600 text-white active:scale-95 transition-all"
                    >
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </Button>
                  ) : (
                    <Button
                      onClick={resume}
                      className="w-1/2 bg-green-600 hover:bg-green-700 text-white active:scale-95 transition-all"
                    >
                      <Play className="mr-2 h-4 w-4" /> Resume
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="w-1/2 active:scale-95 transition-all"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
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

  function formatTime(ms: number) {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    return `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(
      minutes,
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
      milliseconds,
    ).padStart(2, '0')}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stopwatch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="display"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-center text-5xl font-bold font-mono"
          >
            {formatTime(time)}
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {running ? (
              <motion.div
                key="running"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                <Button
                  onClick={handleStop}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLap}
                  className="w-full"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Lap
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="stopped"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                <Button
                  onClick={handleStart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {time === 0 ? 'Start' : 'Resume'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={time === 0}
                  className={`w-full ${
                    time === 0 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {laps.length > 0 && (
          <div className="pt-4">
            <div className="border rounded-lg">
              <div className="flex justify-between py-2 text-sm font-semibold text-muted-foreground bg-muted rounded-t-lg">
                <span className="w-1/3 text-center">Lap</span>
                <span className="w-1/3 text-center">Lap Time</span>
                <span className="w-1/3 text-center">Overall Time</span>
              </div>

              <ScrollArea className="max-h-100 overflow-auto scrollbar-hide">
                <ul className="text-sm divide-y">
                  <AnimatePresence>
                    {laps.map((lap, idx) => {
                      const currentLapTime = lap;
                      const previousLapTime = laps[idx + 1] ?? 0;
                      const lapDiff = currentLapTime - previousLapTime;
                      return (
                        <motion.li
                          key={lap}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex justify-between py-2 items-center"
                        >
                          <span className="w-1/3 text-center">
                            {laps.length - idx}
                          </span>
                          <span className="w-1/3 text-center font-mono text-blue-600">
                            {formatTime(lapDiff)}
                          </span>
                          <span className="w-1/3 text-center font-mono text-muted-foreground">
                            {formatTime(currentLapTime)}
                          </span>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </ScrollArea>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
