


const headers = (token:string) =>  ({headers:{'Access-Control-Allow-Origin':import.meta.env.VITE_BACKEND_URL,Authorization:`BEARER ${token}`}})



export { headers }

