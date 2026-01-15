import { useState, useEffect } from 'react';
import { HuntCard } from './HuntCard';
import { FilterBar } from './FilterBar';
import { HuntForm } from './HuntForm';
import { API_URL } from './api'; // <--- IMPORTANTE

function App() {
  const [hunts, setHunts] = useState([]);           
  const [showForm, setShowForm] = useState(false);  
  const [editingHunt, setEditingHunt] = useState(null); 

  const fetchHunts = (searchTitle = '', searchVocation = 'all', min = '', max = '') => {
    // USA A API_URL AQUI
    let url = `${API_URL}/hunts?`;
    if (searchTitle) url += `title=${searchTitle}&`;
    if (searchVocation && searchVocation !== 'all') url += `vocation=${searchVocation}&`;
    if (min) url += `minLevel=${min}&`;
    if (max) url += `maxLevel=${max}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setHunts(data))
      .catch(error => console.error("Erro ao buscar hunts:", error));
  };

  useEffect(() => {
    fetchHunts();
  }, []);

  const deleteHunt = (id) => {
    if (confirm("Tem certeza que deseja apagar essa hunt permanentemente?")) {
      // USA A API_URL AQUI
      fetch(`${API_URL}/hunts/${id}`, { method: 'DELETE' })
        .then(() => fetchHunts())
        .catch(error => console.error("Erro ao deletar:", error));
    }
  }

  const handleEditClick = (hunt) => {
    setEditingHunt(hunt); 
    setShowForm(true);    
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
      setEditingHunt(null);
    } else {
      setEditingHunt(null);
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#0a0a0a] flex flex-col justify-between"> 
      <div>
        <header className="max-w-6xl mx-auto mb-10 text-center relative">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Rubi<span className="text-rubi-red">Hunt</span></h1>
          <p className="text-gray-400 text-lg mb-6">Encontre as melhores hunts do RubinOT</p>
          <button onClick={toggleForm} className={`${showForm ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded font-bold transition-colors shadow-lg`}>
            {showForm ? 'Fechar Formulário' : '+ Adicionar Nova Hunt'}
          </button>
        </header>
        
        <main className="max-w-6xl mx-auto">
          {showForm && (
            <HuntForm 
              initialData={editingHunt} 
              onHuntAdded={() => { fetchHunts(); setShowForm(false); setEditingHunt(null); }}
              onCancel={() => { setShowForm(false); setEditingHunt(null); }}
            />
          )}
          <FilterBar onSearch={fetchHunts} />
          <div className="flex items-center justify-between mb-6 mt-8">
            <h2 className="text-xl font-semibold text-white border-l-4 border-rubi-green pl-3">Hunts Recomendadas</h2>
            <button onClick={() => fetchHunts()} className="text-sm text-rubi-green hover:text-white transition-colors">Ver todas →</button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {hunts.length === 0 ? (
              <div className="w-full text-center py-12"><p className="text-gray-500 text-lg">Nenhuma hunt encontrada.</p></div>
            ) : (
              hunts.map(hunt => (
                <HuntCard 
                  key={hunt.id} id={hunt.id} title={hunt.title} vocation={hunt.vocation} level={hunt.level} xp={hunt.xp} profit={hunt.profit} imgUrl={hunt.imgUrl}
                  onDelete={() => deleteHunt(hunt.id)} onEdit={() => handleEditClick(hunt)}
                />
              ))
            )}
          </div>
        </main>
      </div>
      <footer className="max-w-6xl mx-auto mt-20 text-center border-t border-gray-800 pt-8 pb-8 w-full">
        <p className="text-gray-500 text-sm">RubiHunt © 2026 - Desenvolvido por <span className="text-rubi-green font-bold">Daniel Ribeiro</span></p>
        <div className="mt-4"><a href="/login" className="text-gray-800 hover:text-gray-500 text-xs transition-colors border border-gray-800 px-2 py-1 rounded hover:border-gray-600">Área Administrativa 🔒</a></div>
      </footer>
    </div>
  )
}
export default App