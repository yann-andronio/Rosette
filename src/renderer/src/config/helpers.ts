
import axios  from 'axios'
const BASE_URL = import.meta.env.VITE_BACKEND_URL
const headers = (token:string) =>  ({headers:{'Access-Control-Allow-Origin':BASE_URL,Authorization:`BEARER ${token}`}})


const axiosRequest =async (type:"GET"|"POST"|"DELETE"|"PUT", route:string, data:any, token:string):Promise<any>=> {
  if(type === "GET"){
   return await axios.get(`${BASE_URL}/api/${route}`,  headers(token))
  }else if(type === "POST"){
 return await  axios.post(`${BASE_URL}/api/${route}`, data, headers(token))
  }else if(type === "DELETE"){
   return await axios.delete(`${BASE_URL}/api/${route}`, headers(token))
  }else if(type === "PUT"){
  return await axios.put(`${BASE_URL}/api/${route}`, data, headers(token))
  }
}
export { headers, axiosRequest }

