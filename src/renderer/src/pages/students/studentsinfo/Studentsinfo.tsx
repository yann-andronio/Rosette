import { useSelector } from 'react-redux'
import { RootState } from '@renderer/redux/Store'
import { useEffect, useState } from 'react'
import { FaUserCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { LuCalendarDays, LuGraduationCap, LuUsers } from 'react-icons/lu'
import Searchbar from '@renderer/components/searchbar/Searchbar'
import useMultiModals from '@renderer/hooks/useMultiModals'
import Addyearmodal from '@renderer/components/modalsform/Addyearmodal'
import AdUpinfostudents from '@renderer/components/modalsform/AdUpinfostudents'
import { filterDataCombined } from '@renderer/utils/filterDataCombined'
import {  FilterOptions, StudentsType } from '@renderer/types/Alltypes'
import { Studentsdata } from '@renderer/data/Studentsdata'
import { years , classe } from '@renderer/data/Filterselectiondata'
import ShowInfoStudents from '@renderer/components/modalsform/Showinfostudents'

function Studentsinfo(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [searcheleves, setSearcheleves] = useState('')
  const [selectedyear, setselectedyear] = useState<string>('All')
  const [selectedclasse, setselectedclasse] = useState<string>('All')
  const [selectedSexe, setSelectedSexe] = useState<string>('All')
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({ annee: 'All', classe: 'All', sexe: 'All' })
  const [selectedStudent, setSelectedStudent] = useState<StudentsType | null>(null)


  // isaka misy changement nle raha filtregna de atao modif selectiondefiltre
  useEffect(() => {
    setSelectedFilters({
      annee: selectedyear,
      classe: selectedclasse,
      sexe: selectedSexe
    })
  }, [selectedyear, selectedclasse, selectedSexe])

  const handleselect = (current: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
   setter((prev) => (prev === current ? 'All' : current))
  }

  const handleSearcheleves = (dataeleve: string) => {
    setSearcheleves(dataeleve)
  }

  // const searchKeys: (keyof StudentsType)[] = ['nom', 'prenom', 'classe']
  const filteredData = filterDataCombined(Studentsdata, searcheleves, ['nom', 'prenom', 'classe'], selectedFilters)
 
  

  const { modal, openModal, closModal } = useMultiModals()

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ''
      } transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''
      }`}
    >
      <div className="px-20 py-8">
        <div className="bigboxfilter flex flex-col gap-6 w-full lg:flex-row justify-center">
          {/* Filtre Année */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuCalendarDays size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une année</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {years.map((year, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(year.ans, setselectedyear)}
                  className={`${
                    selectedyear === year.ans
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {year.ans}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre Classe */}
          <div className="filter p-4 rounded-xl flex flex-col bg-white flex-1 shadow-md relative">
            <div className=" flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#895256] text-white mr-3 flex items-center justify-center">
                <LuGraduationCap size={28} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Sélectionnez une classe</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[100px] pr-2">
              {classe.map((cl, index) => (
                <button
                  key={index}
                  onClick={() => handleselect(cl.name, setselectedclasse)}
                  className={`${
                    selectedclasse === cl.name
                      ? 'bg-[#895256] text-white border-none'
                      : 'text-gray-700 bg-gray-100 border-none hover:bg-[#895256e7] hover:text-white'
                  } border font-bold  rounded-md p-2 text-center cursor-pointer transition duration-200`}
                >
                  {cl.name}
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

        <div className="relative overflow-x-auto mt-4 bg-white rounded-xl p-4">
          <div className="bg-[#895256] text-white text-sm rounded-t-xl mb-2">
            <div className="flex px-4 py-3 font-medium tracking-wide">
              <div className="w-33">Photo</div>
              <div className="flex-1">Nom</div>
              <div className="flex-1">Prénom</div>
              <div className="flex-1">Sexe</div>
              <div className="flex-1">Classe</div>
              <div className="flex-1">Opération</div>
            </div>
          </div>

          <div className="space-y-1.5">
            {filteredData.length === 0 ? (
              <div className="text-center mt-10 text-gray-600">Aucun élève trouvé</div>
            ) : (
              filteredData.map((student, index) => (
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
                  <div className="flex-1 text-gray-700">{student.classe}</div>
                  <div className="flex-1">
                    <div className="flex gap-3 text-[#9f7126] text-lg">
                      <FaEye
                        onClick={() => {
                          setSelectedStudent(student)
                          openModal('showinfostudents')
                        }}
                        className="hover:text-black cursor-pointer transition"
                      />
                      <FaEdit
                        onClick={() => openModal('AdUpinfostudents')}
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
        </div>
      </div>

      {modal.AdUpinfostudents && (
        <AdUpinfostudents closemodal={() => closModal('AdUpinfostudents')} mode="modifstudents"  />
      )}
      {modal.showinfostudents && selectedStudent && (
        <ShowInfoStudents
          closemodal={() => closModal('showinfostudents')}
          student={selectedStudent}
        />
      )}
    </div>
  )
}

export default Studentsinfo
