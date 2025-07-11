'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please enter your birth date!');
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert('Birth date cannot be in the future!');
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths });
  };

  const resetForm = () => {
    setBirthDate('');
    setTargetDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2"
    >
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Date Information</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your birth date and a target date to calculate your age.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Calculate Age On</Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
              <Button
                onClick={calculateAge}
                className="w-full text-sm sm:text-base"
              >
                Calculate Age
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
              <Button
                onClick={resetForm}
                variant="outline"
                className="w-full text-sm sm:text-base"
              >
                Reset
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Age Result</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Breakdown of your exact age
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="text-center p-4 sm:p-6 bg-primary/5 rounded-lg">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {result.years} Years, {result.months} Months, {result.days}{' '}
                  Days
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 border rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {result.totalDays}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Total Days
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 border rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {result.totalWeeks}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Total Weeks
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 border rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {result.totalMonths}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Total Months
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 border rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {result.years}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Total Years
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
