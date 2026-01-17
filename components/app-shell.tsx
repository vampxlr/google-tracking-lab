"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Search,
  FileText,
  Github,
  ExternalLink,
  Zap
} from "lucide-react"
import { navItems, navGroups, NavItem } from "@/content/nav"

interface AppShellProps {
  children: React.ReactNode
}

function SidebarLink({ item, isActive }: { item: NavItem, isActive: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 relative group",
        isActive 
          ? "bg-[#FF6D00]/10 text-[#FF6D00] font-medium border border-[#FF6D00]/30 shadow-[0_0_15px_rgba(255,109,0,0.3)]" 
          : "text-[#8b949e] hover:text-[#FF6D00] hover:bg-[#FF6D00]/5 border border-transparent hover:border-[#FF6D00]/20 hover:shadow-[0_0_10px_rgba(255,109,0,0.2)]"
      )}
    >
      {Icon && <Icon className={cn(
        "h-4 w-4 transition-all duration-300",
        isActive ? "text-[#FF6D00]" : "group-hover:text-[#FF6D00]"
      )} />}
      <span className="flex-1 font-mono">{item.title}</span>
      {isActive && (
        <div className="h-2 w-2 rounded-full bg-[#FF6D00] animate-pulse shadow-[0_0_8px_rgba(255,109,0,0.8)]" />
      )}
    </Link>
  )
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<NavItem[]>([])
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)

  // Handle search
  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = navItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.href.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-[#FF6D00]/20 glass-strong lg:flex">
        <Link href="/" className="flex h-16 items-center border-b border-[#FF6D00]/20 px-6 hover:bg-[#FF6D00]/5 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6D00]/20 to-[#4285F4]/20 border border-[#FF6D00]/30 group-hover:shadow-[0_0_20px_rgba(255,109,0,0.4)] transition-all duration-300">
              <FileText className="h-5 w-5 text-[#FF6D00] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-[#FF6D00] text-shimmer">Google Track Lab</h1>
              <p className="text-[10px] text-[#8b949e] font-mono">GA4 & GTM Masterclass</p>
            </div>
          </div>
        </Link>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-4">
              <div className="mb-4">
                <div className="relative">
                  <Search className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300",
                    isSearchFocused ? "text-[#FF6D00]" : "text-[#8b949e]"
                  )} />
                  <Input
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className={cn(
                      "pl-9 font-mono text-sm border-[#FF6D00]/20 bg-[#0d1117] focus:border-[#FF6D00] focus:ring-1 focus:ring-[#FF6D00]/30 transition-all duration-300",
                      isSearchFocused && "shadow-[0_0_15px_rgba(255,109,0,0.2)]"
                    )}
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass-strong border border-[#FF6D00]/20 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                      {searchResults.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setSearchQuery("")
                              setSearchResults([])
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FF6D00]/10 border-b border-[#FF6D00]/10 last:border-0 transition-colors"
                          >
                            {Icon && <Icon className="h-4 w-4 text-[#FF6D00]" />}
                            <div className="flex-1">
                              <p className="text-sm font-mono text-[#e8f4f8]">{item.title}</p>
                              <p className="text-xs text-[#8b949e]">{item.group}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {(searchResults.length > 0 ? 
                navGroups.filter(group => searchResults.some(item => item.group === group)) : 
                navGroups
              ).map((group) => (
                <div key={group} className="mb-6">
                  <p className="mb-2 px-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#8b949e]">
                    {group}
                  </p>
                  <div className="space-y-1">
                    {navItems
                      .filter((item) => 
                        item.group === group && 
                        (searchResults.length === 0 || searchResults.includes(item))
                      )
                      .map((item) => (
                        <SidebarLink
                          key={item.href}
                          item={item}
                          isActive={pathname === item.href}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Footer Links */}
        <div className="border-t border-[#FF6D00]/20 p-4 space-y-2">
          <a
            href="https://github.com/yourusername/google-tracking-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#8b949e] hover:text-[#FF6D00] hover:bg-[#FF6D00]/5 border border-transparent hover:border-[#FF6D00]/20 transition-all duration-300 group"
          >
            <Github className="h-4 w-4 group-hover:text-[#FF6D00]" />
            <span className="flex-1 font-mono">GitHub</span>
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="glass-subtle rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-3 w-3 text-[#FF6D00] animate-pulse" />
              <p className="text-[10px] font-mono font-semibold text-[#FF6D00]">LIVE TRACKING</p>
            </div>
            <p className="text-[10px] text-[#8b949e] font-mono">
              Connect your GA4 & test events in real-time
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#FF6D00]/20 glass-strong px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6D00]/20 to-[#4285F4]/20 border border-[#FF6D00]/30">
            <FileText className="h-4 w-4 text-[#FF6D00]" />
          </div>
          <span className="font-mono font-bold text-[#FF6D00]">Google Track Lab</span>
        </Link>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#FF6D00] hover:bg-[#FF6D00]/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 glass-strong border-[#FF6D00]/20 p-0">
            <div className="flex h-16 items-center border-b border-[#FF6D00]/20 px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6D00]/20 to-[#4285F4]/20 border border-[#FF6D00]/30">
                  <FileText className="h-5 w-5 text-[#FF6D00]" />
                </div>
                <div>
                  <h1 className="font-mono font-bold text-[#FF6D00]">Google Track Lab</h1>
                  <p className="text-[10px] text-[#8b949e] font-mono">GA4 & GTM Masterclass</p>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="space-y-1 p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />
                    <Input
                      placeholder="Search docs..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-9 font-mono text-sm border-[#FF6D00]/20 bg-[#0d1117]"
                    />
                  </div>
                </div>

                {navGroups.map((group) => (
                  <div key={group} className="mb-6">
                    <p className="mb-2 px-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#8b949e]">
                      {group}
                    </p>
                    <div className="space-y-1">
                      {navItems
                        .filter((item) => item.group === group)
                        .map((item) => (
                          <div key={item.href} onClick={() => setSheetOpen(false)}>
                            <SidebarLink item={item} isActive={pathname === item.href} />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
