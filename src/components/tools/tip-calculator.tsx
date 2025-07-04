"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TipResult {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  perPersonTip: number;
}

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number[]>([15]);
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1");
  const [result, setResult] = useState<TipResult | null>(null);

  const calculateTip = () => {
    const bill = Number.parseFloat(billAmount);
    const tip = tipPercentage[0];
    const people = Number.parseInt(numberOfPeople);

    if (!bill || !people) return;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;
    const perPersonTip = tipAmount / people;

    setResult({
      billAmount: bill,
      tipPercentage: tip,
      tipAmount,
      totalAmount,
      perPersonAmount,
      perPersonTip,
    });
  };

  const resetForm = () => {
    setBillAmount("");
    setTipPercentage([15]);
    setNumberOfPeople("1");
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const quickTipButtons = [10, 15, 18, 20, 25];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="modern-card">
        <CardHeader>
          <CardTitle>Bill Information</CardTitle>
          <CardDescription>Enter bill details to calculate tip and split</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="billAmount">Bill Amount ($)</Label>
            <Input
              id="billAmount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount}
              onChange={e => setBillAmount(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Tip Percentage</Label>
              <span className="text-2xl font-bold gradient-text">{tipPercentage[0]}%</span>
            </div>
            <Slider
              value={tipPercentage}
              onValueChange={setTipPercentage}
              max={30}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex gap-2 flex-wrap">
              {quickTipButtons.map(tip => (
                <Button
                  key={tip}
                  variant={tipPercentage[0] === tip ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipPercentage([tip])}
                  className={tipPercentage[0] === tip ? "modern-button" : ""}
                >
                  {tip}%
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfPeople">Number of People</Label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                placeholder="Enter number of people"
                value={numberOfPeople}
                onChange={e => setNumberOfPeople(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateTip} className="flex-1">
              Calculate Tip
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full success-gradient"></div>
              Tip Calculation Results
            </CardTitle>
            <CardDescription>Bill breakdown and per-person amounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-linear-to-r from-muted to-muted/50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span>Bill Amount</span>
                  <span className="font-semibold">{formatCurrency(result.billAmount)}</span>
                </div>
              </div>

              <div className="p-4 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <div className="flex justify-between items-center">
                  <span>Tip ({result.tipPercentage}%)</span>
                  <span className="font-semibold text-primary">
                    {formatCurrency(result.tipAmount)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-linear-to-r from-muted to-muted/50 rounded-xl border-2 border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-xl font-bold gradient-text">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {Number.parseInt(numberOfPeople) > 1 && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Per Person ({numberOfPeople} people)
                </h4>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span>Amount per person</span>
                    <span className="font-semibold">{formatCurrency(result.perPersonAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tip per person</span>
                    <span className="font-semibold">{formatCurrency(result.perPersonTip)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-semibold mb-2">Quick Summary</h4>
              <p className="text-sm text-muted-foreground">
                {Number.parseInt(numberOfPeople) > 1
                  ? `Each person should pay ${formatCurrency(
                      result.perPersonAmount,
                    )} (including ${formatCurrency(result.perPersonTip)} tip).`
                  : `Total amount to pay: ${formatCurrency(
                      result.totalAmount,
                    )} (including ${formatCurrency(result.tipAmount)} tip).`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
