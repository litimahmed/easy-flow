import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Pause, Play, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Manage() {
  const queues = [
    { id: 1, name: "General Service", customers: 15, status: "active", avgWait: "8 min" },
    { id: 2, name: "Priority Service", customers: 5, status: "active", avgWait: "4 min" },
    { id: 3, name: "Customer Support", customers: 23, status: "active", avgWait: "12 min" },
    { id: 4, name: "Technical Support", customers: 8, status: "paused", avgWait: "0 min" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Queues</h2>
          <p className="text-muted-foreground">Create and control your service queues</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Queue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {queues.map((queue) => (
          <Card key={queue.id} className="shadow-elegant hover:shadow-strong transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {queue.name}
                    <Badge variant={queue.status === "active" ? "default" : "secondary"}>
                      {queue.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {queue.customers} customers waiting
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      {queue.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Queue
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Resume Queue
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Queue
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average Wait Time</span>
                  <span className="font-medium">{queue.avgWait}</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    View Details
                  </Button>
                  <Button className="flex-1">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
