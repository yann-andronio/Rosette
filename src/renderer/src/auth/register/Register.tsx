import { FaEnvelope, FaLock } from 'react-icons/fa'
import './register.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import wave from '../../images/Style-Connection.png'

function Register(): JSX.Element {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-2/4 flex items-center justify-center bg-white">
        <img className="w-3/4" src={logo} alt="Logo" />
      </div>

      <div className="w-3/4 relative flex items-center justify-center">
        {/* bg-gradient-to-br from-[#7A3B3F] to-[#4F1E23] */}
        <div className="absolute bg-[#6a2e3e] clip-trapeze"></div>

        <div className=" relative z-10 w-full max-w-md p-10 text-white overflow-hidden ">
          <h2 className="text-5xl font-bold text-center mb-10">Inscription</h2>

          <form className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className=" bg-white text-black w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] outline-none"
                placeholder="Votre e-mail"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                className="bg-white text-black w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] outline-none"
                placeholder="Votre mot de passe"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-white">Se souvenir de moi</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7A3B3F] text-white p-3 rounded-lg hover:bg-[#5E2B2F] transition"
            >
              Valider
            </button>

            <div className="mt-3 text-white flex justify-center">
              <p>Vous n'avez pas de compte?</p>
              <Link to="/" className="text-white font-semibold hover:underline ml-2">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
        <img className="absolute h-full  w-full bottom-0 " src={wave} alt="Logo" />
      </div>
    </div>
  )
}
export default Register
