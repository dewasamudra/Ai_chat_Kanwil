export interface DashboardStats {
  layananNikah: number;
  sertifikasiHalal: number;
  hajiUmrah: number;
  madrasah: number;
}

export const mockDashboardStats: DashboardStats = {
  layananNikah: 12450,
  sertifikasiHalal: 8320,
  hajiUmrah: 4500,
  madrasah: 3200,
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardStats), 500);
  });
};

export interface ChatResponse {
  text: string;
  cards?: Record<string, unknown>[];
}

export const getChatbotResponse = async (query: string): Promise<ChatResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes("halal")) {
        resolve({
          text: "Untuk mengurus sertifikasi halal di Provinsi Lampung, Anda dapat mengakses portal SIHALAL. Saat ini terdapat **8.320** sertifikat halal yang telah diterbitkan tahun ini. \n\nBerikut langkah-langkah umumnya:\n1. Pendaftaran online di ptsp.halal.go.id\n2. Verifikasi dokumen\n3. Audit oleh LPH\n4. Sidang Fatwa MUI\n5. Penerbitan Sertifikat.",
        });
      } else if (lowerQuery.includes("madrasah") || lowerQuery.includes("sekolah")) {
        resolve({
          text: "Jumlah Madrasah di Provinsi Lampung yang terdaftar saat ini adalah **3.200** lembaga. Ini mencakup MI, MTs, dan MA negeri maupun swasta. Kami terus berkomitmen untuk meningkatkan kualitas pendidikan Islam di Lampung.",
        });
      } else if (lowerQuery.includes("haji") || lowerQuery.includes("umrah")) {
        resolve({
          text: "Tahun ini terdapat **4.500** pendaftar haji dan umrah. Estimasi waktu tunggu (waiting list) haji reguler di Lampung saat ini adalah sekitar 22 tahun. Anda bisa mengecek porsi haji melalui aplikasi Pusaka Kemenag.",
        });
      } else if (lowerQuery.includes("nikah")) {
        resolve({
          text: "Layanan pencatatan nikah dapat dilakukan di KUA kecamatan setempat. Anda dapat mendaftar secara online melalui SIMKAH (Sistem Informasi Manajemen Nikah) Web Kemenag. Total pelayanan nikah tahun ini di Lampung mencapai **12.450** pernikahan.",
        });
      } else if (lowerQuery.includes("halo") || lowerQuery.includes("hai")) {
        resolve({
          text: "Halo! Saya Bixby Kemenag Lampung, asisten AI Anda. Ada yang bisa saya bantu terkait layanan di Kantor Wilayah Kementerian Agama Provinsi Lampung hari ini?",
        });
      } else {
        resolve({
          text: "Maaf, saya tidak dapat menemukan informasi spesifik tentang hal tersebut. Namun, Anda bisa menjelajahi dashboard layanan kami atau menghubungi call center Kanwil Kemenag Provinsi Lampung.",
        });
      }
    }, 800);
  });
};
