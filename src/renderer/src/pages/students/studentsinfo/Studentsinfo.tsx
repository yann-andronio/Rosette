import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store'
import { useEffect, useState } from 'react'
import { FaUserCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { LuCalendarDays, LuGraduationCap, LuUsers } from 'react-icons/lu'
import Searchbar from '@renderer/components/searchbar/Searchbar'

function Studentsinfo(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searcheleves, setSearcheleves] = useState('')
  const [selectedyear, setselectedyear] = useState<string | null>("All")
  const [selectedclasse, setselectedclasse] = useState<string | null>("All")
  const [selectedSexe, setSelectedSexe] = useState<string | null>("All")

   const handleselect = (current, setter) => {
     setter((prev) => (prev === current ? 'All' : current))
   }

  const handleSearcheleves = (dataeleve: string) => {
    setSearcheleves(dataeleve)
  }
  const data = [
    { id: 1, nom: 'WINTCHESTER', prenom: 'Dean', sexe: 'Homme', classe: 'CM2' },
    { id: 2, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CM1' },
    { id: 3, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CP2' },
    { id: 4, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CM4' },
    { id: 5, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CE' },
    { id: 6, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CP1' }
  ]

  const years = [
    { id: 1, ans: "2000" },
    { id: 2, ans: "2001" },
    { id: 3, ans: "2002" },
    { id: 4, ans: "2003" },
    { id: 4, ans: "2004" },
    { id: 4, ans: "2005" },
    { id: 4, ans: "2006" },
    { id: 4, ans: "2007" }
  ]
  const classe = [
    { id: 1, name: 'T1' },
    { id: 2, name: 'T2' },
    { id: 3, name: 'CM1' },
    { id: 4, name: 'Term 25 ' },
    { id: 4, name: '2nd 1' },
    { id: 4, name: 'T6' },
    { id: 4, name: 'T7' },
    { id: 4, name: 'T8' }
  ]
  const [students] = useState(data)

  const [filtereEleves, setfiltereEleves] = useState(students)

  useEffect(() => {
    const result = students.filter(
      (dataStudents) =>
        dataStudents.nom.toLowerCase().includes(searcheleves.toLowerCase()) ||
        dataStudents.prenom.toLowerCase().includes(searcheleves.toLowerCase()) ||
        dataStudents.classe.toLowerCase().includes(searcheleves.toLowerCase())
    )
    setfiltereEleves(searcheleves === '' ? [...students] : [...result])
  }, [searcheleves, students])

  // useEffect(() => {
  //   console.log('Année sélectionnée :', selectedyear)
  //   console.log('classe sélectionnée :', selectedclasse)
  //   console.log('sexe sélectionnée :', selectedSexe)
  // }, [selectedyear, selectedclasse, selectedSexe])
  
  const handleSubmitFilter = () => {
    const valeursFiltres = {
      annee: selectedyear,
      classe: selectedclasse,
      sexe: selectedSexe
    }
    console.log('Filtres sélectionnés :', valeursFiltres)
  }


  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full    ${
        closeBar ? '"ml-16"' : ''
      } transition-all duration-[600ms] ease-in-out`}
    >
      <div className="px-20 py-8">
        <div className="bigboxfilter flex flex-col gap-6 w-full lg:flex-row justify-center">
          {/* filter1111 */}

          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className="pb-2 border-b flex flex-row items-center border-gray-300 mb-3">
              <div className="icones  flex justify-center rounded-lg p-2">
                <LuCalendarDays size={30} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une année</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2 ">
              {years.map((year, index) => (
                <h1
                  key={index}
                  onClick={() => handleselect(year.ans, setselectedyear)}
                  className={`${selectedyear === year.ans ? 'bg-[#895256] text-white border-none ' : 'text-gray-700 bg-gray-100'} border font-bold border-gray-400 rounded-md p-2 text-center  cursor-pointer transition duration-200`}
                >
                  {year.ans}
                </h1>
              ))}
            </div>

            <div className="w-full justify-end mt-4 flex gap-2">
              <button className="p-2 rounded-lg w-[20%] flex justify-center shadow-lg bg-[#895256] text-[#ffff] hover:bg-blue-600 transition duration-200">
                <FaEdit />
              </button>
              <button className="p-2 rounded-lg w-[20%] flex justify-center shadow-lg bg-[#895256] text-[#ffff] hover:bg-blue-600 transition duration-200">
                <FaTrash />
              </button>
            </div>
          </div>

          {/* filter222 */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1  shadow-md relative">
            <div className="pb-2 border-b flex flex-row items-center border-gray-300 mb-3">
              <div className="icones  flex justify-center rounded-lg p-2">
                <LuGraduationCap size={30} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une classe</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2 ">
              {classe.map((classe, index) => (
                <h1
                  key={index}
                  onClick={() => handleselect(classe.name, setselectedclasse)}
                  className={`${selectedclasse === classe.name ? 'bg-[#895256] text-white border-none ' : 'text-gray-700 bg-gray-100'} border font-bold border-gray-400 rounded-md p-2 text-center  cursor-pointer transition duration-200`}
                >
                  {classe.name}
                </h1>
              ))}
            </div>

            <div className="w-full justify-end mt-4 flex gap-2">
              <button className="p-2 rounded-lg w-[20%] flex justify-center shadow-lg bg-[#895256] text-[#ffff] hover:bg-blue-600 transition duration-200">
                <FaEdit />
              </button>
              <button className="p-2 rounded-lg w-[20%] flex justify-center shadow-lg bg-[#895256] text-[#ffff] hover:bg-blue-600 transition duration-200">
                <FaTrash />
              </button>
            </div>
          </div>
          {/* filter333 */}

          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className="pb-2 border-b flex flex-row items-center border-gray-300 mb-3">
              <div className="icones flex justify-center rounded-lg p-2">
                <LuUsers size={30} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez un sexe</h1>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[100px] pr-2">
              <h1
                onClick={() => handleselect('Homme', setSelectedSexe)}
                className={`${selectedSexe === 'Homme' ? 'bg-[#895256] text-white border-none' : 'text-gray-700 bg-gray-100'} border font-bold border-gray-400 rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Homme
              </h1>
              <h1
                onClick={() => handleselect('Femme', setSelectedSexe)}
                className={`${selectedSexe === 'Femme' ? 'bg-[#895256] text-white border-none' : 'text-gray-700 bg-gray-100'} border font-bold border-gray-400 rounded-md p-2 text-center cursor-pointer transition duration-200`}
              >
                Femme
              </h1>
            </div>
          </div>
        </div>

        <div className="flex z-0 flex-col md:flex-row justify-between text-center items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des élèves</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearcheleves} onfilter={handleSubmitFilter} />

          <div className="flex items-center gap-9">
            <div className="flex items-center gap-4">
              <label className="text-gray-600 font-medium text-sm">Afficher</label>
              <select className="px-4 py-2 rounded-lg bg-[#895256] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#9f7126] transition duration-200">
                <option>05</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow px-4 py-2 rounded-lg text-sm font-medium">
              Total élèves : <span className="font-bold">2000</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4 bg-white rounded-lg p-8">
          {
            <div className="bg-[#895256] text-white text-sm rounded-lg mb-2">
              <div className="flex px-6 py-3 font-medium tracking-wide">
                <div className="w-30">Photo</div>
                <div className="flex-1">Prénom</div>
                <div className="flex-1">Nom</div>
                <div className="flex-1">Sexe</div>
                <div className="flex-1">Classe</div>
                <div className="flex-1">Opération</div>
              </div>
            </div>
          }

          {
            <div className="space-y-2">
              {filtereEleves.length === 0 ? (
                <div className="text-center mt-10 text-gray-600">Aucun élève trouvé</div>
              ) : (
                filtereEleves.map((student, index) => (
                  <div
                    key={student.id}
                    className={`flex px-6 py-2 rounded-lg items-center ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    }  hover:bg-gray-50 hover:border-l-[5px] border-[#895256] hover:shadow-lg transition duration-300`}
                  >
                    <div className="w-27 h-12 flex items-center justify-centerrounded-lg mr-4">
                      <div className="image bg-[#895256] p-2 rounded-lg">
                        <FaUserCircle className="text-3xl text-[#ffff]" />
                      </div>
                    </div>

                    <div className="flex-1 font-semibold text-gray-800">{student.nom}</div>
                    <div className="flex-1 text-gray-700">{student.prenom}</div>
                    <div className="flex-1 text-gray-700">{student.sexe}</div>
                    <div className="flex-1 text-gray-700">{student.classe}</div>
                    <div className="flex-1">
                      <div className="flex gap-3 text-[#9f7126] text-lg">
                        <FaEye className="hover:text-black cursor-pointer transition" />
                        <FaEdit className="hover:text-black cursor-pointer transition" />
                        <FaTrash className="hover:text-red-600 cursor-pointer transition" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          }
        </div>

        {
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-600 text-sm">
            <button className="hover:underline cursor-pointer">&lt; Précédent</button>
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
            <button className="hover:underline mt-3 md:mt-0">Suivant &gt;</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Studentsinfo
