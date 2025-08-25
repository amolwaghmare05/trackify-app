import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const tasks = [
  { id: 1, title: "Complete Chapter 3 tutorial", goal: "Learn Next.js 14", completed: true },
  { id: 2, title: "Go for a 30-minute jog", goal: "Morning Jogging Routine", completed: true },
  { id: 3, title: "Read Chapter 4 and 5", goal: "Read 'Atomic Habits'", completed: false },
  { id: 4, title: "Build a sample app", goal: "Learn Next.js 14", completed: false },
];

export default function Tasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Focus</CardTitle>
        <CardDescription>
          Tasks scheduled for today. Keep up the momentum!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4">
              <Checkbox id={`task-${task.id}`} checked={task.completed} />
              <div className="flex-1">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm font-medium leading-none ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </label>
                <p className="text-xs text-muted-foreground">{task.goal}</p>
              </div>
              {task.completed && (
                <Badge variant="outline" className="text-accent-foreground border-accent">
                  Done
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
