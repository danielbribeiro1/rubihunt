import { useState, useEffect } from 'react';
import { API_URL } from './api';

export function HuntForm({ onHuntAdded, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '', vocation: '', level: '', xp: '', profit: '', imgUrl: '', videoUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const availableVocations = ["Knights", "Paladins", "Sorcerers", "Druids", "Monks"];

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleVocationChange = (option) => {
    let currentVocations = formData.vocation ? formData.vocation.split(',') : [];
    if (currentVocations.includes(option)) {
      currentVocations = currentVocations.filter(v => v !== option);
    } else {
      currentVocations.push(option);
    }
    setFormData({ ...formData, vocation: currentVocations.join(',') });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vocation) { alert("Selecione pelo menos uma vocação!"); return; }

    const url = initialData 
      ? `${API_URL}/hunts/${initialData.id}` 
      : `${API_URL}/hunts`;
    const method = initialData ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      alert(initialData ? 'Hunt atualizada!' : 'Hunt criada com sucesso!');
      onHuntAdded();
    })
    .catch(error => console.error('Erro:', error));
  };

  // Mantivemos o upload caso queira usar no futuro, mas o foco agora é o link
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    fetch(`${API_URL}/hunts/upload`, {
      method: 'POST',
      body: data
    })
    .then(response => response.text())
    .then(urlGerada => {
      // Ajuste técnico: Se a URL vier relativa, adicionamos o domínio da API
      const fullUrl = urlGerada.startsWith('http') ? urlGerada : `${API_URL}${urlGerada}`;
      setFormData(prev => ({ ...prev, imgUrl: fullUrl }));
      setUploading(false);
    })
    .catch(() => { setUploading(false); alert("Erro ao enviar imagem (servidor pode estar cheio ou instável). Tente colar o link direto."); });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-rubi-card p-6 rounded-lg border border-gray-700 mb-8 shadow-lg relative animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{initialData ? 'Editar Hunt' : 'Cadastrar Nova Hunt'}</h3>
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl">&times;</button>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Título */}
        <input name="title" placeholder="Nome da Hunt (ex: Asura Mirror)" value={formData.title} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none" />
        
        {/* Vocações */}
        <div className="bg-[#121212] border border-gray-600 rounded p-3">
          <label className="text-gray-400 text-xs font-bold block mb-2 uppercase tracking-wider">Vocações Recomendadas:</label>
          <div className="flex flex-wrap gap-3">
            {availableVocations.map(voc => (
              <label key={voc} className="flex items-center space-x-2 cursor-pointer select-none group">
                <input type="checkbox" checked={formData.vocation.split(',').includes(voc)} onChange={() => handleVocationChange(voc)} className="accent-rubi-green w-4 h-4" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{voc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <input name="level" placeholder="Level Mínimo (ex: 400+)" value={formData.level} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none" />
        
        {/* IMAGEM: Campo de Link + Botão de Upload */}
        <div className="bg-[#121212] border border-gray-600 rounded p-3 text-white flex flex-col gap-2">
           <label className="text-gray-400 text-xs font-bold uppercase">Imagem da Hunt</label>
           
           {/* Opção 1: Colar Link */}
           <input 
              name="imgUrl" 
              placeholder="Cole o link da imagem aqui (https://...)" 
              value={formData.imgUrl} 
              onChange={handleChange} 
              className="bg-[#1e1e1e] border border-gray-700 rounded p-2 text-sm text-white focus:border-rubi-green outline-none w-full" 
           />

           {/* Opção 2: Upload (Pequeno) */}
           <div className="flex items-center gap-2">
             <span className="text-xs text-gray-500">Ou envie um arquivo:</span>
             <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer" />
             {uploading && <span className="text-yellow-500 text-xs animate-pulse">Enviando...</span>}
           </div>
           
           {/* Preview rápido */}
           {formData.imgUrl && !uploading && (
             <div className="mt-1 text-xs text-green-500 flex items-center gap-1">
               ✓ Imagem definida <img src={formData.imgUrl} alt="Preview" className="w-6 h-6 object-cover rounded border border-gray-600 ml-2"/>
             </div>
           )}
        </div>

        {/* Vídeo, XP e Profit */}
        <input name="videoUrl" placeholder="Link do YouTube (Opcional)" value={formData.videoUrl} onChange={handleChange} className="bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none" />
        <input name="xp" placeholder="XP/Hora (ex: 8kk/h)" value={formData.xp} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none" />
        <input name="profit" placeholder="Lucro/Hora (ex: 500k/h)" value={formData.profit} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none" />
        
        {/* Botão Salvar */}
        <button type="submit" disabled={uploading} className="col-span-1 md:col-span-2 bg-rubi-green hover:bg-green-600 text-black font-bold py-3 rounded transition-all mt-2 disabled:opacity-50 shadow-lg hover:shadow-green-900/50 transform hover:-translate-y-0.5">
            {initialData ? 'SALVAR ALTERAÇÕES' : 'CRIAR HUNT'}
        </button>
      </form>
    </div>
  );
}