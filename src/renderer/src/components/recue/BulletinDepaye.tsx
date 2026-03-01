import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'

type Salaire = {
  mois: string
  salaireBase: number
  primesDiverses: number
  totalBrut: number
  avances: number
  cnaps: number
  ostie: number
  retenuesDiverses: number
  irsa: number
  totalReduction: number
  montantPaye: number
  allocations: number
  totalGeneral: number
}

type RecueProps = {
  employer: {
    nom: string
    prenom: string
    profs?: { profession: string }
    matricule?: string
    classification?: string
    indice?: string
  }
  salaire: Salaire
}

export default function BulletinDePaye({ employer, salaire }: RecueProps) {
  const [nif, setNif] = useState<string>('XXXXXXX')

  useEffect(() => {
    const getNif = async () => {
      try {
        const { data } = await axiosRequest('GET', 'nif', null, 'token')
        if (data) setNif(data)
      } catch (error) {
        console.log(error)
      }
    }
    getNif()
  }, [])

  const formatN = (num: number = 0) => num.toLocaleString('fr-FR').replace(/\s/g, ' ')

  return (
    <div
      className="bg-white p-4 max-w-[700px] mx-auto text-black border border-gray-300"
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }}
    >
      <h1 className="text-center text-xl font-bold underline mb-4 uppercase">Bulletin de paye</h1>

      <div className="grid grid-cols-1 border-t border-x border-black">
        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black p-1 font-semibold">
            Nom et raison social de l'employeur
          </div>
          <div className="w-1/2 p-1 uppercase">Collège Privé LA ROSETTE</div>
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black p-1 font-semibold">NIF</div>
          <div className="w-1/2 p-1">{nif}</div>
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black p-1 font-semibold">
            Nom et prénom du travailleur :
          </div>
          <div className="w-1/2 p-1 font-bold uppercase">
            {employer.nom || 'XXXXX'} {employer.prenom || ''}
          </div>
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black p-1 font-semibold">Fonction :</div>
          <div className="w-1/2 p-1">{employer.profs?.profession || 'XXXXX'}</div>
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black p-1 font-semibold">N° matricule :</div>
          <div className="w-1/2 p-1">{employer.matricule || 'XXXXX'}</div>
        </div>
        <div className="flex border-b border-black bg-gray-50">
          <div className="w-1/2 border-r border-black p-1 font-semibold">
            Classification professionnelle :
          </div>
          <div className="w-1/2 p-1 flex justify-between">
            <span>{employer.classification || '.....'}</span>
            <span className="font-semibold">Indice : {employer.indice || '....'}</span>
          </div>
        </div>
        <div className="flex border-b border-black font-bold italic">
          <div className="w-1/2 border-r border-black p-1">Page du :</div>
          <div className="w-1/2 p-1">{new Date().toLocaleDateString('fr-FR')}</div>
        </div>
        <div className="flex border-b border-black italic">
          <div className="w-1/2 border-r border-black p-1">pour la période du :</div>
          <div className="w-1/2 p-1">{salaire.mois || 'XXXXX'}</div>
        </div>
      </div>

      <div className="border-x border-black">
        <div className="text-center font-bold py-1 border-b border-black uppercase">
          Salaire de base
        </div>
        <div className="flex">
          <div className="flex-1 border-r border-black">
            <div className="p-1">01 mois, journées ou heure à .....</div>
            <div className="p-1">___ vacation ou pièce ....... à .........</div>
            <div className="p-1">___ heures supplémentaires à .........</div>
            <div className="p-1">Prime d'ancienneté ......................</div>
            <div className="p-1">Prime de rendement.......................</div>
            <div className="p-1">Primes diverses..............................</div>
          </div>
          <div className="w-32 text-right border-black border-b">
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">
              {formatN(salaire.salaireBase)}
            </div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">0</div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">0</div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">0</div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">0</div>
            <div className="p-1 h-8 flex items-center justify-end">
              {formatN(salaire.primesDiverses)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-x border-b border-black font-bold">
        <div className="flex-1 text-right pr-4 p-1 uppercase">Rémunération totale brute</div>
        <div className="w-32 text-right p-1 border-l border-black">
          {formatN(salaire.totalBrut)}
        </div>
      </div>

      <div className="border-x border-black">
        <div className="italic p-1 border-b border-black">Réductions règlementaires :</div>
        <div className="flex">
          <div className="flex-1 border-r border-black">
            <div className="p-1">Avances ..........................................</div>
            <div className="p-1">Retenue CNaPS ..............................</div>
            <div className="p-1">Retenue Ostie..................................</div>
            <div className="p-1">Retenue diverses.............................</div>
            <div className="p-1">Retenue IRSA .................................</div>
          </div>
          <div className="w-32 text-right border-black border-b">
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">
              {formatN(salaire.avances)}
            </div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">
              {formatN(salaire.cnaps)}
            </div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">
              {formatN(salaire.ostie)}
            </div>
            <div className="p-1 border-b border-black h-8 flex items-center justify-end">
              {formatN(salaire.retenuesDiverses)}
            </div>
            <div className="p-1 h-8 flex items-center justify-end">{formatN(salaire.irsa)}</div>
          </div>
        </div>
      </div>

      <div className="border-x border-b border-black">
        <div className="flex font-bold">
          <div className="flex-1 text-right pr-4 p-1">Total réduction</div>
          <div className="w-32 text-right p-1 border-l border-black">
            {formatN(salaire.totalReduction)}
          </div>
        </div>
        <div className="flex font-bold">
          <div className="flex-1 text-right pr-4 p-1 uppercase">Montant de la paye</div>
          <div className="w-32 text-right p-1 border-l border-black">
            {formatN(salaire.montantPaye)}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 text-right pr-4 p-1">Allocation familiales</div>
          <div className="w-32 text-right p-1 border-l border-black">
            {formatN(salaire.allocations)}
          </div>
        </div>
        <div className="flex font-bold bg-gray-50">
          <div className="flex-1 text-right pr-4 p-1">Total général ......</div>
          <div className="w-32 text-right p-1 border-l border-black">
            {formatN(salaire.totalGeneral)}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right italic pr-12">
        <p>Emargement du salarié</p>
        <div className="h-16"></div>
      </div>
    </div>
  )
}
