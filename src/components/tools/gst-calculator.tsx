"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GSTResult {
  originalAmount: number
  gstAmount: number
  totalAmount: number
  gstRate: number
}

export default function GSTCalculator() {
  const [amount, setAmount] = useState<string>("")
  const [gstRate, setGstRate] = useState<string>("18")
  const [calculationType, setCalculationType] = useState<string>("exclusive")
  const [result, setResult] = useState<GSTResult | null>(null)

  const calculateGST = () => {
    const baseAmount = Number.parseFloat(amount)
    const rate = Number.parseFloat(gstRate) / 100

    if (!baseAmount || !rate) return

    let originalAmount: number
    let gstAmount: number
    let totalAmount: number

    if (calculationType === "exclusive") {
      originalAmount = baseAmount
      gstAmount = baseAmount * rate
      totalAmount = baseAmount + gstAmount
    } else {
      totalAmount = baseAmount
      originalAmount = baseAmount / (1 + rate)
      gstAmount = totalAmount - originalAmount
    }

    setResult({
      originalAmount,
      gstAmount,
      totalAmount,
      gstRate: Number.parseFloat(gstRate),
    })
  }

  const resetForm = () => {
    setAmount("")
    setGstRate("18")
    setCalculationType("exclusive")
    setResult(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>GST Calculation</CardTitle>
          <CardDescription>Calculate GST amount and total price</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>GST Rate</Label>
            <Select value={gstRate} onValueChange={setGstRate}>
              <SelectTrigger>
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% (Exempt)</SelectItem>
                <SelectItem value="5">5% (Essential goods)</SelectItem>
                <SelectItem value="12">12% (Standard goods)</SelectItem>
                <SelectItem value="18">18% (Most goods & services)</SelectItem>
                <SelectItem value="28">28% (Luxury goods)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Calculation Type</Label>
            <RadioGroup value={calculationType} onValueChange={setCalculationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exclusive" id="exclusive" />
                <Label htmlFor="exclusive">GST Exclusive (Add GST to amount)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inclusive" id="inclusive" />
                <Label htmlFor="inclusive">GST Inclusive (Extract GST from amount)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateGST} className="flex-1">
              Calculate GST
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>GST Calculation Results</CardTitle>
            <CardDescription>Breakdown of GST calculation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span>Original Amount</span>
                <span className="font-semibold">{formatCurrency(result.originalAmount)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                <span>GST Amount ({result.gstRate}%)</span>
                <span className="font-semibold text-primary">{formatCurrency(result.gstAmount)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-muted rounded-lg border-2">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold">{formatCurrency(result.totalAmount)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-semibold mb-2">Calculation Summary:</h4>
              <p className="text-sm text-muted-foreground">
                {calculationType === "exclusive"
                  ? `GST of ${result.gstRate}% has been added to the original amount.`
                  : `GST of ${result.gstRate}% has been extracted from the total amount.`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
