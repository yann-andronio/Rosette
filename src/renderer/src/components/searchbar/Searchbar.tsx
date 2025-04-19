import { Fragment } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

type SearchBarProps = {
  onSearch: (searchCategorie: string) => void
  onfilter: () => void
}


const Searchbar: React.FC<SearchBarProps> = ({ onSearch , onfilter }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <Fragment>
      <div className="boxparents bg-white w-[40%] rounded-lg relative px-4 py-2 shadow-md">
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

        <div className="filter">
          <button
            onClick={() => onfilter()}
            className=" absolute top-[15%] right-2 p-2 rounded-lg w-[20%] flex justify-center shadow-lg bg-[#895256] text-[#ffff] hover:bg-blue-600 transition duration-200"
          >
            Filtrer
          </button>
        </div>
       
      </div>
    </Fragment>
  )
}

export default Searchbar
