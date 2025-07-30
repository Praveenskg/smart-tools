'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { motion } from 'motion/react';
import { useState } from 'react';
interface BMIResult {
  bmi: number;
  category: string;
  status: 'underweight' | 'normal' | 'overweight' | 'obese';
  idealWeightRange: { min: number; max: number };
}

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const weightKg = Number.parseFloat(weight);
    const heightM = Number.parseFloat(height) / 100;

    if (!weightKg || !heightM) return;

    const bmi = weightKg / (heightM * heightM);
    let category: string;
    let status: 'underweight' | 'normal' | 'overweight' | 'obese';

    if (bmi < 18.5) {
      category = 'Underweight';
      status = 'underweight';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      status = 'normal';
    } else if (bmi < 30) {
      category = 'Overweight';
      status = 'overweight';
    } else {
      category = 'Obese';
      status = 'obese';
    }

    const idealWeightRange = {
      min: 18.5 * heightM * heightM,
      max: 24.9 * heightM * heightM,
    };

    setResult({
      bmi,
      category,
      status,
      idealWeightRange,
    });
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  const getBMIColor = (status: string) => {
    switch (status) {
      case 'underweight':
        return 'text-blue-600';
      case 'normal':
        return 'text-green-600';
      case 'overweight':
        return 'text-yellow-600';
      case 'obese':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBMIProgress = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25;
    return Math.min(100, 75 + ((bmi - 30) / 10) * 25);
  };

  return (
    <div className='space-y-6 sm:space-y-8'>
      <div className='grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8'>
        <Card className='modern-card'>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>Body Measurements</CardTitle>
            <CardDescription className='text-sm sm:text-base'>
              Enter your height and weight to calculate BMI
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 sm:space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='weight' className='text-sm sm:text-base'>
                Weight (kg)
              </Label>
              <Input
                id='weight'
                type='number'
                placeholder='Enter your weight'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='height' className='text-sm sm:text-base'>
                Height (cm)
              </Label>
              <Input
                id='height'
                type='number'
                placeholder='Enter your height'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              <Button onClick={calculateBMI} className='flex-1 text-sm sm:text-base'>
                Calculate BMI
              </Button>
              <Button onClick={resetForm} variant='outline' className='flex-1 text-sm sm:text-base'>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className='modern-card'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg sm:text-xl'>
                  <div className='success-gradient h-2 w-2 rounded-full'></div>
                  BMI Results
                </CardTitle>
                <CardDescription className='text-sm sm:text-base'>
                  Your body mass index and health status
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 sm:space-y-6'>
                <div className='from-primary/5 to-primary/10 border-primary/20 rounded-xl border bg-linear-to-br p-4 text-center sm:p-6'>
                  <div className='text-primary mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl'>
                    {result.bmi.toFixed(1)}
                  </div>
                  <Badge
                    variant='secondary'
                    className={`${getBMIColor(
                      result.status,
                    )} from-secondary to-secondary/80 bg-linear-to-r text-xs sm:text-sm`}
                  >
                    {result.category}
                  </Badge>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-xs sm:text-sm'>
                    <span>BMI Scale</span>
                    <span>{result.bmi.toFixed(1)}</span>
                  </div>
                  <Progress
                    value={getBMIProgress(result.bmi)}
                    className={`h-2 ${
                      result.status === 'underweight'
                        ? 'bg-blue-200'
                        : result.status === 'normal'
                          ? 'bg-green-200'
                          : result.status === 'overweight'
                            ? 'bg-yellow-200'
                            : 'bg-red-200'
                    }`}
                  />

                  <div className='text-muted-foreground flex justify-between text-xs'>
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>

                <div className='space-y-3 sm:space-y-4'>
                  <div className='rounded-lg border p-3 sm:p-4'>
                    <h4 className='mb-2 text-sm font-semibold sm:text-base'>Ideal Weight Range</h4>
                    <p className='text-muted-foreground text-xs sm:text-sm'>
                      {result.idealWeightRange.min.toFixed(1)} kg -{' '}
                      {result.idealWeightRange.max.toFixed(1)} kg
                    </p>
                  </div>

                  <div className='rounded-lg bg-blue-50 p-3 sm:p-4 dark:bg-blue-950/20'>
                    <h4 className='mb-2 text-sm font-semibold sm:text-base'>
                      Health Recommendation
                    </h4>
                    <p className='text-xs sm:text-sm'>
                      {result.status === 'normal'
                        ? 'Great! You have a healthy BMI. Maintain your current lifestyle.'
                        : result.status === 'underweight'
                          ? 'Consider consulting a healthcare provider about healthy weight gain strategies.'
                          : 'Consider consulting a healthcare provider about healthy weight management strategies.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg sm:text-xl'>BMI Categories</CardTitle>
          <CardDescription className='text-sm sm:text-base'>
            Understanding BMI ranges and their meanings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
            <div className='modern-card rounded-xl border p-3 text-center sm:p-4'>
              <div className='text-sm font-semibold text-blue-500 sm:text-base'>Underweight</div>
              <div className='text-muted-foreground text-xs sm:text-sm'>Below 18.5</div>
            </div>
            <div className='modern-card rounded-xl border p-3 text-center sm:p-4'>
              <div className='text-sm font-semibold text-green-500 sm:text-base'>Normal Weight</div>
              <div className='text-muted-foreground text-xs sm:text-sm'>18.5 - 24.9</div>
            </div>
            <div className='modern-card rounded-xl border p-3 text-center sm:p-4'>
              <div className='text-sm font-semibold text-yellow-500 sm:text-base'>Overweight</div>
              <div className='text-muted-foreground text-xs sm:text-sm'>25.0 - 29.9</div>
            </div>
            <div className='modern-card rounded-xl border p-3 text-center sm:p-4'>
              <div className='text-sm font-semibold text-red-500 sm:text-base'>Obese</div>
              <div className='text-muted-foreground text-xs sm:text-sm'>30.0 and above</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
