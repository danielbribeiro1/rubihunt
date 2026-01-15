import React from 'react';
import { Link } from 'react-router-dom';

export function HuntCard({ id, title, vocation, level, xp, profit, imgUrl, onDelete, onEdit }) {
  
  // Garante que vocation seja uma string para evitar erros se vier vazio do banco
  const vocationList = vocation ? vocation.split(',') : [];

  return (
    <div className="relative bg-rubi-card border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition-all w-80 shadow-lg group">
      
      {/* --- BOTÕES DE AÇÃO (Topo Direito) --- */}
      {/* Z-Index 20 para garantir que fiquem acima do link de navegação */}
      <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        
        {/* Botão EDITAR (Azul) */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Impede que abra a página de detalhes ao clicar no botão
            onEdit();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors"
          title="Editar Hunt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* Botão DELETAR (Vermelho) */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Impede que abra a página de detalhes
            onDelete();
          }}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
          title="Deletar Hunt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* --- ÁREA NAVEGÁVEL (Link para Detalhes) --- */}
      <Link to={`/hunts/${id}`} className="block h-full">

        {/* Imagem do Local */}
        <div className="h-32 bg-gray-800 relative">
          <img 
            src={imgUrl || "https://via.placeholder.com/320x150?text=Sem+Imagem"} 
            alt={title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          
          {/* --- Vocações (Badges Múltiplas) --- */}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap pr-2">
            {vocationList.map(voc => (
              <span key={voc} className="bg-black/70 text-[10px] px-2 py-1 rounded text-white font-bold border border-gray-600 backdrop-blur-sm">
                {voc}
              </span>
            ))}
          </div>
        </div>

        {/* Conteúdo (Texto) */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 truncate" title={title}>{title}</h3>
          <p className="text-xs text-gray-400 mb-4">Level sugerido: <span className="text-white font-semibold">{level}</span></p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-black/30 p-2 rounded border border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider">XP/Hora</p>
              <p className="font-bold text-gray-200">{xp}</p>
            </div>
            <div className="bg-black/30 p-2 rounded border border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider">Lucro/Hora</p>
              <p className="font-bold text-rubi-green">{profit}</p>
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
}