import { useState } from 'react';

export function FilterBar({ onSearch }) {
  const [title, setTitle] = useState('');
  const [vocation, setVocation] = useState('all');
  const [minLevel, setMinLevel] = useState('');
  const [maxLevel, setMaxLevel] = useState('');

  return (
    <div className="bg-rubi-card p-4 rounded-lg border border-gray-700 mb-8 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Campo Nome */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-bold uppercase">Nome da Hunt</label>
          <input 
            type="text" 
            placeholder="Ex: Asura" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#121212] border border-gray-600 rounded p-2 text-sm text-white focus:border-rubi-green outline-none"
          />
        </div>

        {/* Campo Level (Min e Max) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-bold uppercase">Faixa de Level</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={minLevel}
              onChange={(e) => setMinLevel(e.target.value)}
              className="bg-[#121212] border border-gray-600 rounded p-2 text-sm text-white w-full outline-none focus:border-rubi-green"
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={maxLevel}
              onChange={(e) => setMaxLevel(e.target.value)}
              className="bg-[#121212] border border-gray-600 rounded p-2 text-sm text-white w-full outline-none focus:border-rubi-green"
            />
          </div>
        </div>

        {/* Seleção Vocação (ATUALIZADO) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-bold uppercase">Vocação</label>
          <select 
            value={vocation}
            onChange={(e) => setVocation(e.target.value)}
            className="bg-[#121212] border border-gray-600 rounded p-2 text-sm text-gray-300 outline-none focus:border-rubi-green cursor-pointer"
          >
            <option value="all">Todas as Vocações</option>
            <option value="Knights">Knights</option>
            <option value="Paladins">Paladins</option>
            <option value="Sorcerers">Sorcerers</option>
            <option value="Druids">Druids</option>
            <option value="Monks">Monks</option>
          </select>
        </div>

        {/* Botão Buscar */}
        <button 
          onClick={() => onSearch(title, vocation, minLevel, maxLevel)}
          className="bg-rubi-green hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition-colors shadow-[0_0_10px_rgba(0,200,83,0.3)]">
          Buscar Hunts
        </button>

      </div>
    </div>
  );
}