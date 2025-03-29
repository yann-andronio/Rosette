
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store'

function Studentsinfo(): JSX.Element {
    const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-[100%]  pl-8 pt-4
            ${closeBar ? '' : ''} transition-all duration-[600ms] ease-in-out`}
    >
      <h1>studentsinfo</h1>
    </div>
  )
}

export default Studentsinfo
