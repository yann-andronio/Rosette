import { useState, createContext, useEffect } from 'react'
import { axiosRequest } from "@renderer/config/helpers";
export const UserProvider = createContext({
  user:null as any,
  setUser:(data:any) => {}
})
export function UserContext ({children}) {

  const [user, setUser] = useState<any>({})

  const getUser = async () => {

    try{
      await axiosRequest('GET', 'user', null, 'token')
        .then(({data}) => setUser({email:data?.email, name:data?.name, role:data?.role, firstname:data?.firstname}))
    }catch (error){
      console.log(error)
    }

  }

  useEffect(() => {
    getUser()
  }, []);

  return <>
    <UserProvider.Provider value={{user, setUser}}>
      {children}
    </UserProvider.Provider>


  </>
}
