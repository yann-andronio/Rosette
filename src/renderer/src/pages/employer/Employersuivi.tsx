import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { useState } from 'react'
import { FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { useFilterData } from '@renderer/hooks/useFilterData'
import { EmployerType } from '@renderer/types/Alltypes'
import { EmployersData } from '@renderer/data/EmployersData'
import AdUpEmployeemodal from '@renderer/components/modalsform/AdUpEmployeemodal'
import EmployerCardSuivi from '@renderer/components/card/EmployerCardSuivi'
import Addsuiviemployeemodal from '@renderer/components/modalsform/Addsuiviemployeemodal'

function Employersuivi(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searchEmployes, setSearchEmployes] = useState('')
  const [selectedEmployer, setSelectedEmployer] = useState<EmployerType | null>(
    EmployersData.length > 0 ? EmployersData[0] : null
  )

  const handleSearchEmployes = (search: string) => setSearchEmployes(search)
  const filteredData = useFilterData(EmployersData, searchEmployes, [
    'nom',
    'prenom',
    'fonction',
    'matieresSalles'
  ])
  const { modal, openModal, closModal } = useMultiModals()
  console.log(selectedEmployer)

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        {/* <h2 className="text-2xl font-bold text-[#212529] mb-6">Liste des employés</h2> */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearchEmployes} />
          <div className="bg-white text-[#212529] shadow px-4 py-2 rounded-lg text-sm font-medium">
            Total employés : <span className="font-bold">{EmployersData.length}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 overflow-x-auto bg-white rounded-xl p-4 shadow-md">
            <div className="flex px-4 py-2 bg-[#895256] text-white rounded-lg font-semibold text-sm mb-2">
              <div className="w-12">Photo</div>
              <div className="flex-1 text-start ml-12">Nom</div>
              <div className="flex-1 text-start">Prénoms</div>
              <div className="flex-1 text-start">Fonction</div>
              <div className="flex-1 text-start">Actions</div>
            </div>

            <div className="space-y-2 h-[52.5vh] overflow-y-auto">
              {filteredData.length === 0 ? (
                <div className="text-center mt-10 text-gray-600">Aucun employé trouvé</div>
              ) : (
                filteredData.map((employer, index) => (
                  <div
                    key={employer.id}
                    onClick={() => setSelectedEmployer(employer)}
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    } hover:bg-gray-50 hover:border-l-4 border-[#895256] hover:shadow-lg transition duration-300`}
                  >
                    <div className="w-12 h-12 flex items-start justify-center mr-3">
                      <div className="bg-[#895256] p-2 rounded-full">
                        <FaUserCircle className="text-2xl text-white" />
                      </div>
                    </div>

                    <div className="flex-1 font-semibold text-start pl-9 text-gray-800">
                      {employer.nom}
                    </div>
                    <div className="flex-1 text-start text-gray-700">{employer.prenom}</div>
                    <div className="flex-1 text-start text-gray-700">{employer.fonction}</div>

                    <div className="flex-1 flex justify-start  gap-3 text-[#9f7126] text-lg">
                      <FaEdit
                        onClick={() => openModal('Addsuiviemployeemodal')}
                        className="hover:text-black cursor-pointer transition"
                      />
                      <FaTrash className="hover:text-red-600 cursor-pointer transition" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- Card mpiasa  --- */}
          {selectedEmployer && (
            <div className="w-full lg:w-[35%]">
              <EmployerCardSuivi employer={selectedEmployer} />
            </div>
          )}
        </div>

        {/* pagination */}

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-600 text-sm">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              &lt;
            </span>
            Précédent
          </button>
          <div className="flex gap-2 mt-3 md:mt-0">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full font-medium ${
                  page === 1
                    ? 'bg-[#9f7126] text-white'
                    : 'bg-gray-200 hover:bg-[#9f7126] hover:text-white transition'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group">
            Suivant
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </button>

          {modal.Addsuiviemployeemodal && selectedEmployer && (
            <Addsuiviemployeemodal
              employer={selectedEmployer}
              closemodal={() => closModal('Addsuiviemployeemodal')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Employersuivi
