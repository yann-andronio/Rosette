
import axios  from 'axios'


const BASE_URL = import.meta.env.VITE_BACKEND_URL
const headers = (token:string|null) =>  ({headers:{'Access-Control-Allow-Origin':BASE_URL,Authorization:`Bearer ${token}`}})


const axiosRequest =async (type:"GET"|"POST"|"DELETE"|"PUT", route:string, data:any, token:string):Promise<any> => {

  if(type === "GET"){
   return await axios.get(`${BASE_URL}/api/${route}`,  headers(localStorage.getItem('ACCESS_TOKEN')))
  }else if(type === "POST"){
 return await  axios.post(`${BASE_URL}/api/${route}`, data, headers(localStorage.getItem('ACCESS_TOKEN')))
  }else if(type === "DELETE"){
   return await axios.delete(`${BASE_URL}/api/${route}`, headers(localStorage.getItem(('ACCESS_TOKEN'))))
  }else if(type === "PUT"){
  return await axios.put(`${BASE_URL}/api/${route}`, data, headers(localStorage.getItem('ACCESS_TOKEN')))
  }
}
export { headers, axiosRequest }

