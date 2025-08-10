import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { FiUserPlus, FiCalendar, FiLayers, FiDollarSign, FiEdit3, FiSettings } from 'react-icons/fi'
import Showinfostudentsmodal from '@renderer/components/modalsform/Showinfostudentsmodal'
import AdUpinfostudentsmodal from '@renderer/components/modalsform/AdUpinfostudentsmodal'
import Addyearmodal from '@renderer/components/modalsform/Addyearmodal'
import Addclassemodal from '@renderer/components/modalsform/Addclassemodal'

function Parameters(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const { openModal, modal, closModal } = useMultiModals()

  const handleOpenModal = (modalName: string) => () => openModal(modalName)

  const buttons = [
    {  icon: <FiUserPlus size={28} />,  label: 'Ajouter un élève',  modalName: 'AdUpinfostudentsmodal'  },
    {  icon: <FiCalendar size={28} />,  label: 'Ajouter une année scolaire',  modalName: 'Addyearmodal' },
    { icon: <FiLayers size={28} />, label: 'Ajouter une classe', modalName: 'Addclassemodal' },
  ]

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#895256] mb-2">Paramètres Généraux</h1>
          <p className="text-gray-500 text-lg">
            Gérez les éléments clés de votre établissement ici
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {buttons.map((item, index) => (
            <button
              key={index}
              onClick={handleOpenModal(item.modalName)}
              className="bg-white border cursor-pointer border-[#e5e5e5] hover:scale-[1.03] transition-all duration-300  shadow-md rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl  hover:bg-[#f9f4f1] group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#895256] text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-lg text-[#333] font-semibold text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {modal.AdUpinfostudentsmodal && (
        <AdUpinfostudentsmodal
          closemodal={() => closModal('AdUpinfostudentsmodal')}
          mode="ajoutstudents"
        />
      )}
      {modal.Addyearmodal && <Addyearmodal closemodal={() => closModal('Addyearmodal')} />}
      {modal.Addclassemodal && <Addclassemodal closemodal={() => closModal('Addclassemodal')} />}
    </div>
  )
}

export default Parameters
