import { FiPlus, FiX, FiTrash2, FiEdit } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import UpdateForSimpleInput from '../updatemodalparametres/UpdateForSimpleInput'
import useMultiModals from '@renderer/hooks/useMultiModals'

export const pages = [
  { name: 'Dashboard', path: '/home' },
  { name: 'Information des élèves', path: '/home/StudentsInfo' },
  { name: 'Gestion des notes', path: '/home/notemanagements' },
  { name: 'Ecolage', path: '/home/ecolagestudents' },
  { name: 'Droit', path: '/home/StudentsDroit' },
  { name: 'StudentsKermess', path: '/home/StudentsKermess' },
  { name: 'Paramètres', path: '/home/parametre' },
  { name: `information d'employés`, path: '/home/EmployeInfo' },
  { name: `Suivie d'employés`, path: '/home/Employersuivi' },
  { name: 'Historique', path: '/home/Historique' }
]

type AddRoleProps = { closemodal: () => void }

type FormData = { role: string }

interface RoleItem {
  role: string
  id: number
  pages?: string[]
}

interface RoleToDelete {
  id: number
  role: string
}

const schema = yup.object({
  role: yup.string().required('Vous devez saisir un rôle')
})

const AddRole: React.FC<AddRoleProps> = ({ closemodal }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [roles, setRoles] = useState<RoleItem[]>([])
  const [reload, setReload] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<RoleToDelete | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const { openModal, modal, closModal } = useMultiModals()
  const [editData, setEditData] = useState<{ id: number; value: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [selectedPages, setSelectedPages] = useState<string[]>([])

  const handlePageToggle = (path: string) => {
    const newSelected = selectedPages.includes(path)
      ? selectedPages.filter((p) => p !== path)
      : [...selectedPages, path]
    setSelectedPages(newSelected)
    console.log('Pages choisies:', newSelected)
  }

  const getRoles = async () => {
    try {
      const { data } = await axiosRequest('GET', 'role-list', null, 'token')
      setRoles(data)
    } catch (e) {
      console.log('Le serveur ne répond pas')
    }
  }

  useEffect(() => {
    getRoles()
  }, [reload, activeTab])

  const onSubmit = async (data: FormData) => {
      setIsLoading(true)
       console.log('Données lasa:', { ...data, pages: selectedPages })
    try {
      await axiosRequest('POST', 'role-creation', { ...data, pages: selectedPages }, 'token')
      toast.success('Rôle ajouté avec succès')
      reset()
      setSelectedPages([])
      setActiveTab('historique')
    } catch (err) {
      console.error(err)
      toast.error("Erreur lors de l'ajout")
    } finally {
      setIsLoading(false)
    }
  }

  const removeRole = async (id: number) => {
    try {
      await axiosRequest('DELETE', `role/${id}`, null, 'token')
      toast.success('Rôle supprimé')
      setReload(!reload)
    } catch (e) {
      console.log(e)
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleClickDelete = (id: number, role: string) => setRoleToDelete({ id, role })
  const handleConfirmDelete = async () => {
    if (!roleToDelete) return
    setIsDeletingLoader(true)
    try {
      await removeRole(roleToDelete.id)
    } finally {
      setIsDeletingLoader(false)
      setRoleToDelete(null)
    }
  }
  const handleCloseDeleteModal = () => setRoleToDelete(null)

  const handleClickEdit = (item: { id: number; role?: string; pages?: string[] }) => {
    setEditData({ id: item.id, value: item.role || '' })
    setSelectedPages(item.pages || [])
    openModal('updaterole')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Ajouter un Rôle</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 animate-fade-in max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('ajouter')}
              className={`text-lg font-semibold transition ${
                activeTab === 'ajouter' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('historique')}
              className={`text-lg font-semibold transition ${
                activeTab === 'historique' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              Historique
            </button>
          </div>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>

     
        {activeTab === 'ajouter' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              placeholder="Ex: Admin"
              {...register('role')}
              className={`w-full px-6 py-4 border rounded-2xl focus:ring-2 focus:ring-[#9f7126] focus:outline-none transition-shadow duration-300 text-[#212529] ${
                errors.role
                  ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                  : 'border-gray-300 shadow-sm'
              }`}
            />
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}

            {/* Checkboxes pages */}
            <div className="mt-4">
              <h2 className="font-semibold mb-3 text-[#212529]">
                Pages accessibles pour ce rôle :
              </h2>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-[#895256] scrollbar-track-gray-100">
                {pages.map((page) => (
                  <label
                    key={page.path}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.path)}
                      onChange={() => handlePageToggle(page.path)}
                      className="form-checkbox h-5 w-5 text-[#895256] accent-[#895256]"
                    />
                    <span className="text-[#212529]">{page.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={closemodal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition-all font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] transition font-semibold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <ThreeDots visible={true} height="20" width="50" color="white" radius="9" />
                ) : (
                  <>
                    <FiPlus size={18} /> Ajouter
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-[#895256] scrollbar-track-gray-100">
            {roles.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">Aucun rôle ajouté</p>
            ) : (
              <ul className="space-y-4">
                {roles.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center shadow hover:shadow-md transition"
                  >
                    <div>
                      <span className="font-semibold text-[#212529]">{item.role}</span>
                      {item.pages && item.pages.length > 0 && (
                                <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-1">
                                    {/* ******************************************************** mbol amodifiegna design  */}
                          {item.pages.map((p) => (
                            <span
                              key={p}
                              className="bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                            >
                              {pages.find((page) => page.path === p)?.name || p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        aria-label={`Modifier le rôle`}
                        onClick={() => handleClickEdit(item)}
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        aria-label={`Supprimer le rôle ${item.role}`}
                        onClick={() => handleClickDelete(item.id, item.role)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {roleToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le rôle"
          message={`Voulez-vous vraiment supprimer le rôle "${roleToDelete.role}" ?`}
          onConfirm={handleConfirmDelete}
          closemodal={handleCloseDeleteModal}
          isDeletingLoader={isDeletingLoader}
        />
      )}

      {modal.updaterole && editData && (
        <UpdateForSimpleInput
          id={editData.id}
          defaultValue={editData.value}
          fieldName="role"
          title="Modifier ce rôle"
          placeholder="Ex: Admin"
          updateUrl="role-update"
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
          closemodal={() => closModal('updaterole')}
          reload={() => setReload(!reload)}
        />
      )}
    </div>
  )
}

export default AddRole
