import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

/** Headers par défaut avec le token Bearer depuis localStorage */
const authHeaders = () => ({
  headers: {
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN') ?? ''}`
  }
})

/**
 * Intercepteur global — redirige vers login si le token est expiré (401)
 */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
      window.location.hash = '/'
    }
    return Promise.reject(error)
  }
)

/**
 * Wrapper Axios centralisé
 * @param type    Méthode HTTP
 * @param route   Route API (sans préfixe)
 * @param data    Corps de la requête (null pour GET/DELETE)
 */
const axiosRequest = async (
  type: 'GET' | 'POST' | 'DELETE' | 'PUT',
  route: string,
  data: unknown
): Promise<any> => {
  const url = `${BASE_URL}/api/${route}`
  const cfg = authHeaders()

  switch (type) {
    case 'GET':    return axios.get(url, cfg)
    case 'POST':   return axios.post(url, data, cfg)
    case 'DELETE': return axios.delete(url, cfg)
    case 'PUT':    return axios.put(url, data, cfg)
  }
}

export { authHeaders, axiosRequest }
