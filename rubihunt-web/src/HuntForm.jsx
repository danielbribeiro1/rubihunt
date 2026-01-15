import { useState, useEffect } from 'react';
import { API_URL } from './api'; // <--- IMPORTANTE

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

    // USA API_URL AQUI
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
      alert(initialData ? 'Hunt atualizada!' : 'Hunt criada!');
      onHuntAdded();
    })
    .catch(error => console.error('Erro:', error));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    // USA API_URL AQUI
    fetch(`${API_URL}/hunts/upload`, {
      method: 'POST',
      body: data
    })
    .then(response => response.text())
    .then(urlGerada => {
      setFormData(prev => ({ ...prev, imgUrl: urlGerada }));
      setUploading(false);
    })
    .catch(() => { setUploading(false); alert("Erro ao enviar imagem!"); });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-rubi-card p-6 rounded-lg border border-gray-700 mb-8 shadow-lg relative">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{initialData ? 'Editar Hunt' : 'Cadastrar Nova Hunt'}</h3>
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold">X</button>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Nome da Hunt" value={formData.title} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        <div className="bg-[#121212] border border-gray-600 rounded p-2">
          <label className="text-gray-400 text-xs font-bold block mb-2">Vocações:</label>
          <div className="flex flex-wrap gap-3">
            {availableVocations.map(voc => (
              <label key={voc} className="flex items-center space-x-2 cursor-pointer select-none">
                <input type="checkbox" checked={formData.vocation.split(',').includes(voc)} onChange={() => handleVocationChange(voc)} className="accent-rubi-green w-4 h-4" />
                <span className="text-white text-sm">{voc}</span>
              </label>
            ))}
          </div>
        </div>
        <input name="level" placeholder="Level Mínimo" value={formData.level} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        <div className="bg-[#121212] border border-gray-600 rounded p-2 text-white flex items-center gap-2">
           <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rubi-green file:text-black hover:file:bg-green-600" />
           {uploading && <span className="text-yellow-500 text-xs animate-pulse">Enviando...</span>}
           {formData.imgUrl && !uploading && <span className="text-green-500 font-bold text-sm">✓ Imagem OK</span>}
        </div>
        <input name="videoUrl" placeholder="Link do YouTube" value={formData.videoUrl} onChange={handleChange} className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        <input name="xp" placeholder="XP/Hora" value={formData.xp} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        <input name="profit" placeholder="Lucro/Hora" value={formData.profit} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        <button type="submit" disabled={uploading} className="col-span-1 md:col-span-2 bg-rubi-green hover:bg-green-600 text-black font-bold py-2 rounded transition-colors mt-2 disabled:opacity-50">{initialData ? 'SALVAR ALTERAÇÕES' : 'CRIAR HUNT'}</button>
      </form>
    </div>
  );
}