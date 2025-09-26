import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { FiUserPlus, FiCalendar, FiLayers, FiBookOpen, FiUserCheck, FiUploadCloud, FiDownloadCloud, FiCreditCard, FiBarChart2 } from 'react-icons/fi'
import AdUpinfostudentsmodal from '@renderer/components/modalsform/AdUpinfostudentsmodal'
import Addyearmodal from '@renderer/components/modalsform/Addyearmodal'
import Addniveaumodal from '@renderer/components/modalsform/Addniveaumodal'
import Choosestatusmoyennemodalparams from '@renderer/components/modalsform/Choosestatusmoyennemodalparams'
import Register from '@renderer/auth/register/Register'
import { MdMeetingRoom } from 'react-icons/md'
import Addsallemodal from '@renderer/components/modalsform/Addsallemodal'
import { FaUserTie } from 'react-icons/fa'
import { HiOutlineBookOpen, HiOutlineClipboardList } from 'react-icons/hi'
import AdUpEmployeemodal from '@renderer/components/modalsform/AdUpEmployeemodal'
import Addfonctionemployer from '@renderer/components/modalsform/Addfonctionemployer'
import { useRef, useState } from 'react'
import {  ToastContainer } from 'react-toastify'
import Addmatieremodal from '@renderer/components/modalsform/Addmatieremodal'
import Nifmodal from '@renderer/components/modalsform/Nifmodal'
import Statmodal from '@renderer/components/modalsform/Statmodal'

