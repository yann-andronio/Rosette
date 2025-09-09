import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'

function Dashboard(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-[100%]  pl-8 pt-4
            ${closeBar ? '' : ''} transition-all duration-[600ms] ease-in-out`}
    >
      <div className="px-20 py-8">
        <h1>Bonjour</h1>
      </div>
    </div>
  )
}

export default Dashboard
