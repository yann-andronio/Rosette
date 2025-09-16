import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { useEffect, useState } from 'react'
import {  FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { LuCalendarDays, LuGraduationCap, LuUsers, LuAward } from 'react-icons/lu'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { getMentionColor } from '@renderer/utils/getMentionColor'
import { getMention } from '@renderer/utils/getMention'
import Addnotemodal from '@renderer/components/modalsform/Addnotemodal'
import Showinfonotestudents from '@renderer/components/modalsform/Showinfonotestudents'
import { MdMeetingRoom } from 'react-icons/md'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { axiosRequest } from '@renderer/config/helpers'
function Notestudentsmanagement(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searcheleves, setSearcheleves] = useState('')
  const [selectedyear, setselectedyear] = useState<string>('0')
  const [selectedsalle, setselectedsalle] = useState<string>('0')
  const [selectedniveau, setselectedniveau] = useState<string>('0')
  const [selectedSexe, setSelectedSexe] = useState<string>('0')
  const [selectedmention, setSelectedmention] = useState<string>('All')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<Etudiant | null>(null)
  const [students, setStudents] = useState<{ per_page:number, total:number,  last_page:number, data:Etudiant[]}>({last_page:1, data:[], total:0, per_page:0})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lines, setLines] = useState<number>(15)
  const [reload, setReload] = useState<boolean>(false)
  const handleselect = (current: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((prev) => (prev === current ? '0' : current))
  }

  const [acs, setAcs] = useState<{id:number, annee:string}[]>([])
  const [classes, setClasses] = useState<{id:number, nom_classe:string}[]>([])
  const [salles, setSalles] = useState<{id:number, nom_salle:string}[]>([])
  const precedent = (current) => {
    if(current > 1){
      setCurrentPage(current - 1)
    }
  }

  const suivant = (current) => {
    if(current < students.last_page){
      setCurrentPage(current + 1)
    }
  }

  const nextPage = (page:number) =>{
    setCurrentPage(page)
  }

  const getEtudiants = async ()=>  {
    setIsLoading(true)
    try{
      await axiosRequest('GET', `etudiant-list_note?page=${currentPage}&lines=${lines}&sexe=${selectedSexe}&annee=${selectedyear}&classe=${selectedniveau}&salle=${selectedsalle}&q=${searcheleves}&q=${searcheleves}`, null , 'token')
        .then(({data}) => setStudents((data)))
        .then(() => setIsLoading(false))
        .catch(error => console.log(error.response.data?.message))
        .finally(() => setIsLoading(false))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const mention = [
    { id: 1, name: 'Aucune' },
    { id: 2, name: 'passable' },
    { id: 3, name: 'A-bien' },
    { id: 4, name: 'Bien' },
    { id: 5, name: 'Très-Bien' },
    { id: 6, name: 'Honorable' }
  ]

  const getClasse = async () => {

    try{
      await axiosRequest('GET', 'classe-list', null, 'token')
        .then(({data}) => setClasses(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getSalle = async () => {
    try{
      await axiosRequest('GET', 'salle-list', null, 'token')
        .then(({data}) => setSalles(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getAcs = async () => {
    try{
      await axiosRequest('GET', 'ac-list', null, 'token')
        .then(({data}) => setAcs(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }


  useEffect(() => {
    getAcs()
    getClasse()
    getSalle()
  }, [])

  useEffect(() => {
    getEtudiants()
  }, [currentPage, lines, selectedSexe, selectedyear, selectedniveau, selectedsalle, searcheleves, reload])
  const pagination:number[] = []
  for(let i:number=1; i<=Math.ceil(students?.total / students.per_page); i++){
    pagination.push(i)
  }

  const handleSearcheleves = (dataeleve: string) => {
    setSearcheleves(dataeleve)
  }
  const { modal, openModal, closModal } = useMultiModals()

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        <div className="bigboxfilter grid grid-cols-3 gap-6 w-full lg:flex-row justify-center">
          {/* filter1111 */}

          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuCalendarDays size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une année</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2 ">
              {acs.map((year, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(year.id.toString(), setselectedyear)}
                  className={`${
                    selectedyear === year.id.toString()
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
                    selectedniveau === niv.id.toString()
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {niv.nom_classe}
                </button>
              ))}
            </div>
          </div>

          {/* filter222 */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1  shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <MdMeetingRoom size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une salle</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2 ">
              {salles.map((salle, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(salle.id.toString(), setselectedsalle)}
                  className={`${
                    selectedsalle === salle.id.toString()
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {salle.nom_salle}
                </button>
              ))}
            </div>
          </div>
          {/* filter333 */}

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
                Homme
              </button>
              <button
                onClick={() => handleselect('Femme', setSelectedSexe)}
                className={`${
                  selectedSexe === 'Femme'
                    ? 'bg-[#895256] text-white border-none'
                    : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Femme
              </button>
            </div>
          </div>

          {/* filterrr44444 */}

          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1  shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuAward size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une Mention</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2 ">
              {mention.map((mention, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(mention.name, setSelectedmention)}
                  className={`${selectedmention === mention.name ? 'bg-[#895256] text-white border-none ' : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'} border font-bold border-gray-400 rounded-md p-2 text-center  cursor-pointer transition duration-200`}
                >
                  {mention.name}
                </button>
              ))}
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
              <select className="px-4 py-2 rounded-lg bg-[#895256] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#9f7126] transition duration-200">
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow px-4 py-2 rounded-lg text-sm font-medium">
              Total élèves : <span className="font-bold">{students.total}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4 bg-white rounded-lg p-4">
          <div className="bg-[#895256] text-white text-sm rounded-lg mb-2">
            <div className="flex px-6 py-3 font-medium tracking-wide">
              <div className="w-30">Photo</div>
              <div className="flex-1">Nom</div>
              <div className="flex-1">Prénom</div>
              <div className="flex-1">Sexe</div>
              <div className="flex-1">salle</div>
              <div className="flex-1">Moyenne</div>
              <div className="flex-1">Opération</div>
            </div>
          </div>
          {/* miscroll i ngiah une fois le max est atteint */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {students.data.length === 0 ? (
              <div className="text-center mt-10 text-gray-600">Aucun élève trouvé</div>
            ) : (
              students.data.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex px-6 py-2 rounded-lg items-center ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }  hover:bg-gray-50 hover:border-l-[5px] border-[#895256] hover:shadow-lg transition duration-300`}
                >
                  <div className="w-27 h-12 flex items-center justify-centerrounded-lg mr-4">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${student.photo}`}
                      alt="Profil"
                      className="rounded-sm w-10 h-10"
                    />
                  </div>

                  <div className="flex-1 font-semibold text-gray-800">{student.nom}</div>
                  <div className="flex-1 text-gray-700">{student.prenom}</div>
                  <div className="flex-1 text-gray-700">{student.sexe==1?'Homme':'Femme'}</div>
                  <div className="flex-1 text-gray-700">{student?.sousetudiants[0].salle.nom_salle}</div>
                  <div className={`${getMentionColor(student?.sousetudiants[student?.sousetudiants.length - 1].noteTotal)} flex-1 `}>
                    {getMention(student?.sousetudiants[student?.sousetudiants.length - 1].noteTotal)}
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-3 text-[#9f7126] text-lg">
                      <FaEye
                        onClick={() => {
                          setSelectedStudent(student)
                          openModal('Showinfonotestudents')
                        }}
                        className="hover:text-black cursor-pointer transition"
                      />
                      <FaEdit
                        onClick={() => {
                          setSelectedStudent(student)
                          openModal('Addnotemodal')
                        }}
                        className="hover:text-black cursor-pointer transition"
                      />
                      <FaTrash className="hover:text-red-600 cursor-pointer transition" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-600 text-sm">
          <button onClick={() => precedent(currentPage)} className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group">
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
                className={`px-3 py-1 rounded-full font-medium ${
                  page === currentPage
                    ? 'bg-[#9f7126] text-white'
                    : 'bg-gray-200 hover:bg-[#9f7126] hover:text-white transition'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button onClick={() => suivant(currentPage)} className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group">
            Suivant
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </button>
        </div>
      </div>

      {modal.Showinfonotestudents && selectedStudent && (
        <Showinfonotestudents
          closemodal={() => closModal('Showinfonotestudents')}
          student={selectedStudent}
        />
      )}
      {modal.Addnotemodal && selectedStudent && (
        <Addnotemodal closemodal={() => closModal('Addnotemodal')} student={selectedStudent} />
      )}
    </div>
  )
}

export default Notestudentsmanagement
