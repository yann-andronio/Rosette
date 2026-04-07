import { forwardRef } from 'react'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { formatDate } from '@renderer/utils/FormatDate'
import logo from '../../../images/logo.jpg'

type PaymentInfo = {
  id: number
  montant: number
  type: string
  reste: number
  created_at: string
}

interface PapierImpressionRecueKermessProps {
  student: Etudiant
  paymentInfo?: PaymentInfo
  school:string
}

const PapierImpressionRecueKermess = forwardRef<HTMLDivElement, PapierImpressionRecueKermessProps>(
  ({ student, paymentInfo, school }, ref) => {
    if (!paymentInfo) return null

    const lastSousEtudiant = student.sousetudiants[student.sousetudiants.length - 1]

    return (
      <div
        ref={ref}
        className="p-10 bg-white text-slate-900 font-sans w-[148mm] mx-auto border-4 border-double border-slate-300 relative overflow-hidden"
      >
        {/* Filgrame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] -rotate-45 pointer-events-none">
          <h1 className="text-9xl font-black">{school}</h1>
        </div>

        <div className="flex justify-between items-center border-b-2 border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo de l'école" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                {school}
              </h1>
              {/* <p className="text-[10px] text-slate-600 font-bold mt-1 uppercase tracking-tight">
                Lycée Privé - Homologué par le Ministère
              </p> */}
              <p className="text-[9px] text-slate-500 italic font-medium">Éducation d'excellence</p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-sm font-black uppercase text-slate-500 tracking-widest mb-1">
              Reçu de Kermess
            </h2>
            <div className="bg-slate-900 text-white px-3 py-1 text-xs font-mono font-bold rounded inline-block">
              N° {paymentInfo.id.toString().padStart(6, '0')}
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-bold italic">
              Le {formatDate(paymentInfo.created_at)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-50 p-3 ">
            <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">
              Élève
            </label>
            <p className="text-base font-black text-slate-900 leading-tight">
              {student.nom} {student.prenom}
            </p>
            <p className="text-xs font-bold text-slate-600 mt-1">
              Matricule: {student.matricule || '—'}
            </p>
          </div>
          <div className="text-right p-3">
            <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">
              Niveau d'Études
            </label>
            <p className="text-sm font-black text-slate-800">
              {lastSousEtudiant?.classe?.nom_classe ?? '-'}
            </p>
            <p className="text-xs font-medium text-slate-500 italic">
              Salle: {lastSousEtudiant?.salle?.nom_salle ?? '-'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase font-black text-slate-500 border-b border-slate-200 text-left">
                <th className="pb-2">Désignation</th>
                <th className="pb-2 text-center">Type</th>
                <th className="pb-2 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4">
                  <p className="font-bold text-slate-800">Kermess / Scolarité</p>
                  {/* <p className="text-[10px] text-slate-400 font-medium">Année Scolaire en cours</p> */}
                </td>
                <td className="text-center text-xs font-bold text-slate-600 uppercase italic">
                  {paymentInfo.type}
                </td>
                <td className="text-right py-4 font-black text-lg text-slate-900">
                  {paymentInfo.montant.toLocaleString()} Ar
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
              <span className="text-[10px] font-black text-red-500 uppercase">Reste à payer :</span>
              <span className="text-lg font-black text-red-600">
                {paymentInfo.reste.toLocaleString()} Ar
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 px-4">
          <div className="text-center">
            <div className="mb-14 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              L'Élève / Parent
            </div>
            <div className="w-24 h-[1px] bg-slate-300 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="mb-14 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Le Comptable
            </div>
            <div className="w-24 h-[1px] bg-slate-300 mx-auto"></div>
          </div>
        </div>

        <div className="mt-10 text-center border-t border-slate-100 pt-4">
          <p className="text-[9px] text-slate-400 font-bold uppercase">
            LA ROSETTE - Excellence & Discipline
          </p>
          <p className="text-[8px] text-slate-300 mt-1 uppercase">
            Généré numériquement le {new Date().toLocaleDateString('fr-FR')} à{' '}
            {new Date().toLocaleTimeString('fr-FR')}
          </p>
        </div>
      </div>
    )
  }
)

export default PapierImpressionRecueKermess
