import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { format, parse, isValid } from 'date-fns'
import { fr } from 'date-fns/locale'
import { FaCalendarAlt, FaFilter } from 'react-icons/fa'
import { RiResetLeftFill } from 'react-icons/ri'
import 'react-datepicker/dist/react-datepicker.css'
import './custom-datepicker.css'

export function Calendarfilter({setDebut, setFin , SetReset , reset}:{setDebut:(date) => void, setFin:(date) => void , SetReset:(u:boolean)=>void , reset:boolean} ): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [inputStart, setInputStart] = useState(format(startDate!, 'dd-MM-yyyy'))
  const [inputEnd, setInputEnd] = useState(format(endDate!, 'dd-MM-yyyy'))

  // Dates temporaires pendant la saisie
  const [tempStart, setTempStart] = useState(inputStart)
  const [tempEnd, setTempEnd] = useState(inputEnd)

  const handleConfirm = () => {
    const parsedStart = parse(tempStart, 'dd-MM-yyyy', new Date())
    const parsedEnd = parse(tempEnd, 'dd-MM-yyyy', new Date())
    if (isValid(parsedStart)) setStartDate(parsedStart)
    if (isValid(parsedEnd)) setEndDate(parsedEnd)
    setDebut(new Date(parsedStart).toLocaleDateString('en-CA'))
    setFin(new Date(parsedEnd).toLocaleDateString('en-CA'))
    console.log(startDate)
    console.log(endDate)
  }

  const handleReset= () => {
    SetReset(!reset)
    setDebut(null)
    setFin(null)
    setStartDate(null)
    setEndDate(null)
  }

  // Synchronisation nle inputs affichés avec le calendrier
  useEffect(() => {
    setInputStart(startDate ? format(startDate, 'dd-MM-yyyy') : '')
    setInputEnd(endDate ? format(endDate, 'dd-MM-yyyy') : '')
    setTempStart(startDate ? format(startDate, 'dd-MM-yyyy') : '')
    setTempEnd(endDate ? format(endDate, 'dd-MM-yyyy') : '')
  }, [startDate, endDate])

  return (
    <div className="flex flex-col  justify-center items-center bg-white rounded-3xl shadow-lg    ">
      <div className="flex items-center gap-4  p-4">
        <div className="date-input-container">
          <div className="date-input-wrapper">
            <input
              className="border-none outline-none w-23 text-center text-sm text-gray-700 placeholder-gray-400"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              placeholder="Date de début"
            />
            <FaCalendarAlt size={15} className="text-gray-500" />
          </div>
          <div className="date-input-wrapper">
            <input
              className="border-none outline-none w-23 text-center text-sm text-gray-700 placeholder-gray-400"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              placeholder="Date de fin"
            />
            <FaCalendarAlt size={15} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Calendrier */}
      <div className="">
        <DatePicker
          selected={startDate}
          onChange={(dates: [Date | null, Date | null]) => {
            const [start, end] = dates
            setStartDate(start)
            setEndDate(end)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={fr}
        />
      </div>
      <div className="py-2 flex gap-2 w-full px-2">
        <button
          onClick={handleReset}
          className="w-full justify-center  flex items-center gap-2 px-4 py-2 bg-[#895256] text-white font-medium rounded-xl shadow-md hover:bg-[#6e3e42] transition-colors"
        >
          <RiResetLeftFill size={15} />
          Réinitialiser
        </button>
        <button
          onClick={handleConfirm}
          className="w-full justify-center  flex items-center gap-2 px-4 py-2 bg-[#895256] text-white font-medium rounded-xl shadow-md hover:bg-[#6e3e42] transition-colors"
        >
          <FaFilter size={15} />
          Filtrer
        </button>
      </div>
    </div>
  )
}
