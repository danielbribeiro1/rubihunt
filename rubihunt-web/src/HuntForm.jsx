import { useState, useEffect } from 'react';

export function HuntForm({ onHuntAdded, initialData, onCancel }) {
  
  // Estado do formulário com todos os campos (incluindo videoUrl)
  const [formData, setFormData] = useState({
    title: '', 
    vocation: '', // Guarda string separada por vírgula (Ex: "Knights,Paladins")
    level: '', 
    xp: '', 
    profit: '', 
    imgUrl: '',
    videoUrl: '' // Campo novo para o YouTube
  });

  const [uploading, setUploading] = useState(false);

  // Lista de todas as vocações do servidor
  const availableVocations = ["Knights", "Paladins", "Sorcerers", "Druids", "Monks"];

  // Se receber dados iniciais (Edição), preenche o form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // --- LÓGICA DE MÚLTIPLA ESCOLHA (CHECKBOXES) ---
  const handleVocationChange = (option) => {
    let currentVocations = formData.vocation ? formData.vocation.split(',') : [];
    
    if (currentVocations.includes(option)) {
      // Se já tem, remove
      currentVocations = currentVocations.filter(v => v !== option);
    } else {
      // Se não tem, adiciona
      currentVocations.push(option);
    }
    
    // Junta tudo numa string e salva
    setFormData({ ...formData, vocation: currentVocations.join(',') });
  };

  // --- ENVIO DO FORMULÁRIO (SALVAR) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.vocation) {
      alert("Selecione pelo menos uma vocação!");
      return;
    }

    // Define se é Edição (PUT) ou Criação (POST)
    const url = initialData 
      ? `http://localhost:8080/hunts/${initialData.id}` 
      : 'http://localhost:8080/hunts';
    const method = initialData ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      alert(initialData ? 'Hunt atualizada!' : 'Hunt criada!');
      onHuntAdded(); // Atualiza a lista no App
    })
    .catch(error => console.error('Erro:', error));
  };

  // --- UPLOAD DE IMAGEM ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true); // Ativa o loading

    const data = new FormData();
    data.append('file', file);

    fetch('http://localhost:8080/hunts/upload', {
      method: 'POST',
      body: data
    })
    .then(response => response.text())
    .then(urlGerada => {
      setFormData(prev => ({ ...prev, imgUrl: urlGerada }));
      setUploading(false); // Desativa o loading
    })
    .catch(() => {
      setUploading(false);
      alert("Erro ao enviar imagem!");
    });
  };

  // Input Genérico (para textos simples)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-rubi-card p-6 rounded-lg border border-gray-700 mb-8 shadow-lg relative">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        {initialData ? 'Editar Hunt' : 'Cadastrar Nova Hunt'}
      </h3>
      
      {/* Botão de Fechar (X) */}
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold">X</button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* NOME */}
        <input name="title" placeholder="Nome da Hunt (Ex: Asura Mirror)" value={formData.title} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        
        {/* VOCAÇÕES (Checkboxes) */}
        <div className="bg-[#121212] border border-gray-600 rounded p-2">
          <label className="text-gray-400 text-xs font-bold block mb-2">Vocações Permitidas:</label>
          <div className="flex flex-wrap gap-3">
            {availableVocations.map(voc => (
              <label key={voc} className="flex items-center space-x-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={formData.vocation.split(',').includes(voc)}
                  onChange={() => handleVocationChange(voc)}
                  className="accent-rubi-green w-4 h-4"
                />
                <span className="text-white text-sm">{voc}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* LEVEL */}
        <input name="level" placeholder="Level Mínimo (Ex: 200+)" value={formData.level} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />

        {/* UPLOAD DE IMAGEM */}
        <div className="bg-[#121212] border border-gray-600 rounded p-2 text-white flex items-center gap-2">
           <input 
             type="file" 
             accept="image/*"
             onChange={handleFileChange}
             className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rubi-green file:text-black hover:file:bg-green-600"
           />
           {uploading && <span className="text-yellow-500 text-xs animate-pulse">Enviando...</span>}
           {formData.imgUrl && !uploading && <span className="text-green-500 font-bold text-sm">✓ Imagem OK</span>}
        </div>

        {/* LINK DO VÍDEO (Novo) */}
        <input 
          name="videoUrl" 
          placeholder="Link do YouTube (Ex: https://www.youtube.com/watch?v=...)" 
          value={formData.videoUrl} 
          onChange={handleChange} 
          className="bg-[#121212] border border-gray-600 rounded p-2 text-white" 
        />

        {/* XP */}
        <input name="xp" placeholder="XP/Hora (Ex: 5kk)" value={formData.xp} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />
        
        {/* PROFIT */}
        <input name="profit" placeholder="Lucro/Hora (Ex: 200k)" value={formData.profit} onChange={handleChange} required className="bg-[#121212] border border-gray-600 rounded p-2 text-white" />

        {/* BOTÃO DE AÇÃO */}
        <button type="submit" disabled={uploading} className="col-span-1 md:col-span-2 bg-rubi-green hover:bg-green-600 text-black font-bold py-2 rounded transition-colors mt-2 disabled:opacity-50">
          {initialData ? 'SALVAR ALTERAÇÕES' : 'CRIAR HUNT'}
        </button>
      </form>
    </div>
  );
}