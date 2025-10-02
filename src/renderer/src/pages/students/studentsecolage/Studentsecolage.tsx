import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaUserCircle, FaEdit, FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa'
import { LuCalendarDays, LuGraduationCap, LuUsers, LuWallet } from 'react-icons/lu'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'
import AdUpinfostudentsmodal from '@renderer/components/modalsform/AdUpinfostudentsmodal'
import { FilterOptions, StudentsType } from '@renderer/types/Alltypes'
import { MdMeetingRoom } from 'react-icons/md'
import Showinfoecolagemodal from '@renderer/components/modalsform/Showinfoecolagemodal'
import { axiosRequest } from '@renderer/config/helpers'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { RotatingLines } from 'react-loader-spinner'
import { Target } from 'framer-motion'
import { ToastContainer } from 'react-toastify'

function Studentsecolage(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searcheleves, setSearcheleves] = useState('')
  const [selectedyears, setselectedyears] = useState<string>('0')
  const [selectedsalle, setselectedsalle] = useState<string>('0')
  const [acs, setAcs] = useState<{id:number, annee:string}[]>([])
  const [classes, setClasses] = useState<{id:number, nom_classe:string}[]>([])
  const [salles, setSalles] = useState<{id:number, nom_salle:string}[]>([])
  const [selectedniveau, setselectedniveau] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [macs, setMacs] = useState<{id:number, mois:string}[]>([])
  const [selectedSexe, setSelectedSexe] = useState<string>('0')
  const [selectedstatusecolage, setSelectedstatusecolage] = useState<string>('0')
  const [selectedmoisEcolage, setselectedmoisEcolage] = useState<string>('0')
  const [students, setStudents] = useState<{ per_page:number, total:number,  last_page:number, data:Etudiant[]}>({last_page:1, data:[], total:0, per_page:0})


  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lines, setLines] = useState<number>(15)
  const [reload, setReload] = useState<boolean>(false)

  const getEtudiants = async ()=>  {
    setIsLoading(true)
    try{
      await axiosRequest('GET', `etudiant-list_ecolage?page=${currentPage}&lines=${lines}&sexe=${selectedSexe}&annee=${selectedyears}&classe=${selectedniveau}&salle=${selectedsalle}&q=${searcheleves}&q=${searcheleves}&ecolage=${selectedstatusecolage}&mois=${selectedmoisEcolage}`, null , 'token')
        .then(({data}) => setStudents((data)))
        .then(() => setIsLoading(false))
        .catch(error => console.log(error.response.data?.message))
        .finally(() => setIsLoading(false))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

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

  useEffect(() => {
    getEtudiants()
  }, [currentPage, lines, selectedSexe, selectedyears, selectedniveau, selectedsalle, searcheleves, reload, selectedstatusecolage, selectedmoisEcolage])

  const pagination:number[] = []
  for(let i:number=1; i<=Math.ceil(students?.total / students.per_page); i++){
    pagination.push(i)
  }
  const [selectedStudent, setSelectedStudent] = useState<Etudiant | null>(null)


  const handleselect = (current: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((prev) => (prev === current ? '0' : current))
  }

  const handleSearcheleves = (dataeleve: string) => {
    setSearcheleves(dataeleve)
  }



  const { modal, openModal, closModal } = useMultiModals()

  const getAcs = async () => {
    try{
      await axiosRequest('GET', 'ac-list', null, 'token')
        .then(({data}) => setAcs(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getClasse = async () => {

    try{
      await axiosRequest('GET', `classe-list_year/${selectedyears}`, null, 'token')
        .then(({data}) => setClasses(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getMac = async () => {

    try{
      await axiosRequest('GET', `mac-list_year/${selectedyears}`, null, 'token')
        .then(({data}) => setMacs(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getSalle = async () => {
    try{
      await axiosRequest('GET', `salle-list_year/${selectedyears}`, null, 'token')
        .then(({data}) => setSalles(data))
        .catch(error => console.log(error.response?.data?.message))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }
  const nextPage = (page:number) =>{
    setCurrentPage(page)
  }
  useEffect(() => {
    getAcs()
    getClasse()
    getSalle()
    getMac()
  }, [selectedyears])


  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ''
      } transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''
      }`}
    >
      <div className="px-20 py-8">
        <div className="bigboxfilter grid grid-cols-3 gap-6 w-full lg:flex-row justify-center">
          {/* Filtre Année */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
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
                  onClick={() => handleselect(year.id.toString(), setselectedyears)}
                  className={`${
                    selectedyears === year.id.toString()
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
          {/* Filtre statut d' ecolage  */}

          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuWallet size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">
                Sélectionnez un Statut d'écolage
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[100px] pr-2">
              <button
                onClick={() => handleselect('Complet', setSelectedstatusecolage)}
                className={`${
                  selectedstatusecolage === 'Complet'
                    ? 'bg-[#895256] text-white border-none'
                    : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Complet
              </button>
              <button
                onClick={() => handleselect('Incomplet', setSelectedstatusecolage)}
                className={`${
                  selectedstatusecolage === 'Incomplet'
                    ? 'bg-[#895256] text-white border-none'
                    : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Incomplet
              </button>
            </div>
          </div>

          {/* Filtre mois */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuCalendarDays size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez un mois</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {macs.map((mois, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(mois.mois, setselectedmoisEcolage)}
                  className={`${
                    selectedmoisEcolage === mois.mois
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {mois.mois}
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
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setLines(Number(e.target.value))}
                className="px-4 py-2 rounded-lg bg-[#895256] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#9f7126] transition duration-200"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow px-4 py-2 rounded-lg text-sm font-medium">
              Total élèves : <span className="font-bold">{students.total}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4 bg-white rounded-xl p-4">
          <div className="bg-[#895256] text-white text-sm rounded-t-xl mb-2">
            <div className="flex px-4 py-3 font-medium tracking-wide">
              <div className="w-33">Photo</div>
              <div className="flex-1">Nom</div>
              <div className="flex-1">Prénom</div>
              <div className="flex-1">Sexe</div>
              <div className="flex-1">salle</div>
              <div className="flex-1">Statut</div>
              <div className="flex-1">Opération</div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex w-full justify-center">
              <RotatingLines
                visible={true}
                width="50"
                strokeColor="#7A3B3F"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {students?.data.length === 0 ? (
                  <div className="text-center mt-10 text-gray-600">Aucun élève trouvé</div>
                ) : (
                  students?.data.map((student, index) => (
                    <div
                      key={index}
                      className={`flex px-6 py-2 rounded-lg items-center ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                      } hover:bg-gray-50 hover:border-l-[5px] border-[#895256] hover:shadow-lg transition duration-300`}
                    >
                      <div className="w-27 h-12 flex items-center justify-centerrounded-lg mr-4">
                        <div className="image bg-[#895256] p-2 rounded-lg">
                          <FaUserCircle className="text-3xl text-[#ffff]" />
                        </div>
                      </div>

                      <div className="flex-1 font-semibold text-gray-800">{student.nom}</div>
                      <div className="flex-1 text-gray-700">{student.prenom}</div>
                      <div className="flex-1 text-gray-700">{student.sexe}</div>
                      <div className="flex-1 text-gray-700">
                        {student.sousetudiants[student.sousetudiants.length - 1]?.salle?.nom_salle}
                      </div>
                      <div className="flex-1 ">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${student.sousetudiants[student.sousetudiants.length - 1]?.ecolage.every((et) => et.payé == 1) == true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {student.sousetudiants[student.sousetudiants.length - 1]?.ecolage.every(
                            (et) => et.payé == 1
                          ) == true
                            ? 'Complet'
                            : 'Incomplet'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-8  text-[#9f7126] text-lg">
                          <FaEye
                            onClick={() => {
                              setSelectedStudent(student)
                              openModal('Showinfoecolagemodal')
                            }}
                            className="hover:text-black cursor-pointer transition"
                          />
                          <FaPlusCircle
                            onClick={() => openModal('AdUpinfostudents')}
                            className="hover:text-black cursor-pointer transition"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-600 text-sm">
          <button
            onClick={() => precedent(currentPage)}
            className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group"
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
          <button
            onClick={() => suivant(currentPage)}
            className="flex items-center gap-2 px-4 py-2 bg-[#895256] text-white rounded-xl shadow-md hover:bg-[#b78335] transition duration-300 group"
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
          closemodal={() => closModal('AdUpinfostudents')}
          mode="modifstudents"
        />
      )}
      {modal.Showinfoecolagemodal && selectedStudent && (
        <Showinfoecolagemodal
          reload={reload}
          fresh={setReload}
          closemodal={() => closModal('Showinfoecolagemodal')}
          student={selectedStudent}
        />
      )}
    </div>
  )
}

export default Studentsecolage
