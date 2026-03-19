import { useState, createContext, useEffect } from 'react'

export const UserProvider = createContext({
  user:null as any,
  setUser:(data:any) => {}
})


export function UserContext ({children}) {

  const [user, setUser] = useState<any>({})


  return <>
    <UserProvider.Provider value={{user, setUser}}>
      {children}
    </UserProvider.Provider>


  </>
}
