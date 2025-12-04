import { Bell, Menu, Search, HelpCircle, Settings, LogOut, User, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/admin/useLogout";

export function DashboardHeader() {
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-20 border-b border-border/50 bg-card/95 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <SidebarTrigger className="text-foreground hover:bg-muted/50 p-2.5 rounded-xl transition-all duration-200 hover:scale-105">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search queues, customers..."
            className="w-80 pl-10 h-11 bg-muted/30 border-border/50 rounded-xl focus:bg-background transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Help Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200 relative group"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>

        {/* Notifications Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200 relative"
        >
          <Bell className="h-5 w-5" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold"
          >
            3
          </Badge>
        </Button>

        <div className="w-px h-8 bg-border/50 mx-2" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 h-12 px-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className="relative">
                <Avatar className="h-9 w-9 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full" />
              </div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground">Admin User</span>
                <span className="text-xs text-muted-foreground">Super Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@toorrii.com</p>
                  <Badge variant="secondary" className="w-fit mt-1 text-[10px] py-0 h-5">
                    <Shield className="h-3 w-3 mr-1" />
                    Super Admin
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <User className="mr-3 h-4 w-4" />
              <span className="font-medium">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <Settings className="mr-3 h-4 w-4" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="py-2.5 cursor-pointer text-destructive focus:text-destructive">
              {isLoggingOut ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <LogOut className="mr-3 h-4 w-4" />}
              <span className="font-medium">{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
