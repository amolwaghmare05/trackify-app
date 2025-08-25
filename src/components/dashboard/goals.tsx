"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Learn Next.js 14",
    progress: 75,
    tasksCompleted: "3/4",
  },
  {
    id: 2,
    title: "Read 'Atomic Habits'",
    progress: 40,
    tasksCompleted: "2/5 chapters",
  },
  {
    id: 3,
    title: "Morning Jogging Routine",
    progress: 90,
    tasksCompleted: "27/30 days",
  },
];

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Goal title is required.",
  }),
  tasksCompleted: z.string().min(1, {
    message: "Initial progress/tasks completed is required.",
  }),
});

export default function Goals() {
  const [goals, setGoals] = useState([ ...goals ]);

 const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-primary"/>
            <span>Your Goals</span>
          </CardTitle>
          <CardDescription>
            An overview of your current goals and progress.
          </CardDescription>
        </div>
 <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
 <DialogContent>
 <DialogHeader>
 <DialogTitle>Add New Goal</DialogTitle>
 <DialogDescription>
 Enter the details for your new goal.
 </DialogDescription>
 </DialogHeader>
 <Form {...form}>
 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 <FormField
 control={form.control}
 name="title"
 render={({ field }) => (
 <FormItem>
 <FormLabel>Goal Title</FormLabel>
 <FormControl>
 <input placeholder="e.g. Run a marathon" {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
            />
 <FormField
 control={form.control}
 name="tasksCompleted"
 render={({ field }) => (
 <FormItem>
 <FormLabel>Initial Progress/Tasks Completed</FormLabel>
 <FormControl>
 <input placeholder="e.g. 0/26.2 miles" {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
            />
 <DialogFooter>
 <Button type="submit">Add Goal</Button>
 </DialogFooter>
 </form>
 </Form>
 </DialogContent>
 </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{goal.title}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.tasksCompleted}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
