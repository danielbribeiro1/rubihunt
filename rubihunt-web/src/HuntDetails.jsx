import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from './api'; // <--- IMPORTANTE

export function HuntDetails() {
  const { id } = useParams();
  const [hunt, setHunt] = useState(null);

  useEffect(() => {
    // USA API_URL AQUI
    fetch(`${API_URL}/hunts/${id}`)
      .then(response => response.json())
      .then(data => setHunt(data))
      .catch(error => console.error("Erro:", error));
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split('v=')[1] || url.split('youtu.be/')[1];
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId.split('&')[0]}`;
  };

  if (!hunt) return <div className="text-white p-8">Carregando detalhes...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block">← Voltar para a lista</Link>
        <div className="bg-rubi-card border border-gray-700 rounded-lg p-8 mb-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 flex">
             {hunt.vocation && hunt.vocation.split(',').map(voc => (
                <div key={voc} className="bg-rubi-green text-black font-bold px-4 py-1 border-l border-black/20 first:rounded-bl-lg">{voc}</div>
             ))}
          </div>
          <h1 className="text-4xl font-bold mb-2">{hunt.title}</h1>
          <p className="text-gray-400 text-xl">Level Recomendado: <span className="text-white">{hunt.level}</span></p>
          <div className="flex gap-8 mt-6">
            <div><p className="text-gray-500 text-sm uppercase">XP/Hora</p><p className="text-2xl font-bold text-green-400">{hunt.xp}</p></div>
            <div><p className="text-gray-500 text-sm uppercase">Lucro/Hora</p><p className="text-2xl font-bold text-yellow-400">{hunt.profit}</p></div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 mb-6 shadow-lg">
           <img src={hunt.imgUrl || "https://via.placeholder.com/800x400"} alt={hunt.title} className="w-full h-96 object-cover" />
        </div>
        {hunt.videoUrl ? (
          <div className="bg-black rounded-lg overflow-hidden border border-gray-800 shadow-lg aspect-video">
             <iframe width="100%" height="100%" src={getEmbedUrl(hunt.videoUrl)} title="Video" frameBorder="0" allowFullScreen></iframe>
          </div>
        ) : <div className="bg-[#121212] p-8 rounded border text-center text-gray-500">Nenhum vídeo cadastrado.</div>}
      </div>
    </div>
  );
}