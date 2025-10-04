import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaUserCircle, FaUserTie } from 'react-icons/fa'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'

import { EmployerType } from '@renderer/types/Alltypes'

import EmployerCardSuivi from '@renderer/components/card/EmployerCardSuivi'
import Addsuiviemployeemodal from '@renderer/components/modalsform/Addsuiviemployeemodal'
import { axiosRequest } from '@renderer/config/helpers'
import { toast, ToastContainer } from 'react-toastify'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'
import { RotatingLines } from 'react-loader-spinner'

function Employersuivi(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searchEmployes, setSearchEmployes] = useState('')
  const [workers, setWorkkers] = useState<{
    per_page: number
    total: number
    last_page: number
    data: EmployerType[]
  }>({ last_page: 1, data: [], total: 0, per_page: 0 })
  const [w_id, setW_id] = useState<number>()

  const [selectedEmployer, setSelectedEmployer] = useState<EmployerType | null>(
    workers.data.length > 0 ? workers.data[0] : null
  )

  const auto = async () => {
    try {
      await axiosRequest('GET', 'conge-auto-stop', null, 'token')
        .then(() => setReload(!reload))
        .catch((error) => console.log(error.response.data.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    auto()
  }, [])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [reload, setReload] = useState<boolean>(false)

  const nextPage = (page: number) => {
    setCurrentPage(page)
  }

  const precedent = (current) => {
    if (current > 1) {
      setCurrentPage(current - 1)
    }
  }

  const suivant = (current) => {
    if (current < workers.last_page) {
      setCurrentPage(current + 1)
    }
  }
  const pagination: number[] = []
  for (let i: number = 1; i <= Math.ceil(workers?.total / workers.per_page); i++) {
    pagination.push(i)
  }

  const getWorkers = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', `worker-list?q=${searchEmployes}`, null, 'token')
        .then(({ data }) => setWorkkers(data))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error.response.data.error))
        .finally(() => setIsLoading(false))
    } catch (err) {
      console.log('Le serveur ne repond pas')
    }
  }
  useEffect(() => {
    getWorkers()
  }, [searchEmployes, reload])
  const handleSearchEmployes = (search: string) => setSearchEmployes(search)
  const { modal, openModal, closModal } = useMultiModals()

  const deletes = async (id: number) => {
    try {
      await axiosRequest('DELETE', `worker/${id}`, null, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setReload(!reload))
        .catch((error) => toast.error(error.response.data.error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const [employerToDelete, setEmployerToDelete] = useState<{
    id: number
    nom_employer: string
  } | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)

  const handleclickDelete = (id: number, nom_employer: string) => {
    setEmployerToDelete({ id, nom_employer })
    openModal('confirmDelete')
  }

  const handleConfirmDelete = async () => {
    if (!employerToDelete) return
    setIsDeletingLoader(true)
    try {
      await deletes(employerToDelete.id)
    } finally {
      setIsDeletingLoader(false)
      setEmployerToDelete(null)
      closModal('confirmDelete')
    }
  }

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        {/* <h2 className="text-2xl font-bold text-[#212529] mb-6">Liste des employés</h2> */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearchEmployes} />
          <div className="bg-white text-[#212529] shadow px-4 py-2 rounded-lg text-sm font-medium">
            Total employés : <span className="font-bold">{workers.total}</span>
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
              {isLoading ? (
                <div className="flex w-full h-full items-center justify-center">
                  <RotatingLines
                    visible={true}
                    strokeColor="#7A3B3F"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              ) : (
                <>
                  {workers.data.length === 0 ? (
                    <div className="text-center mt-10 text-gray-600">Aucun employé trouvé</div>
                  ) : (
                    workers.data.map((employer, index) => (
                      <div
                        key={employer.id}
                        onClick={() => setSelectedEmployer(employer)}
                        className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                        } hover:bg-gray-50 hover:border-l-4 border-[#895256] hover:shadow-lg transition duration-300`}
                      >
                        <div className="w-12 h-12 flex items-start justify-center mr-3">
                          {employer.photo ? (
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${employer.photo}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="bg-[#895256] p-2 rounded-full">
                              <FaUserCircle className="text-5xl text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 font-semibold text-start pl-9 text-gray-800">
                          {employer.nom}
                        </div>
                        <div className="flex-1 text-start text-gray-700">{employer.prenom}</div>
                        <div className="flex-1 text-start text-gray-700">
                          {employer.profs.profession}
                        </div>

                        <div className="flex-1 flex justify-start  gap-3 text-[#9f7126] text-lg">
                          <FaUserTie
                            onClick={() => openModal('Addsuiviemployeemodal')}
                            className="hover:text-black cursor-pointer transition"
                          />
                          <FaTrash
                            onClick={() => handleclickDelete(employer.id, employer.nom)}
                            className="hover:text-red-600 cursor-pointer transition"
                          />
                        </div>
                      </div>
                    ))
                  )}{' '}
                </>
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
          <button
            onClick={() => precedent(currentPage)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              &lt;
            </span>
            Précédent
          </button>
          <div className="flex gap-2 mt-3 md:mt-0">
            {pagination.map((page) => (
              <button
                key={page}
                onClick={() => nextPage(page)}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer ${
                  page === 1
                    ? 'bg-[#9f7126] text-white'
                    : 'bg-gray-200 hover:bg-[#9f7126] hover:text-white transition'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => suivant(currentPage)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group"
          >
            Suivant
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </button>

          {modal.Addsuiviemployeemodal && selectedEmployer && (
            <Addsuiviemployeemodal
              employer={selectedEmployer}
              reloads={reload}
              setReloads={setReload}
              closemodal={() => closModal('Addsuiviemployeemodal')}
            />
          )}
        </div>

        {modal.confirmDelete && employerToDelete && (
          <ConfirmDeleteModal
            title="Supprimer la classe"
            message={`Voulez-vous vraiment l'emplyer ${employerToDelete.nom_employer} ?`}
            onConfirm={handleConfirmDelete}
            closemodal={() => closModal('confirmDelete')}
            isDeletingLoader={isDeletingLoader}
          />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}

export default Employersuivi
