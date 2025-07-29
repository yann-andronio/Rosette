import { Fragment } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

type SearchBarProps = {
  onSearch: (searchCategorie: string) => void
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <Fragment>
      <div className="w-full sm:w-[30%] bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 ">
          <div className="text-gray-500">
            <IoSearchSharp size={22} />
          </div>
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Searchbar
