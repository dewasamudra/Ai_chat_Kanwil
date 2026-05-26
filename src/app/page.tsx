import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/dashboard/StatCards";
import { DataCharts } from "@/components/dashboard/DataCharts";
import { BixbyChatManager } from "@/components/chat/BixbyChatManager";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary/20 pb-20">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col gap-8">
          <section>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Selamat Datang, Admin</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Ringkasan aktivitas dan layanan publik Kanwil Kemenag Provinsi Lampung hari ini.</p>
          </section>
          
          <StatCards />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DataCharts />
          </div>
        </div>
      </div>

      <BixbyChatManager />
    </main>
  );
}
