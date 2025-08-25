"use client";

import { useState, useEffect } from "react";
import { generateMotivationMessage } from "@/ai/flows/generate-motivation-message";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function AiMotivation() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getMotivation = async () => {
    setLoading(true);
    try {
      const result = await generateMotivationMessage({
        userName: "Alex",
        goal: "Run a 5k marathon",
        progressPercentage: 45,
        consistencyScore: 7,
      });
      setMessage(result.message);
    } catch (error) {
      console.error("Failed to get motivation:", error);
      setMessage("Keep pushing forward! Every step counts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMotivation();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    <span>AI-Powered Motivation</span>
                </CardTitle>
                <CardDescription>Your personal cheerleader to keep you on track.</CardDescription>
            </div>
             <Button variant="ghost" size="icon" onClick={getMotivation} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
            {message}
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}
