import { Suspense } from "react";
import ResourceClientPage from "../../components/resources/ResourceClientPage";
import { GET } from "../api/resources/route";

export const revalidate = 60;

async function getResources() {
  try {
    const response = await GET();
    
    if (!response.ok) {
      throw new Error('Kaynaklar yüklenirken hata oluştu');
    }
    
    const data = await response.json();
    
    // Revalidate olayını loglama
    console.log(`%c 🔄 SAYFA REVALIDATE OLDU - ${new Date().toLocaleTimeString('tr-TR')} `, 'background: #2563eb; color: white; padding: 4px; border-radius: 4px; font-weight: bold;');
    console.log(`%c Son güncelleme: ${data._metadata?.lastUpdated || 'bilinmiyor'} `, 'background: #4ade80; color: black; padding: 2px; border-radius: 4px;');
    
    return {
      resources: data.resources || [],
      lastUpdated: data._metadata?.lastUpdated
    };
  } catch (error) {
    console.error('Kaynaklar yüklenirken hata:', error);
    return { resources: [], lastUpdated: null };
  }
}

export default async function ResourcePage() {
  const { resources, lastUpdated } = await getResources();
  
  return (
    <>
      {/* Son güncellenme zamanı bilgisi */}
      <div className="fixed top-0 right-0 bg-black/80 text-white text-xs px-3 py-1 m-2 rounded-full z-50">
        Son güncellenme: {lastUpdated || 'bilinmiyor'}
      </div>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-400">Kaynaklar yükleniyor...</div>}>
        <ResourceClientPage resources={resources || []} lastUpdated={lastUpdated} />
      </Suspense>
    </>
  );
}

