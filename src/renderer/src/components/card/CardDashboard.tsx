// break-all mi se permetre le texte mandeha a la ligne
import React from 'react'
import { IconType } from 'react-icons'

interface CardData {
  title: string
  value: string
  icon: IconType
}

interface CardDashboardProps {
  item: CardData
}

export const CardDashboard: React.FC<CardDashboardProps> = ({ item }) => {
  const Icon = item.icon

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div className=" p-3 rounded-xl bg-gray-100 text-[#895256] shadow-sm">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1 break-all">
          <p className="text-sm font-medium text-gray-500">{item.title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {item.title === 'Argent actuel' ? `${item.value} Ar` : item.value}
          </p>
        </div>
      </div>
    </div>
  )
}
