import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, PlusCircle, Flame, Activity } from "lucide-react";

export default function WorkoutTracker() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="text-primary"/>
            <span>Workout Tracker</span>
          </CardTitle>
          <CardDescription>
            Log and track your fitness activities.
          </CardDescription>
        </div>
        <Button variant="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Workout
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center justify-center text-center">
            <Activity className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Last workout</p>
            <p className="text-lg font-semibold">2 days ago</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center justify-center text-center">
            <Flame className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Workouts this month</p>
            <p className="text-lg font-semibold">12</p>
        </div>
      </CardContent>
    </Card>
  );
}
