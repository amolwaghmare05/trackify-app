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
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";

const initialGoals = [
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

type Goal = {
  id: number;
  title: string;
  progress: number;
  tasksCompleted: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([ ...initialGoals ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tasksCompleted: "",
    },
  });

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tasksCompleted: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newGoal = {
      id: goals.length + 1, // Simple way to generate a unique ID
      title: values.title,
      progress: 0, // New goals start with 0 progress
      tasksCompleted: values.tasksCompleted,
    };
    setGoals([...goals, newGoal]);
    setIsDialogOpen(false);
    form.reset(); // Reset the form after submission
  }

  function handleEditClick(goal: Goal) { 
    editForm.reset({title: goal.title, tasksCompleted: goal.tasksCompleted}); // Reset and populate edit form
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  }

  function handleEditSubmit(values: z.infer<typeof formSchema>) {
    if (!editingGoal) return;

    setGoals(goals.map(goal =>
      goal.id === editingGoal.id ? { ...goal, ...values } : goal
    ));
    setIsEditDialogOpen(false);
    setEditingGoal(null); // Clear editing goal
    editForm.reset(); // Reset the edit form
  }

  function handleEditDialogClose() {
    setIsEditDialogOpen(false);
    setEditingGoal(null);
  }

 return (
  <>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-primary" />
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
                <Button variant="ghost" size="sm" onClick={() => handleEditClick(goal)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit goal</span>
                </Button>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Add Goal Dialog */}
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
                    <Input placeholder="e.g. Run a marathon" {...field} />
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
                    <Input placeholder="e.g. 0/26.2 miles" {...field} />
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
    
    {/* Edit Goal Dialog */}
    <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogClose}>
      <DialogContent onEscapeKeyDown={handleEditDialogClose} onInteractOutside={handleEditDialogClose}>
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>
            Edit the details of your goal.
          </DialogDescription>
        </DialogHeader>
        {editingGoal && ( // Render form only when a goal is being edited
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-8">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Run a marathon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="tasksCompleted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Progress/Tasks Completed</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 0/26.2 miles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  </>
);
}