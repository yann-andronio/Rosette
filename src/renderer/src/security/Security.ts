function protect(user: {name:string, email:string, roles: {role_name:string, pages: {page_path:string}[] }}){
    if(user.roles.role_name !== 'administrateur'){
       const path = location.pathname
       if (path == '/dashboard') location.href = '/'
       const exist = user.roles.pages.find((p) => p.page_path == path)
       if(!exist) location.href = '/'
    }else{
        
    }
}


export {
    protect
}