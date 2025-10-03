import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { LuCalendarDays, LuGraduationCap, LuUsers } from 'react-icons/lu'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'
import AdUpinfostudentsmodal from '@renderer/components/modalsform/AdUpinfostudentsmodal'
import Showinfostudentsmodal from '@renderer/components/modalsform/Showinfostudentsmodal'
import { MdMeetingRoom } from 'react-icons/md'
import { axiosRequest } from '@renderer/config/helpers'
import { Oval, RotatingLines } from 'react-loader-spinner'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'
import { toast, ToastContainer } from 'react-toastify'
export type Etudiant = {
  id: number
  ecolage: { id: number; payé: boolean; mois: string; created_at: string }[]
  nom: string
  prenom: string
  sexe: number
  dateNaissance: string
  lieuNaissance: string
  adresse: string
  nomPere: string | null
  nomMere: string | null
  telephonePere: string | null
  telephoneMere: string | null
  prenomMere: string | null
  prenomPere: string | null
  nomTuteur: string | null
  prenomTuteur: string | null
  telephoneTuteur: string | null
  matricule: string
  ecole: string
  photo: string
  created_at: string
  updated_at: string
  enfantProf: number
  sousetudiants: {
    id: number
    cl_id: number
    sa_id: number
    ac_id: number
    et_id: number
    note1: number | null
    note2: number | null
    note3: number | null
    noteTotal: number | null
    created_at: string
    updated_at: string
    status_admissions: string
    transfert: number
    classe: {
      id: number
      nom_classe: string
      ecolage: number
      ac_id: number
      created_at: string
      updated_at: string
      droit: number
      kermesse: number
    }
    salle: {
      id: number
      nom_salle: string
      effectif: number
      cl_id: number
      ac_id: number
      created_at: string
      updated_at: string
    }
    annee: {
      id: number
      annee: string
      created_at: string
      updated_at: string
    }
  }[]
}

