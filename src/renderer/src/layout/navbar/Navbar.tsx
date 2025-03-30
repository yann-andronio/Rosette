import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { useDispatch } from 'react-redux'
import { toggleCloseBar } from '../../redux/slice/activeLinkSlice'
import { AiOutlineMenu } from 'react-icons/ai'





const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const activeName = useSelector((state: RootState) => state.activeLink.activeName)

  return (
    <Fragment>
      <div className="navbar justify-between bg-white  flex w-full pr-14 pl-4 py-3 items-center">
        <div className="burgerflex gap-4 px-4 py-2 flex">
          <AiOutlineMenu size={27} onClick={() => dispatch(toggleCloseBar())} />
          <h1 className="text-lg font-semibold">{activeName}</h1>
        </div>
        <div className="infouser flex items-center gap-3">
          <div className="sary">
            <p className="h-12 w-12 rounded-full bg-yellow-300"></p>
          </div>

          <div className="nameandfonction flex flex-col ">
            <h1 className="font-medium text-black text-base">Andronio</h1>
            <p className="text-[#0000005C]">Admin</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Navbar
