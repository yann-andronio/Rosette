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
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 break-all">
          <p className="text-lg font-medium text-gray-700">{item.title}</p>
        </div>
        <div className=" p-3 rounded-full  text-white bg-[#895256] shadow-sm">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mt-1">
        {item.title === 'Argent actuel' ? `${item.value} Ar` : item.value}
      </p>
    </div>
  )
}
