import { Link } from 'react-router-dom';

export function HuntCard({ id, title, vocation, level, xp, profit, imgUrl, onDelete, onEdit }) {
  
  // Verifica se é administrador
  const isAdmin = localStorage.getItem('adminToken') === 'LOGADO';

  return (
    <div className="bg-rubi-card border border-gray-700 rounded-lg overflow-hidden w-full sm:w-80 flex flex-col hover:border-rubi-green transition-all shadow-lg group relative">
      
      {/* Imagem */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={imgUrl || "https://via.placeholder.com/400x200"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full p-2">
           <span className="text-white font-bold text-shadow">{title}</span>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {vocation.split(',').map(voc => (
              <span key={voc} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                {voc}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
            <div>
              <p className="text-xs uppercase font-bold text-gray-600">Level</p>
              <p className="text-white">{level}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-gray-600">XP</p>
              <p className="text-rubi-green">{xp}</p>
            </div>
          </div>
        </div>

        {/* Botão Ver Detalhes */}
        <Link 
          to={`/hunts/${id}`}
          className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded transition-colors mb-2"
        >
          Ver Detalhes
        </Link>

        {/* --- ÁREA RESTRITA AO ADMIN --- */}
        {/* Só mostra estes botões se for admin */}
        {isAdmin && (
          <div className="flex gap-2 border-t border-gray-700 pt-3 mt-1">
            <button 
              onClick={onEdit}
              className="flex-1 bg-blue-900/30 hover:bg-blue-600 text-blue-200 hover:text-white text-xs py-1.5 rounded border border-blue-900 transition-colors"
            >
              ✎ Editar
            </button>
            <button 
              onClick={onDelete}
              className="flex-1 bg-red-900/30 hover:bg-red-600 text-red-200 hover:text-white text-xs py-1.5 rounded border border-red-900 transition-colors"
            >
              🗑 Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}