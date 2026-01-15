// rubihunt-web/src/api.js

export const API_URL = import.meta.env.PROD 
  ? 'https://rubihunt-api.onrender.com'  // Link da produção (Render)
  : 'http://localhost:8080';             // Link do seu computador