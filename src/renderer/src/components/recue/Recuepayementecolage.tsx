import { forwardRef, useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import logo from '../../images/logo.jpg'
import { axiosRequest } from '@renderer/config/helpers'

type RecuepayementecolageProps = {
  eleve: string
  classe: string
  salle: string
  annee: string
  mois: string
  montant: number
  datePaiement: string
  numeroRecu?: string
}

const Recuepayementecolage = forwardRef<HTMLDivElement, RecuepayementecolageProps>(
  ({ eleve, classe, salle, annee, mois, montant, datePaiement, numeroRecu }, ref) => {
    const formattedDatePaiement = new Date(datePaiement).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  const [num , setNum] = useState()
    const getNum = async () => {
      await axiosRequest('GET', 'recue', null, 'token')
        .then(({data}) => setNum(data))
    }
    useEffect(() => {
      getNum()
    }, [])
    return (
      <div
        ref={ref}
        className="bg-white w-[600px] mx-auto p-8 border border-gray-900 shadow-xl text-sm leading-normal text-gray-900 print:w-full print:shadow-none print:p-4"
      >

        <div className="flex justify-between items-start border-b-2 border-[#895256] pb-4 mb-6">
          <div className="flex items-center gap-4">

            <img src={logo} alt="Logo de l'école" className="w-20 h-20 object-contain" />
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 uppercase tracking-wider">
                LA ROSETTE
              </h1>
              <p className="text-xs text-gray-700 font-medium mt-1">
                Lycée Privé - Homologué par le Ministère
              </p>
            </div>
          </div>
          <div className="text-xs text-right space-y-1 pt-1 text-gray-800">
            <div className="flex items-center justify-end gap-1">
              <FaMapMarkerAlt size={10} className="text-gray-600" />
              <span> Mananara 511, Madagascar</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <FaPhone size={10} className="text-gray-600" />
              <span>+261 324334407</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <FaEnvelope size={10} className="text-gray-600" />
              <span>contact@ecole.mg</span>
            </div>
          </div>
        </div>


        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-1 inline-block">
            REÇU DE PAIEMENT D’ÉCOLAGE
          </h2>
         <div className="mt-2 p-1 bg-gray-100 rounded-sm">
            <p className="text-sm font-semibold text-gray-800">
              N° Reçu :{' '}
              <span className="text-lg font-extrabold text-[#895256]">
                {num}
              </span>
            </p>
          </div>
        </div>


        <div className="mb-6 p-4 border border-gray-400 rounded-lg bg-gray-50">
          <h3 className="text-base font-bold mb-3 border-b border-gray-300 pb-1 text-gray-700">
            INFORMATIONS DE L’ÉLÈVE
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <p>
              <span className="font-bold">Nom et Prénom :</span>{' '}
              <span className="font-semibold">{eleve}</span>
            </p>
            <p>
              <span className="font-bold">Année scolaire :</span>{' '}
              <span className="font-semibold">{annee}</span>
            </p>
            <p>
              <span className="font-bold">Classe :</span>{' '}
              <span className="font-semibold">
                {classe} ({salle})
              </span>
            </p>
            <p>
              <span className="font-bold">Mois payé :</span>{' '}
              <span className="font-semibold uppercase">{mois}</span>
            </p>
          </div>
        </div>


        <h3 className="text-base font-bold mb-3 text-gray-700">DÉTAILS DU PAIEMENT</h3>
        <div className="border-2 border-gray-600 rounded-lg mb-6 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#895256] text-white">
              <tr>
                <th className="text-left p-3 font-semibold w-1/2">Libellé</th>
                <th className="text-center p-3 font-semibold w-1/4">Date de paiement</th>
                <th className="text-right p-3 font-semibold w-1/4">Montant Payé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Écolage du mois de {mois}</td>
                <td className="p-3 text-center">{formattedDatePaiement}</td>
                <td className="p-3 text-right font-bold text-lg">{montant.toLocaleString()} Ar</td>
              </tr>

              <tr className="border-t border-gray-400 bg-gray-100">
                <td colSpan={2} className="p-3 text-right text-base font-extrabold text-gray-900">
                  MONTANT TOTAL REÇU :
                </td>

                <td className="p-3 text-right text-xl font-extrabold text-gray-900 border-l border-gray-400">
                  {montant.toLocaleString()} Ar
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* <p className="italic mb-6 p-2 border border-gray-300 rounded-md bg-white">
          Montant en toutes lettres :{' '}
          <span className="underline font-bold text-gray-900">{'...'}</span> Ariary
        </p> */}

        <p className="text-sm mb-10 text-right">
          Fait à <span className="font-semibold">Mananara</span>, le{' '}
          <span className="font-semibold">{formattedDatePaiement}</span>.
        </p>


        <div className="flex justify-between mt-10 text-sm">
          <div className="text-center w-1/3">
            <p className="mb-12 border-b border-dashed border-gray-500 pb-1">
              Signature de l’élève / parent
            </p>
          </div>

          <div className="text-center w-1/3">
            <p className="mb-12 border-b border-dashed border-gray-500 pb-1">
              Signature & Cachet de l’École
            </p>
          </div>
        </div>


        <div className="mt-12 text-center text-xs text-gray-600 border-t pt-3">
          <p className="font-bold text-gray-800">CONSERVEZ PRÉCIEUSEMENT CE DOCUMENT.</p>
          <p className="mt-1">
            Ce reçu est généré automatiquement par le système de gestion de l’établissement et fait
            foi de paiement.
          </p>
        </div>
      </div>
    )
  }
)

export default Recuepayementecolage