function Studentsinfo(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searcheleves, setSearcheleves] = useState('')
  const [selectedyear, setselectedyear] = useState<string>('0')
  const [selectedsalle, setselectedsalle] = useState<string>('0')
  const [selectedniveau, setselectedniveau] = useState<string>('0')
  const [selectedSexe, setSelectedSexe] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [acs, setAcs] = useState<{ id: number; annee: string }[]>([])
  const [classes, setClasses] = useState<{ id: number; nom_classe: string }[]>([])
  const [salles, setSalles] = useState<{ id: number; nom_salle: string }[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Etudiant | null>(null)
  const [students, setStudents] = useState<{
    per_page: number
    total: number
    last_page: number
    data: Etudiant[]
  }>({ last_page: 1, data: [], total: 0, per_page: 0 })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lines, setLines] = useState<number>(15)
  const [et_id, setEt_id] = useState<number | null>(null)
  const [reload, setReload] = useState<boolean>(false)
  const getClasse = async () => {
    try {
      await axiosRequest('GET', 'classe-list', null, 'token')
        .then(({ data }) => setClasses(data))
        .catch((error) => console.log(error.response?.data?.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getSalle = async () => {
    try {
      await axiosRequest('GET', 'salle-list', null, 'token')
        .then(({ data }) => setSalles(data))
        .catch((error) => console.log(error.response?.data?.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getAcs = async () => {
    try {
      await axiosRequest('GET', 'ac-list', null, 'token')
        .then(({ data }) => setAcs(data))
        .catch((error) => console.log(error.response?.data?.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getAcs()
    getClasse()
    getSalle()
  }, [])

  const nextPage = (page: number) => {
    setCurrentPage(page)
  }

  const getEtudiants = async () => {
    setIsLoading(true)
    try {
      await axiosRequest(
        'GET',
        `etudiant-list?page=${currentPage}&lines=${lines}&sexe=${selectedSexe}&annee=${selectedyear}&classe=${selectedniveau}&salle=${selectedsalle}&q=${searcheleves}&q=${searcheleves}`,
        null,
        'token'
      )
        .then(({ data }) => setStudents(data))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error.response.data?.message))
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const precedent = (current) => {
    if (current > 1) {
      setCurrentPage(current - 1)
    }
  }

  const suivant = (current) => {
    if (current < students.last_page) {
      setCurrentPage(current + 1)
    }
  }

  useEffect(() => {
    getEtudiants()
  }, [
    currentPage,
    lines,
    selectedSexe,
    selectedyear,
    selectedniveau,
    selectedsalle,
    searcheleves,
    reload
  ])

  const pagination: number[] = []
  for (let i: number = 1; i <= Math.ceil(students?.total / students.per_page); i++) {
    pagination.push(i)
  }
  const handleselect = (current: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((prev) => (prev === current ? '0' : current))
  }

  const handleSearcheleves = (dataeleve: string) => {
    setSearcheleves(dataeleve)
  }

  const { modal, openModal, closModal } = useMultiModals()
//  ${ Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}
  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ''
      } transition-all duration-[600ms] ease-in-out`}
    >
      <div className="px-20 py-8">
        <div className="bigboxfilter grid grid-cols-3 gap-6 w-full lg:flex-row justify-center">
          {/* Filtre Année */}
          <div className="filter z-0 p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuCalendarDays size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une année</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {acs.map((year, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(year.id.toString(), setselectedyear)}
                  className={`${
                    selectedyear == year.id.toString()
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {year.annee}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre niveau */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuGraduationCap size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une niveau</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {classes.map((niv, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(niv.id.toString(), setselectedniveau)}
                  className={`${
                    selectedniveau == niv.id.toString()
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {niv.nom_classe}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre salle */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <MdMeetingRoom size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une salle</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {salles.map((sl, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(sl.id.toString(), setselectedsalle)}
                  className={`${
                    selectedsalle === sl.id.toString()
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {sl.nom_salle}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre sexe */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuUsers size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez un sexe</h1>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[100px] pr-2">
              <button
                onClick={() => handleselect('Homme', setSelectedSexe)}
                className={`${
                  selectedSexe === 'Homme'
                    ? 'bg-[#895256] text-white border-none'
                    : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Garçons
              </button>
              <button
                onClick={() => handleselect('Femme', setSelectedSexe)}
                className={`${
                  selectedSexe === 'Femme'
                    ? 'bg-[#895256] text-white border-none'
                    : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Filles
              </button>
            </div>
          </div>
        </div>

        <div className="flex z-0 flex-col md:flex-row justify-between text-center items-center my-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des élèves</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearcheleves} />

          <div className="flex items-center gap-9">
            <div className="flex items-center gap-4">
              <label className="text-gray-600 font-medium text-sm">Afficher</label>
              <select
                name="lines"
                onChange={(e) => setLines(+e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#895256] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#9f7126] transition duration-200"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow px-4 py-2 rounded-lg text-sm font-medium">
              Total élèves : <span className="font-bold">{students?.total}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4 bg-white rounded-xl p-4">
          <div className="bg-[#895256] text-white text-sm rounded-t-xl mb-2">
            <div className="flex px-4 py-3 font-medium tracking-wide">
              <div className="w-33">Photo</div>
              <div className="flex-1">Nom</div>
              <div className="flex-1">Prénoms</div>
              <div className="flex-1">Sexe</div>
              <div className="flex-1">salle</div>
              <div className="flex-1">Opération</div>
            </div>
          </div>

          <div className="space-y-1.5">
            {isLoading ? (
              <div className="flex w-full justify-center">
                <RotatingLines
                  visible={true}
                  width="55"
                  strokeColor="#7A3B3F"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : (
              <>
                {' '}
                {students?.data?.length === 0 ? (
                  <div className="text-center mt-10 text-gray-600">Aucun élève trouvé</div>
                ) : (
                  students?.data?.map((student, index) => (
                    <div
                      key={index}
                      className={`flex px-6 py-2 rounded-lg items-center ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                      } hover:bg-gray-50 hover:border-l-[5px] border-[#895256] hover:shadow-lg transition duration-300`}
                    >
                      <div className="w-27 h-12 flex items-center justify-centerrounded-lg mr-4">
                        <div className="image bg-[#895256] p-2 rounded-lg">
                          {/*<FaUserCircle className="text-3xl text-[#ffff]" />*/}
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${student.photo}`}
                            alt="Profil"
                            className="rounded-sm w-10 h-10"
                          />
                        </div>
                      </div>

                      <div className="flex-1 font-semibold text-gray-800">{student?.nom}</div>
                      <div className="flex-1 text-gray-700">{student?.prenom}</div>
                      <div className="flex-1 text-gray-700">
                        {student.sexe == 1 ? 'Garçon' : 'Fille'}
                      </div>
                      <div className="flex-1 text-gray-700">
                        {
                          student?.sousetudiants[student?.sousetudiants.length - 1]?.salle
                            ?.nom_salle
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-3 text-[#9f7126] text-lg">
                          <FaEye
                            onClick={() => {
                              setSelectedStudent({
                                ...student,
                                nom_salle:
                                  student?.sousetudiants[student?.sousetudiants.length - 1].salle
                                    ?.nom_salle,
                                nom_classe:
                                  student?.sousetudiants[student?.sousetudiants?.length - 1]?.classe
                                    ?.nom_classe,
                                noteTotal:
                                  student?.sousetudiants[student?.sousetudiants?.length - 1]
                                    .noteTotal,
                                annee: 'test',
                                enfant_prof: student.enfantProf
                              })
                              openModal('showinfostudents')
                            }}
                            className="hover:text-black cursor-pointer transition"
                          />
                          <FaEdit
                            onClick={() => {
                              openModal('AdUpinfostudents')
                              setEt_id(student.id)
                            }}
                            className="hover:text-black cursor-pointer transition"
                          />

                          <Trash
                            id={student.id}
                            nom={student.nom}
                            prenom={student.prenom}
                            reload={reload}
                            refresh={setReload}
                          />
                          {/* <Trash id={student.is} reload={reload} refresh={setReload} /> */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

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
                  page === currentPage
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
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group"
          >
            Suivant
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </button>
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

      {modal.AdUpinfostudents && (
        <AdUpinfostudentsmodal
          id={et_id ? et_id : null}
          closemodal={() => closModal('AdUpinfostudents')}
          mode="modifstudents"
          fresh={reload}
          setFresh={setReload}
        />
      )}
      {modal.showinfostudents && selectedStudent && (
        <Showinfostudentsmodal
          closemodal={() => closModal('showinfostudents')}
          student={selectedStudent}
          fresh={reload}
          setFresh={setReload}
        />
      )}
    </div>
  )
}
const Trash: React.FC<{
  id: number
  nom: string
  prenom: string
  reload: boolean
  refresh: (boolean) => void
}> = ({ id, nom, prenom, reload, refresh }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  // nampiako anty
  const { modal, openModal, closModal } = useMultiModals()

  const deleteStudent = async (id: number) => {
    setIsDeleting(true)
    try {
      await axiosRequest('DELETE', `etudiant/${id}`, null, 'token')
        .then(({ data }) => toast.success(data?.message || 'suppresion avec succes'))
        .then(() => setIsDeleting(false))
        .then(() => refresh(!reload))
        .catch((error) => toast.error(error?.response?.data?.message || 'Erreur de suppression ❌'))
        .finally(() => setIsDeleting(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }
  // nampiako anty
  const handleConfirmDelete = async () => {
    await deleteStudent(id)
  }
  return (
    <>
      {/* < {isDeleting?(<Oval
      visible={true}
      height="25"
      width="25"
      color="#895256"
      strokeWidth="5"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />):<FaTrash onClick={() => deleteStudent(id)} className="hover:text-red-600 cursor-pointer transition" />}> */}
      {isDeleting ? (
        <Oval
          visible={true}
          height="20"
          width="50"
          color="#895256"
          strokeWidth="5"
          ariaLabel="oval-loading"
        />
      ) : (
        <FaTrash
          onClick={() => openModal('confirmDelete')}
          className="hover:text-red-600 cursor-pointer transition"
        />
      )}

      {modal.confirmDelete && (
        <ConfirmDeleteModal
          closemodal={() => closModal('confirmDelete')}
          onConfirm={handleConfirmDelete}
          isDeletingLoader={isDeleting}
          message={`Êtes-vous sûr de vouloir supprimer l'étudiant(e) ${nom} ${prenom} ? Cette action est irréversible.`}
          title="Supprimer un étudiant"
        />
      )}
    </>
  )
}
export default Studentsinfo
