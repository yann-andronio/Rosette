import { useState } from "react";
type modalstate = {
    [key:string]: boolean;
}

const useMultiModals = () => {
    const [modal, setModal] = useState<modalstate>({})

    const openModal = (key:string) => {
      setModal((prev) => ({ ...prev, [key]: true }))
    }
    const closModal = (key:string) => {
        setModal((prev) => ({...prev , [key]:false}))
    }
    const toggleModal = (key:string) => {
        setModal((prev) => ({...prev , [key]:!prev[key]}))
    }

    return {
        modal,
        openModal,
        closModal,
        toggleModal,
    }
}

export default useMultiModals;