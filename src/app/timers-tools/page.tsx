import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TimerTools from '@/components/tools/countdown-stopwatch';

export default function TimersToolsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Timers
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-2">
                Track time with countdown and stopwatch features
              </p>
            </div>
            <div className="w-full flex justify-center sm:justify-start my-4 sm:my-6">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md border border-border">
              <CardContent className="p-4 sm:p-6">
                <TimerTools />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title:
    'Timers Tools - Countdown, Stopwatch & Pomodoro | tools.praveensingh.online',
  description:
    'Use free and reliable timer tools including countdown timer, stopwatch, and Pomodoro timer. Perfect for productivity, workouts, cooking, and time management.',
  keywords: [
    'timer',
    'countdown timer',
    'online stopwatch',
    'pomodoro timer',
    'focus timer',
    'online timer tools',
    'timers for productivity',
    'study timer',
    'tools.praveensingh.online',
    'workout timer',
  ],
  openGraph: {
    title: 'Timers Tools - Countdown, Stopwatch & Pomodoro',
    description:
      'Free online tools to measure and manage time effectively: countdown, stopwatch, Pomodoro timer, and more.',
    url: 'https://tools.praveensingh.online/timers',
    siteName: 'Tools by Praveen Singh',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://tools.praveensingh.online/og-timers.png',
        width: 1200,
        height: 630,
        alt: 'Timers Tools - tools.praveensingh.online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timers Tools - Countdown, Stopwatch & Pomodoro',
    description:
      'Track time easily with our timer tools including countdowns, stopwatch, and Pomodoro focus sessions. Free and user-friendly.',
    images: ['https://tools.praveensingh.online/og-timers.png'],
  },
};
