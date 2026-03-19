import { useLocation } from "react-router-dom"
    

    
function protect(user: {name:string, email:string, role: string, has_access: {page_path:string}[] }){
    // if(user.roles.role_name !== 'administrateur'){
    //    const path = location.pathname
    //    if (path == '/dashboard') location.href = '/'
    //    const exist = user.roles.pages.find((p) => p.page_path == path)
    //    if(!exist) location.href = '/'
    // }else{

    // console.log('ici',user?.has_access?.find((p) => p.page_path == current_path))
     

     
    const paths = user?.has_access?.map((p) => p.page_path)
    return paths

}


export {
    protect
}