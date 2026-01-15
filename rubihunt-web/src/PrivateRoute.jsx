import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  // Verifica se existe o token no localStorage
  const isAuthenticated = localStorage.getItem('adminToken') === 'LOGADO';

  // Se estiver logado, mostra a página (children). Se não, manda pro Login.
  return isAuthenticated ? children : <Navigate to="/login" />;
}