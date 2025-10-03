import logo from '../../images/logo.jpg'
import './cert.css'
import { axiosRequest } from '@renderer/config/helpers'
import { useEffect, useState } from 'react'

const CertScolaire = ({ student }) => {


  const dateImpression = new Date().toLocaleDateString('fr-FR')
  const [decision, setDecision] = useState<string>('')
  const getDecision = async () => {
    try{

      await axiosRequest('GET', 'identifys',null, 'token')
        .then(({data}) => setDecision(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getDecision()
  }, [])

  const {
    nom = '',
    prenom = '',
    nom_salle = '',
    annee = '',
    matricule = 'N/A',
    dateNaissance = '',
    nomPere = '',
    prenomPere = '',
    nomMere = '',
    prenomMere = '',
    adresse = ''
  } = student || {}

  return (
    <div
      id="certificat-a-imprimer"
      className="hidden print:block print:w-[210mm] print:min-h-[297mm] print:px-12 print:py-8 print:font-['Times New Roman'] print:text-black"
    >
      {/* headerr */}
      <div className="flex justify-between items-center pb-2 ">
        <div className="text-sm leading-tight font-serif">
          <p>CIRCONRSCRIPTION SCOLAIRE : MANANARA-NORD</p>
          <p>Collège privé : LA ROSETTE II</p>
          <p>Décision N° : {decision}</p>
          <p>Code : 511071201</p>
        </div>
        <div>
          <img src={logo} alt="Logo La Rosette II" className="w-40 h-auto" />
        </div>
      </div>

      <div className="-mt-10 mb-2 text-center relative">
        <div className="inline-block px-8 py-2 border-2 border-black">
          <h1 className="text-xl font-bold text-[#6b4a52]">CERTIFICAT DE SCOLARITE</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="text-base relative leading-relaxed font-serif">
        <p>
          Je soussignée, Directeur du collège privé
          <span className="font-bold"> LA ROSETTE II</span> Mananara-Nord certifie que :
        </p>
        <p>
          Le / la nommé (e) :
          <span className="border-b border-dotted border-black px-1">
            {nom} {prenom}
          </span>
        </p>
        <p>
          Fréquente régulièrement mon établissement depuis
          <span className="border-b border-dotted border-black px-1">12 Septembre 2024</span>
          jusqu'à ce jour.
        </p>
        <p>
          En classe de : <span className="border-b border-dotted border-black px-1">{nom_salle}</span>
          pour l'année scolaire :
          <span className="border-b border-dotted border-black px-1">{annee}</span>
        </p>
        <p>
          N° d'inscription :
          <span className="border-b border-dotted border-black px-1">{matricule}</span>
        </p>
        <p>
          Date de naissance :
          <span className="border-b border-dotted border-black px-1">{dateNaissance}</span>
        </p>
        <p>
          Fils ou fille de :
          <span className="border-b border-dotted border-black px-1">
            {nomPere + '  ' + prenomPere}
          </span>
        </p>
        <p>
          Et de :
          <span className="border-b border-dotted border-black px-1">
            {nomMere + '  ' + prenomMere}
          </span>
        </p>
        <p>
          Demeurant à : <span className="border-b border-dotted border-black px-1">{adresse}</span>
        </p>

        {/* sary comme logo comme filigramme */}
        <div className="absolute -top-[12%] left-[25%] opacity-15 z-0 pointer-events-none">
          <img src={logo} alt="Logo La Rosette II" className="w-80 h-auto" />
        </div>
      </div>

      <div className=" right-0 pt-12 absolute flex flex-col items-center w-1/2 justify-end">
        <p>
          Fait à Mananara-Nord, le
          <span className="border-b border-dotted border-black px-1">{dateImpression}</span>
        </p>
        <p className="mt-1">Le Directeur</p>

        <div className="mt-28">
          <p>MANANJARA Ludovic Lai</p>
        </div>
      </div>


      <div className="mt-2">
        <p>Ce présent certificat lui est délivré pour servir et valoir ce que de droit</p>
        <div className="flex mt-4 justify-between items-end">
          <div className="text-sm w-2/3">
            <p className="font-bold">Motif :</p>
            <div className="mt-2 space-y-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                Transfert
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                Complément de dossier
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                Autre :
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertScolaire
