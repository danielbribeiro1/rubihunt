import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Hook para mudar de página

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password })
    })
    .then(response => {
      if (response.ok) {
        // Se deu certo, salva o "crachá" no navegador
        localStorage.setItem('adminToken', 'LOGADO');
        navigate('/admin'); // Manda para o painel
      } else {
        setError(true); // Mostra erro
      }
    })
    .catch(() => setError(true));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-rubi-card p-8 rounded-lg border border-gray-700 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Área Restrita 🔒</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Senha de Administrador</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded p-3 text-white focus:border-rubi-green outline-none transition-colors"
              placeholder="Digite a senha..."
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-bold">Senha Incorreta!</p>}

          <button 
            type="submit" 
            className="bg-rubi-green hover:bg-green-600 text-black font-bold py-3 rounded transition-all mt-2"
          >
            ENTRAR
          </button>
        </form>
        
        <a href="/" className="block text-center text-gray-500 text-sm mt-6 hover:text-white">
          ← Voltar para o site
        </a>
      </div>
    </div>
  );
}