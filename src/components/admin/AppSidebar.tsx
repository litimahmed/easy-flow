import { useState } from "react";
import { LayoutDashboard, Users, Settings, BarChart3, Zap, FileText, ChevronDown, Info, Phone, Handshake, Eye, Plus, List, Layers, ScrollText, Shield, Ban } from "lucide-react";
import { useContacts } from "@/hooks/admin/useContacts";
import { NavLink } from "@/components/admin/NavLink";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manage Queues", url: "/admin/manage", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { contact } = useContacts();
  const isActive = (path: string) => currentPath === path;
  const isPathStartsWith = (path: string) => currentPath.startsWith(path);
  
  const isContentActive = isPathStartsWith("/admin/about-us") || isPathStartsWith("/admin/contacts") || isPathStartsWith("/admin/partners") || isPathStartsWith("/admin/terms") || isPathStartsWith("/admin/privacy-policy");
  const isAboutUsActive = isPathStartsWith("/admin/about-us");
  const isContactActive = isPathStartsWith("/admin/contacts");
  const isPartnersActive = isPathStartsWith("/admin/partners");
  const isTermsActive = isPathStartsWith("/admin/terms");
  const isPrivacyActive = isPathStartsWith("/admin/privacy-policy");
  
  const [contentOpen, setContentOpen] = useState(isContentActive);
  const [aboutUsOpen, setAboutUsOpen] = useState(isAboutUsActive);
  const [contactOpen, setContactOpen] = useState(isContactActive);
  const [partnersOpen, setPartnersOpen] = useState(isPartnersActive);
  const [termsOpen, setTermsOpen] = useState(isTermsActive);
  const [privacyOpen, setPrivacyOpen] = useState(isPrivacyActive);

  return (
    <Sidebar className={`${open ? "w-72" : "w-20"} transition-all duration-300 border-r border-border/50`} collapsible="icon">
      <SidebarContent className="bg-card">
        {/* Logo Section */}
        <div className={`${open ? "p-6" : "p-4"} transition-all duration-300`}>
          <div className={`flex items-center ${open ? "gap-3" : "justify-center"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative bg-gradient-to-br from-primary to-primary-glow p-1 rounded-xl shadow-lg">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            {open && (
              <div className="flex flex-col animate-fade-in">
                <h1 className="text-xl font-bold text-foreground tracking-tight">Toorrii</h1>
                <span className="text-xs text-muted-foreground font-medium">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Main Navigation Section */}
        <SidebarGroup className="px-3 py-4">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Main Menu
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map(item => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`
                          ${open ? "px-4 py-3" : "px-3 py-3 justify-center"}
                          rounded-xl transition-all duration-200
                          text-muted-foreground hover:text-foreground
                          hover:bg-muted/50
                          flex items-center gap-3
                          group relative
                        `}
                        activeClassName={`
                          bg-gradient-to-r from-primary/10 to-primary/5
                          text-primary font-semibold
                          shadow-sm
                          border border-primary/20
                        `}
                      >
                        <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${active ? "text-primary" : ""}`} />
                        {open && <span className="text-sm font-medium">{item.title}</span>}
                        {active && open && <div className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-border/50 mx-3" />

        {/* Content Management Section */}
        <SidebarGroup className="px-3 py-4">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Content
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {open ? (
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-4 py-3 rounded-xl transition-all duration-200
                          text-muted-foreground hover:text-foreground
                          hover:bg-muted/50
                          flex items-center justify-between w-full
                          ${isContentActive ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold border border-primary/20" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-5 w-5 ${isContentActive ? "text-primary" : ""}`} />
                          <span className="text-sm font-medium">Content Management</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-1 space-y-1">
                    {/* About Us Menu */}
                    <Collapsible open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-muted-foreground hover:text-foreground
                              hover:bg-muted/50
                              flex items-center justify-between w-full
                              text-sm
                              ${isAboutUsActive ? "bg-primary/10 text-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Info className={`h-4 w-4 ${isAboutUsActive ? "text-primary" : ""}`} />
                              <span>About Us</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${aboutUsOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/versions"
                              end
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Layers className="h-3.5 w-3.5" />
                              <span>All Versions</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/create"
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Create New Version</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Contact Menu */}
                    <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-muted-foreground hover:text-foreground
                              hover:bg-muted/50
                              flex items-center justify-between w-full
                              text-sm
                              ${isContactActive ? "bg-primary/10 text-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Phone className={`h-4 w-4 ${isContactActive ? "text-primary" : ""}`} />
                              <span>Contact</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/contacts"
                              end
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>My Contact</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild={!contact}>
                            {contact ? (
                              <div
                                className="px-4 py-2 rounded-lg flex items-center gap-3 text-xs text-muted-foreground/50 cursor-not-allowed"
                                title="A contact already exists"
                              >
                                <Ban className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </div>
                            ) : (
                              <NavLink
                                to="/admin/contacts/create"
                                className={`
                                  px-4 py-2 rounded-lg transition-all duration-200
                                  text-muted-foreground hover:text-foreground
                                  hover:bg-muted/50
                                  flex items-center gap-3
                                  text-xs
                                `}
                                activeClassName="bg-primary/10 text-primary font-medium"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </NavLink>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Partners Menu */}
                    <Collapsible open={partnersOpen} onOpenChange={setPartnersOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-muted-foreground hover:text-foreground
                              hover:bg-muted/50
                              flex items-center justify-between w-full
                              text-sm
                              ${isPartnersActive ? "bg-primary/10 text-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Handshake className={`h-4 w-4 ${isPartnersActive ? "text-primary" : ""}`} />
                              <span>Partners</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${partnersOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners"
                              end
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Partners</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners/create"
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Terms and Conditions Menu */}
                    <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-muted-foreground hover:text-foreground
                              hover:bg-muted/50
                              flex items-center justify-between w-full
                              text-sm
                              ${isTermsActive ? "bg-primary/10 text-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <ScrollText className={`h-4 w-4 ${isTermsActive ? "text-primary" : ""}`} />
                              <span>Terms & Conditions</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${termsOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms"
                              end
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms/create"
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Privacy Policy Menu */}
                    <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-muted-foreground hover:text-foreground
                              hover:bg-muted/50
                              flex items-center justify-between w-full
                              text-sm
                              ${isPrivacyActive ? "bg-primary/10 text-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Shield className={`h-4 w-4 ${isPrivacyActive ? "text-primary" : ""}`} />
                              <span>Privacy Policy</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${privacyOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy"
                              end
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy/create"
                              className={`
                                px-4 py-2 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-xs
                              `}
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/about-us"
                      className={`
                        px-3 py-3 justify-center rounded-xl transition-all duration-200
                        text-muted-foreground hover:text-foreground
                        hover:bg-muted/50 flex items-center
                      `}
                      activeClassName={`
                        bg-gradient-to-r from-primary/10 to-primary/5
                        text-primary border border-primary/20
                      `}
                    >
                      <FileText className={`h-5 w-5 ${isContentActive ? "text-primary" : ""}`} />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border/50 bg-muted/30">
        {open ? (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">System Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-success font-semibold">Online</span>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/70">
              v2.4.1 • © 2024 Toorrii
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
