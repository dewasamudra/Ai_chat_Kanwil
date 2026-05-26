import React from "react";
import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-green-600/20">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="hidden md:inline-block font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">
              Portal Dashboard Kanwil Kemenag Provinsi Lampung
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Cari layanan..."
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 pl-9 rounded-full border-none focus-visible:ring-primary shadow-inner"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-900"></span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
