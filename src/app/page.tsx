import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Target,
  Dumbbell,
  User,
  Settings,
  PlusCircle,
} from "lucide-react";
import Header from "@/components/dashboard/header";
import Goals from "@/components/dashboard/goals";
import Tasks from "@/components/dashboard/tasks";
import ProgressChart from "@/components/dashboard/progress-chart";
import ConsistencyChart from "@/components/dashboard/consistency-chart";
import WorkoutTracker from "@/components/dashboard/workout-tracker";
import AiMotivation from "@/components/dashboard/ai-motivation";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent className="p-2">
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <Target className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold font-headline">Trackify</h1>
              </div>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" isActive>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Target />
                  Goals
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Dumbbell />
                  Workouts
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <User />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-4">
                <Goals />
              </div>
              <div className="lg:col-span-2">
                <Tasks />
              </div>
              <div className="lg:col-span-2">
                <WorkoutTracker />
              </div>
              <div className="lg:col-span-2">
                <ProgressChart />
              </div>
              <div className="lg:col-span-2">
                <ConsistencyChart />
              </div>
              <div className="lg:col-span-4">
                 <AiMotivation />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
