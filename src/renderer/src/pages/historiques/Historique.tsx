import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { FaUserGraduate, FaUsers, FaMoneyBillWave, FaCogs } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import { formatDate } from '@renderer/utils/FormatDate'
import { RotatingLines } from 'react-loader-spinner'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'

interface StatCard {
  type: string
  count: number
  icon: JSX.Element
  color: string
}

export default function Historique() {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const { modal, openModal, closModal } = useMultiModals()
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const [historiqueToDelete, setHistoriqueToDelete] = useState(false)

  const stats: StatCard[] = [
    { type: 'Étudiants', count: 12, icon: <FaUserGraduate size={24} />, color: '#895256' },
    { type: 'Employés', count: 7, icon: <FaUsers size={24} />, color: '#895256' },
    { type: 'Paiements', count: 20, icon: <FaMoneyBillWave size={24} />, color: '#895256' },
    { type: 'Paramètres', count: 3, icon: <FaCogs size={24} />, color: '#895256' }
  ]

  const [isLoading, setIsLoading] = useState(false)

  const [searchHistorique, setSearchHistorique] = useState<string>('')
  const [activeFilter, setActiveFilter] = useState<string>('Tout')
  const [historiques, setHistoriques] = useState<
    {
      id: number
      type: string
      details: string
      created_at: string
      user: { name: string; firstname: string }
    }[]
  >([])
  const [reload, setReload] = useState(false)
  const [stat, setStats] = useState<{
    param: number
    etudiant: number
    financier: number
    employe: number
  }>({
    param: 0,
    etudiant: 0,
    financier: 0,
    employe: 0
  })
  const getHistoriques = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', `audit?type=${activeFilter}&q=${searchHistorique}`, null, 'token')
        .then(({ data }) => setHistoriques(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getHistoriques()
  }, [activeFilter, searchHistorique, reload])

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getStats = async () => {
    try {
      await axiosRequest('GET', 'audit-stats', null, 'token')
        .then(({ data }) => setStats(data))
        .catch((error) => console.log(error.response.data.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getStats()
  }, [reload])
  // const handleDelete = async () => {
  //   try {
  //     await axiosRequest('POST', 'audit-del', { ids: selectedRows }, 'token')
  //       .then(({ data }) => toast.success(data.message))
  //       .then(() => setReload(!reload))
  //       .catch((error) => console.log(error))
  //   } catch (error) {
  //     console.log('Le serveur ne repond pas')
  //   }
  //   setSelectedRows([])
  // }

  const handleFilterClick = (type: string) => {
    setActiveFilter(type)
    console.log('Filtre sélectionné :', type)
  }

  const handleSearHistorique = (datahistorique: string) => {
    setSearchHistorique(datahistorique)
  }

  const openDeleteModal = () => {
    if (selectedRows.length > 0) {
      setHistoriqueToDelete(true)
      openModal('confirmDelete')
    }
  }

  const handleConfirmDelete = async () => {
    setIsDeletingLoader(true)
    try {
      await axiosRequest('POST', 'audit-del', { ids: selectedRows }, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setReload(!reload))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    } finally {
      setIsDeletingLoader(false)
      closModal('confirmDelete')
    }
    setSelectedRows([])
  }

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">{stats[0].type}</span>
              <div
                className={`w-12 h-12 p-3 flex items-center justify-center rounded-full text-white`}
                style={{ backgroundColor: stats[0].color }}
              >
                {stats[0].icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-[#212529]">{stat.etudiant}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">{stats[1].type}</span>
              <div
                className={`w-12 h-12 p-3 flex items-center justify-center rounded-full text-white`}
                style={{ backgroundColor: stats[1].color }}
              >
                {stats[1].icon}
                {stat.employe}
              </div>
            </div>
            <p className="text-2xl font-bold text-[#212529]">{stat.employe}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">{stats[2].type}</span>
              <div
                className={`w-12 h-12 p-3 flex items-center justify-center rounded-full text-white`}
                style={{ backgroundColor: stats[2].color }}
              >
                {stats[2].icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-[#212529]">{stat.financier}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">{stats[3].type}</span>
              <div
                className={`w-12 h-12 p-3 flex items-center justify-center rounded-full text-white`}
                style={{ backgroundColor: stats[3].color }}
              >
                {stats[3].icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-[#212529]">{stat.param}</p>
          </div>
        </div>

        {/* Boutons de filtrage */}
        <div className=" flex  justify-between  mb-6 items-center">
          <Searchbar onSearch={handleSearHistorique} />

          <div className="flex flex-wrap gap-4 ">
            {['Tout', 'Étudiants', 'Employé', 'Financier', 'Paramètres'].map((item, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(item)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${
                  activeFilter === item
                    ? 'bg-[#895256] text-white'
                    : 'bg-white text-[#212529] border border-gray-300 hover:bg-[#f3e8f0]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/*  historique table */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#212529]">
              Historique(s) ({historiques.length})
            </h2>
            {selectedRows.length > 0 && (
              <button
                onClick={openDeleteModal}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <MdOutlineDelete size={20} /> Supprimer ({selectedRows.length})
              </button>
            )}
          </div>

          {/* table historique  */}
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === historiques?.length && historiques?.length > 0
                        }
                        onChange={(e) =>
                          setSelectedRows(
                            e.target.checked ? historiques.map((item) => item.id) : []
                          )
                        }
                        className="accent-[#895256]"
                      />
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                      Détails
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                      par
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      {/* colSpan=5 car il y a 5 colonnes dans l'en-tête */}
                      <td colSpan={5} className="text-center py-10 min-h-[200px]">
                        <div className="flex items-center justify-center w-full">
                          <RotatingLines
                            visible={true}
                            strokeColor="#7A3B3F"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-gray-200">
                    {historiques.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          selectedRows.includes(item.id) ? 'bg-gray-100' : ''
                        }`}
                      >
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRow(item.id)}
                            className="accent-[#895256]"
                          />
                        </td>
                        <td className="px-6 py-2 text-sm">{item.type}</td>
                        <td className="px-6 py-2 text-sm">{item.details}</td>
                        <td className="px-6 py-2 text-sm">
                          {item.user.name + ' ' + item.user.firstname}
                        </td>
                        <td className="px-6 py-2 text-sm">{formatDate(item.created_at)}</td>
                      </tr>
                    ))}

                    {!isLoading && historiques.length === 0 && (
                      <tr>
                        {/*  colSpan={5} pour centrer le message sur toute la largeur de la table */}
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          Aucun historique trouvé pour la sélection actuelle.
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {modal.confirmDelete && historiqueToDelete && (
        <ConfirmDeleteModal
          title="Supprimer l'historique"
          message={`Voulez-vous vraiment supprimer les ${selectedRows.length} enregistrement(s) d'historique sélectionné(s) ? Cette action est irréversible.`} // Message adapté aux IDs sélectionnés
          onConfirm={handleConfirmDelete}
          closemodal={() => {
            closModal('confirmDelete')
            setHistoriqueToDelete(false)
          }}
          isDeletingLoader={isDeletingLoader}
        />
      )}
    </div>
  )
}
