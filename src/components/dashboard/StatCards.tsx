"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats, DashboardStats } from "@/lib/services/dashboard";
import { HeartHandshake, FileBadge, Plane, GraduationCap } from "lucide-react";

export function StatCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const items = [
    {
      title: "Layanan Nikah",
      value: stats?.layananNikah || 0,
      icon: <HeartHandshake className="h-6 w-6 text-green-600 dark:text-green-400" />,
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Sertifikasi Halal",
      value: stats?.sertifikasiHalal || 0,
      icon: <FileBadge className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Haji & Umrah",
      value: stats?.hajiUmrah || 0,
      icon: <Plane className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Madrasah/Sekolah",
      value: stats?.madrasah || 0,
      icon: <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-xl ${item.color}`}>
              {item.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {stats === null ? (
                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></div>
              ) : (
                item.value.toLocaleString("id-ID")
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Data terbarui hari ini
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