function Parameters(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const { openModal, modal, closModal } = useMultiModals()
    const [reload, setReload] = useState<boolean>(false)

  const handleOpenModal = (modalName: string) => () => openModal(modalName)

  const buttonsForParamsStudents = [
    { icon: <FiUserPlus size={28} />, label: 'Ajouter un élève', modalName: 'AdUpinfostudentsmodal' },
    { icon: <FiCalendar size={28} />, label: 'Ajouter une année scolaire', modalName: 'Addyearmodal' },
    { icon: <FiLayers size={28} />, label: 'Ajouter une niveau', modalName: 'Addniveaumodal' },
    { icon: <FiBookOpen size={28} />, label: `Réglage d'admission`, modalName: 'Choosestatusmoyennemodalparams' },
    { icon: <MdMeetingRoom size={28} />, label: `Ajouter une salle `, modalName: 'Addsallemodal' }
  ]
  const buttonsForParamsemployers = [
    { icon: <FaUserTie size={28} />, label: 'Ajouter un employé', modalName: 'AdUpEmployeemodal' },
    { icon: <HiOutlineClipboardList size={28} />, label: 'Ajouter une fonction', modalName: 'Addfonctionemployer' },
   { icon: <HiOutlineBookOpen    size={28} />, label: 'Ajouter une matière', modalName: 'Addmatieremodal' }
 ]


  const buttonsForParamsAdmin = [
    { icon: <FiUserCheck size={28} />, label: 'Ajouter un administrateur', modalName: 'registeremploye' },
  ]
  const buttonsForCongigNifStat = [
    { icon: <FiCreditCard size={28} />, label: 'Configuration NIF', modalName: 'Nifmodal' },
    { icon: <FiBarChart2 size={28} />, label: 'Configuration STAT', modalName: 'Statmodal' }
  ]




   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleClick = () => {
     fileInputRef.current?.click()
   }

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0]
     if (file) {
       console.log('Fichier importé :', file.name)
      
     }
   }

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''
      }`}
    >
      <div className="px-20 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#895256] mb-2">Paramètres Généraux</h1>
          <p className="text-gray-500 text-lg">
            Gérez les éléments clés de votre établissement ici
          </p>
        </div>
        {/* Section etudiants */}
        <h2 className="text-2xl sm:text-2xl font-semibold text-[#895256] mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-[#895256] rounded-full"></span>
          Paramètres Étudiants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {buttonsForParamsStudents.map((item, index) => (
            <button
              key={index}
              onClick={handleOpenModal(item.modalName)}
              className="bg-white border cursor-pointer border-[#e5e5e5] hover:scale-[1.03] transition-all duration-300 shadow-md rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:bg-[#f9f4f1] group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-lg text-[#333] font-semibold text-center">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Section administrateurs */}
        <h2 className="text-2xl sm:text-2xl font-semibold text-[#895256] mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-[#895256] rounded-full"></span>
          Paramètres Administrateurs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {buttonsForParamsAdmin.map((item, index) => (
            <button
              key={index}
              onClick={handleOpenModal(item.modalName)}
              className="bg-white border cursor-pointer border-[#e5e5e5] hover:scale-[1.03] transition-all duration-300 shadow-md rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:bg-[#f9f4f1] group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-lg text-[#333] font-semibold text-center">{item.label}</span>
            </button>
          ))}

          <div
            onClick={handleClick}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center p-6 gap-4 bg-white hover:border-[#9f7126] hover:bg-[#fdf8f3] shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white group-hover:rotate-12 transition-transform duration-300 shadow-md">
              <FiUploadCloud size={28} />
            </div>
            <span className="text-lg font-medium text-gray-700 group-hover:text-[#9f7126]">
              Importer une base de données
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv, .xlsx, .json" // type na fichier accepten ngiah
            />
          </div>

          <button className=" border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center  p-6 gap-4 bg-white hover:border-[#9f7126] hover:bg-[#fdf8f3] shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white group-hover:rotate-12 transition-transform duration-300 shadow-md">
              <FiDownloadCloud size={28} />
            </div>
            <span className="text-lg font-medium text-gray-700 group-hover:text-[#895256]">
              Exporter la base de données
            </span>
          </button>
        </div>
        {/* Section administrateurs */}
        <h2 className="text-2xl sm:text-2xl font-semibold text-[#895256] mb-4 flex items-center gap-2 mt-12">
          <span className="inline-block w-1.5 h-6 bg-[#895256] rounded-full"></span>
          Paramètres Employé
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {buttonsForParamsemployers.map((item, index) => (
            <button
              key={index}
              onClick={handleOpenModal(item.modalName)}
              className="bg-white border cursor-pointer border-[#e5e5e5] hover:scale-[1.03] transition-all duration-300 shadow-md rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:bg-[#f9f4f1] group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-lg text-[#333] font-semibold text-center">{item.label}</span>
            </button>
          ))}
        </div>

        <h2 className="text-2xl sm:text-2xl font-semibold text-[#895256] mb-4 flex items-center gap-2 mt-12">
          <span className="inline-block w-1.5 h-6 bg-[#895256] rounded-full"></span>
          Configuration de Nif et Stat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {buttonsForCongigNifStat.map((item, index) => (
            <button
              key={index}
              onClick={handleOpenModal(item.modalName)}
              className="bg-white border cursor-pointer border-[#e5e5e5] hover:scale-[1.03] transition-all duration-300 shadow-md rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:bg-[#f9f4f1] group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-lg text-[#333] font-semibold text-center">{item.label}</span>
            </button>
          ))}
        </div>

      
      </div>

      {/* Modals */}
      {modal.AdUpinfostudentsmodal && (
        <AdUpinfostudentsmodal
          closemodal={() => closModal('AdUpinfostudentsmodal')}
          mode="ajoutstudents"
        />
      )}
      {modal.Addyearmodal && <Addyearmodal closemodal={() => closModal('Addyearmodal')} />}
      {modal.Addniveaumodal && <Addniveaumodal closemodal={() => closModal('Addniveaumodal')} />}
      {modal.Choosestatusmoyennemodalparams && (
        <Choosestatusmoyennemodalparams
          closemodal={() => closModal('Choosestatusmoyennemodalparams')}
        />
      )}
      {modal.registeremploye && <Register closemodal={() => closModal('registeremploye')} />}
      {modal.Addsallemodal && <Addsallemodal closemodal={() => closModal('Addsallemodal')} />}
      {modal.Addfonctionemployer && (
        <Addfonctionemployer closemodal={() => closModal('Addfonctionemployer')} />
      )}
      {modal.Addmatieremodal && <Addmatieremodal closemodal={() => closModal('Addmatieremodal')} />}
      {modal.AdUpEmployeemodal && (
        <AdUpEmployeemodal reload={reload} fresh={setReload}  closemodal={() => closModal('AdUpEmployeemodal')} mode="ajoutemployer"  />
      )}
      {modal.Nifmodal && <Nifmodal closemodal={() => closModal('Nifmodal')} />}
      {modal.Statmodal && <Statmodal closemodal={() => closModal('Statmodal')} />}
    </div>
  )
}

export default Parameters
