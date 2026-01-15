import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './api'; // <--- Importando a configuração inteligente

export function AdminPanel() {
  const [pendingHunts, setPendingHunts] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    // Busca na URL certa (Local ou Render)
    fetch(`${API_URL}/hunts/pending`)
      .then(res => res.json())
      .then(data => setPendingHunts(data))
      .catch(err => console.error("Erro ao buscar pendentes:", err));
  };

  const handleApprove = (id) => {
    fetch(`${API_URL}/hunts/${id}/approve`, { method: 'PUT' })
      .then(() => {
        alert("Hunt Aprovada com Sucesso!");
        fetchPending();
      })
      .catch(err => console.error("Erro ao aprovar:", err));
  };

  const handleReject = (id) => {
    if (confirm("Tem certeza que deseja rejeitar e apagar esta hunt?")) {
      fetch(`${API_URL}/hunts/${id}`, { method: 'DELETE' })
        .then(() => {
          fetchPending();
        })
        .catch(err => console.error("Erro ao deletar:", err));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-rubi-red">Painel do Administrador 🛡️</h1>
          <Link to="/" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors">
            Ir para o Site →
          </Link>
        </div>

        <h2 className="text-xl mb-4 text-gray-400">Hunts Aguardando Aprovação: {pendingHunts.length}</h2>

        <div className="space-y-4">
          {pendingHunts.length === 0 ? (
            <p className="text-gray-500 italic">Nenhuma hunt pendente no momento. Tudo limpo!</p>
          ) : (
            pendingHunts.map(hunt => (
              <div key={hunt.id} className="bg-rubi-card border border-gray-700 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
                
                <div className="flex items-center gap-4 w-full">
                  <img 
                    src={hunt.imgUrl || "https://via.placeholder.com/64"} 
                    alt={hunt.title} 
                    className="w-16 h-16 object-cover rounded border border-gray-600"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">{hunt.title}</h3>
                    <p className="text-sm text-gray-400">
                      {hunt.vocation} • Level {hunt.level} • Por: Anônimo
                    </p>
                    {/* Link corrigido para usar rota interna do React em vez de href */}
                    <Link to={`/hunts/${hunt.id}`} target="_blank" className="text-xs text-blue-400 hover:underline">
                      Ver detalhes (abre nova aba)
                    </Link>
                  </div>
                </div>

                <div className="flex gap-2 min-w-fit">
                  <button 
                    onClick={() => handleReject(hunt.id)}
                    className="bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white border border-red-800 px-4 py-2 rounded transition-all text-sm font-bold"
                  >
                    REJEITAR
                  </button>
                  <button 
                    onClick={() => handleApprove(hunt.id)}
                    className="bg-green-900/50 hover:bg-green-600 text-green-200 hover:text-white border border-green-800 px-4 py-2 rounded transition-all text-sm font-bold shadow-[0_0_10px_rgba(0,255,0,0.1)]"
                  >
                    ✓ APROVAR
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}