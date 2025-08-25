"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
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
import { CheckCircle } from "lucide-react";

const chartData = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 3 },
  { day: "Thu", tasks: 6 },
  { day: "Fri", tasks: 7 },
  { day: "Sat", tasks: 4 },
  { day: "Sun", tasks: 2 },
];

const chartConfig = {
  tasks: {
    label: "Tasks Completed",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-primary" />
            <span>Weekly Progress</span>
        </CardTitle>
        <CardDescription>Tasks completed this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
