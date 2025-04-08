import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store'
import { useEffect, useState } from 'react'
import { FaUserCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import Searchbar from '@renderer/components/searchbar/Searchbar'

function Studentsinfo(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
   const [searchCommande, setSearchClients] = useState('')
   const [addcommandemodule, setAddcommandemodule] = useState(false)

   const handleSearchCommande = (dataclients: string) => {
     setSearchClients(dataclients)
   }
  const [students] = useState([
    { id: 1, nom: 'WINTCHESTER', prenom: 'Dean', sexe: 'Homme', classe: 'CM2' },
    { id: 2, nom: 'WINTCHESTER', prenom: 'Sammy', sexe: 'Homme', classe: 'CM2' },
   
  ])

   const [filteredUsers, setFilteredUsers] = useState(students)

   useEffect(() => {
     const result = students.filter(
       (datacmd) =>
         datacmd.nom.toLowerCase().includes(searchCommande.toLowerCase()) ||
         datacmd.prenom.toLowerCase().includes(searchCommande.toLowerCase()) 
     
     )
     setFilteredUsers(searchCommande === '' ? [...students] : [...result])
     //  setFilteredUsers(searchClients === "" ? users : result);
   }, [searchCommande, students])

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full min-h-screen p-12  ${
        closeBar ? '"ml-16"' : ''
      } transition-all duration-[600ms] ease-in-out`}
    >
      <div className="flex z-0 flex-col md:flex-row justify-between text-center items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Liste des élèves</h2>
        <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow px-4 py-2 rounded-lg text-sm font-medium">
          Total élèves : <span className="font-bold">2000</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Searchbar onSearch={handleSearchCommande} setAddcommandemodule={setAddcommandemodule} />
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Afficher</label>
          <select className="px-3 py-2 rounded-lg bg-[#9f7126] text-white font-medium shadow">
            <option>05</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs bg-[#E6E6FA54]">
            <tr>
              <th className="py-3 px-5 ">Photo</th>
              <th className="py-3 px-5 ">Prénom</th>
              <th className="py-3 px-5 ">Nom</th>
              <th className="py-3 px-5 ">Sexe</th>
              <th className="py-3 px-5 ">Classe</th>
              <th className="py-3 px-5 ">Opération</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((student, index) => (
              <tr
                key={student.id}
                className={`hover:bg-gray-50 transition duration-200 hover:border-l-2 border-[#]  ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                <td className="py-4 px-5">
                  <FaUserCircle className="text-2xl text-[#9f7126]" />
                </td>
                <td className="py-4 px-5 font-semibold text-gray-800">{student.nom}</td>
                <td className="py-4 px-5 text-gray-700">{student.prenom}</td>
                <td className="py-4 px-5 text-gray-700">{student.sexe}</td>
                <td className="py-4 px-5 text-gray-700">{student.classe}</td>
                <td className="py-4 px-5">
                  <div className="flex gap-3 text-[#9f7126] text-lg">
                    <FaEye className="hover:text-black cursor-pointer transition" />
                    <FaEdit className="hover:text-black cursor-pointer transition" />
                    <FaTrash className="hover:text-red-600 cursor-pointer transition" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-600 text-sm">
        <button className="hover:underline">&lt; Précédent</button>
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
              {page.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
        <button className="hover:underline mt-3 md:mt-0">Suivant &gt;</button>
      </div>
    </div>
  )
}

export default Studentsinfo
