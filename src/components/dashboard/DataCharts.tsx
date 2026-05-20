"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", layanan: 4000 },
  { name: "Feb", layanan: 3000 },
  { name: "Mar", layanan: 2000 },
  { name: "Apr", layanan: 2780 },
  { name: "Mei", layanan: 1890 },
  { name: "Jun", layanan: 2390 },
  { name: "Jul", layanan: 3490 },
];

export function DataCharts() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 border border-slate-200/60 dark:border-slate-800 shadow-sm">
        <CardHeader>
          <CardTitle>Statistik Pelayanan Publik</CardTitle>
          <CardDescription>Total layanan bulanan Kanwil Kemenag Provinsi Lampung tahun ini.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 border border-slate-200/60 dark:border-slate-800 shadow-sm">
      <CardHeader>
        <CardTitle>Statistik Pelayanan Publik</CardTitle>
        <CardDescription>Total layanan bulanan Kanwil Kemenag Provinsi Lampung tahun ini.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <Tooltip
              cursor={{fill: 'rgba(0,0,0,0.05)'}}
              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
            />
            <Bar dataKey="layanan" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
