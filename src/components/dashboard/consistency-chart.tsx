"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartData = [
  { week: "Week 1", consistency: 75 },
  { week: "Week 2", consistency: 80 },
  { week: "Week 3", consistency: 70 },
  { week: "Week 4", consistency: 85 },
  { week: "Week 5", consistency: 90 },
  { week: "Week 6", consistency: 88 },
];

const chartConfig = {
  consistency: {
    label: "Consistency",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function ConsistencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-primary" />
            <span>Consistency Trend</span>
        </CardTitle>
        <CardDescription>Your weekly consistency in completing tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="consistency"
              type="monotone"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                fill: "hsl(var(--primary))",
                r: 5,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
