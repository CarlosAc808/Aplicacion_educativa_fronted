import axios from 'axios'

const PUBLIC_ROUTES = ['/login', '/register']

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://aplicacion-educativa.onrender.com/api',
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ROUTES.some((route) => config.url?.endsWith(route))
  const token = localStorage.getItem('quest-token')
  if (token && !isPublic) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

//http://localhost:8000/api