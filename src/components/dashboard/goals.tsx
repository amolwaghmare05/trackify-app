import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function Goals() {
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
        <Button>
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
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
