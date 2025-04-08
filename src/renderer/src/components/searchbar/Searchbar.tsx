import { Fragment } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { IoSearchSharp } from 'react-icons/io5'

type Searchlistclientseleves = {
  onSearch: (searchCategorie: string) => void
}

const Searchbar: React.FC<Searchlistclientseleves> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <Fragment>
      <div className="boxparents bg-white w-[full] rounded-lg relative px-4 py-2 shadow-md">
     
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 pr-40">
        
     
          <div className="search flex items-center gap-2 px-3 py-2 bg-[#E6E6FA] rounded-lg w-full sm:w-auto">
            <IoSearchSharp size={20} className="text-gray-600" />
            <input
              type="text"
              placeholder="Recherche..."
              className="bg-[#E6E6FA] focus:outline-none text-gray-700 w-full sm:w-auto"
              onChange={handleSearchChange}
            />
          </div>
        </div>

      
        {/* <button
          className="absolute bottom-2 right-4 text-white bg-[#8E44AD] px-6 py-2 rounded-lg text-center font-medium flex items-center gap-2 hover:bg-[#732d91] transition duration-300"
          onClick={() => setAddcommandemodule(true)}
        >
          <FaUserPlus size={20} />
          Ajouter Elèves
        </button> */}
      </div>
    </Fragment>
  )
}

export default Searchbar
