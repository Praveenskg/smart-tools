"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AreaCalculator() {
  const [shape, setShape] = useState<string>("rectangle");
  const [dimensions, setDimensions] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<number | null>(null);

  const calculateArea = () => {
    const dims = Object.fromEntries(
      Object.entries(dimensions).map(([key, value]) => [
        key,
        Number.parseFloat(value),
      ])
    );

    let area = 0;

    switch (shape) {
      case "rectangle":
        if (dims.length && dims.width) {
          area = dims.length * dims.width;
        }
        break;
      case "square":
        if (dims.side) {
          area = dims.side * dims.side;
        }
        break;
      case "circle":
        if (dims.radius) {
          area = Math.PI * dims.radius * dims.radius;
        }
        break;
      case "triangle":
        if (dims.base && dims.height) {
          area = 0.5 * dims.base * dims.height;
        }
        break;
      case "trapezoid":
        if (dims.base1 && dims.base2 && dims.height) {
          area = 0.5 * (dims.base1 + dims.base2) * dims.height;
        }
        break;
      case "ellipse":
        if (dims.majorAxis && dims.minorAxis) {
          area = Math.PI * dims.majorAxis * dims.minorAxis;
        }
        break;
    }

    setResult(area);
  };

  const updateDimension = (key: string, value: string) => {
    setDimensions((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setDimensions({});
    setResult(null);
  };

  const getShapeInputs = () => {
    switch (shape) {
      case "rectangle":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                placeholder="Enter length"
                value={dimensions.length || ""}
                onChange={(e) => updateDimension("length", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                placeholder="Enter width"
                value={dimensions.width || ""}
                onChange={(e) => updateDimension("width", e.target.value)}
              />
            </div>
          </>
        );
      case "square":
        return (
          <div className="space-y-2">
            <Label htmlFor="side">Side Length</Label>
            <Input
              id="side"
              type="number"
              placeholder="Enter side length"
              value={dimensions.side || ""}
              onChange={(e) => updateDimension("side", e.target.value)}
            />
          </div>
        );
      case "circle":
        return (
          <div className="space-y-2">
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              type="number"
              placeholder="Enter radius"
              value={dimensions.radius || ""}
              onChange={(e) => updateDimension("radius", e.target.value)}
            />
          </div>
        );
      case "triangle":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="base">Base</Label>
              <Input
                id="base"
                type="number"
                placeholder="Enter base length"
                value={dimensions.base || ""}
                onChange={(e) => updateDimension("base", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height"
                value={dimensions.height || ""}
                onChange={(e) => updateDimension("height", e.target.value)}
              />
            </div>
          </>
        );
      case "trapezoid":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="base1">Base 1</Label>
              <Input
                id="base1"
                type="number"
                placeholder="Enter first base"
                value={dimensions.base1 || ""}
                onChange={(e) => updateDimension("base1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="base2">Base 2</Label>
              <Input
                id="base2"
                type="number"
                placeholder="Enter second base"
                value={dimensions.base2 || ""}
                onChange={(e) => updateDimension("base2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height"
                value={dimensions.height || ""}
                onChange={(e) => updateDimension("height", e.target.value)}
              />
            </div>
          </>
        );
      case "ellipse":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="majorAxis">Major Axis</Label>
              <Input
                id="majorAxis"
                type="number"
                placeholder="Enter major axis"
                value={dimensions.majorAxis || ""}
                onChange={(e) => updateDimension("majorAxis", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minorAxis">Minor Axis</Label>
              <Input
                id="minorAxis"
                type="number"
                placeholder="Enter minor axis"
                value={dimensions.minorAxis || ""}
                onChange={(e) => updateDimension("minorAxis", e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getFormula = () => {
    switch (shape) {
      case "rectangle":
        return "Area = Length × Width";
      case "square":
        return "Area = Side²";
      case "circle":
        return "Area = π × Radius²";
      case "triangle":
        return "Area = ½ × Base × Height";
      case "trapezoid":
        return "Area = ½ × (Base₁ + Base₂) × Height";
      case "ellipse":
        return "Area = π × Major Axis × Minor Axis";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="modern-card">
        <CardHeader>
          <CardTitle>Shape Selection</CardTitle>
          <CardDescription>
            Choose a shape and enter its dimensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Shape</Label>
            <Select
              value={shape}
              onValueChange={(value) => {
                setShape(value);
                setDimensions({});
                setResult(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
                <SelectItem value="trapezoid">Trapezoid</SelectItem>
                <SelectItem value="ellipse">Ellipse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">{getShapeInputs()}</div>

          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium">Formula:</div>
            <div className="text-sm text-muted-foreground">{getFormula()}</div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateArea} className="flex-1">
              Calculate Area
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="modern-card">
          <CardHeader>
            <CardTitle>Area Result</CardTitle>
            <CardDescription>
              Calculated area for the selected shape
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Area:</div>
              <div className="text-3xl font-bold text-primary">
                {result.toFixed(2)} units²
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">
                Shape: {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Dimensions:{" "}
                {Object.entries(dimensions)
                  .filter(([value]) => value)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-sm font-medium mb-1">Formula Used:</div>
              <div className="text-sm text-muted-foreground">
                {getFormula()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
