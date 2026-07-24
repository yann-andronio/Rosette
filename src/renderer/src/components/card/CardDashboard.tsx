import React from 'react'
import { IconType } from 'react-icons'
import {
  FaUserGraduate, FaChalkboardTeacher, FaUsers,
  FaMoneyBillWave, FaWallet, FaCoins, FaPlus
} from 'react-icons/fa'

interface CardData {
  title: string
  value: number
  icon: IconType
}
interface CardDashboardProps { item: CardData }

// Icônes identiques — logique inchangée
const getIcon = (icon) => {
  switch (icon) {
    case 'FaUserGraduate':     return FaUserGraduate
    case 'FaChalkboardTeacher':return FaChalkboardTeacher
    case 'FaUsers':            return FaUsers
    case 'FaMoneyBillWave':    return FaMoneyBillWave
    case 'FaWallet':           return FaWallet
    case 'FaCoins':            return FaCoins
    case 'FaPlus':             return FaPlus
    default:                   return FaWallet
  }
}

const MONEY_TITLES = ['Solde de kermesses', "Solde de droits", "Solde d'écolages"]

export const CardDashboard: React.FC<CardDashboardProps> = ({ item }) => {
  const Icon = getIcon(item.icon)
  const isMonetary = MONEY_TITLES.includes(item.title)
  const displayValue = isMonetary
    ? `${Number(item.value).toLocaleString('fr-FR')} Ar`
    : item.value

  return (
    <article
      className="card p-5 relative overflow-hidden group cursor-default"
      aria-label={`${item.title} : ${displayValue}`}
    >
      {/* Orbe décoratif */}
      <div
        aria-hidden="true"
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,59,63,.08) 0%, transparent 70%)' }}
      />

      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Icône */}
        <div
          aria-hidden="true"
          className="flex-shrink-0 p-2.5 rounded-xl text-white
            shadow-md group-hover:shadow-lg transition-shadow duration-300"
          style={{ background: 'linear-gradient(135deg, #7A3B3F 0%, #5E2D30 100%)' }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Titre */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 truncate">
        {item.title}
      </p>

      {/* Valeur */}
      <p className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none break-all">
        {displayValue}
      </p>
    </article>
  )
}
