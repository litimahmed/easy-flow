import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Timer
} from "lucide-react";

export default function Overview() {
  const stats = [
    {
      title: "Total Queues",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Customers",
      value: "847",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Avg Wait Time",
      value: "8.5m",
      change: "-2.3m",
      trend: "down",
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "Efficiency Rate",
      value: "94.2%",
      change: "+3.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  const recentActivity = [
    { id: 1, action: "New customer joined", queue: "Service Desk A", time: "2 min ago", status: "success" },
    { id: 2, action: "Customer served", queue: "Tech Support", time: "5 min ago", status: "complete" },
    { id: 3, action: "Queue threshold reached", queue: "Reception", time: "12 min ago", status: "warning" },
    { id: 4, action: "New queue created", queue: "VIP Service", time: "18 min ago", status: "info" },
    { id: 5, action: "Customer served", queue: "Service Desk B", time: "22 min ago", status: "complete" },
  ];

  const quickActions = [
    { label: "Add Customer", icon: UserPlus, variant: "default" as const },
    { label: "Create Queue", icon: Users, variant: "secondary" as const },
    { label: "View Analytics", icon: TrendingUp, variant: "outline" as const },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground text-lg">Monitor and manage your queue operations in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-success' : 'text-primary'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'success' ? 'bg-success/10' :
                      activity.status === 'complete' ? 'bg-primary/10' :
                      activity.status === 'warning' ? 'bg-warning/10' :
                      'bg-accent/10'
                    }`}>
                      {activity.status === 'success' && <UserPlus className="h-4 w-4 text-success" />}
                      {activity.status === 'complete' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                      {activity.status === 'info' && <Activity className="h-4 w-4 text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.queue}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {quickActions.map((action) => (
                <Button 
                  key={action.label}
                  variant={action.variant}
                  className="w-full justify-start gap-3 h-12 text-base font-medium"
                >
                  <action.icon className="h-5 w-5" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <CardTitle className="text-xl font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Service Health</span>
                <Badge variant="default" className="bg-success hover:bg-success">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">API Status</span>
                <Badge variant="default" className="bg-success hover:bg-success">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Database</span>
                <Badge variant="default" className="bg-success hover:bg-success">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Queue Processing</span>
                <Badge variant="default" className="bg-primary hover:bg-primary">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
