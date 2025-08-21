// import { useEffect, useState, useRef } from 'react'
// import { filterDataCombined } from '@renderer/utils/filterDataCombined'
// import { FilterOptions } from '@renderer/types/Alltypes'

// export function useFilterDataCombined<T>( data: T[], search: string, keys: (keyof T)[], filters: FilterOptions): T[] {
//   const [filteredData, setFilteredData] = useState<T[]>(data)
//   const dataRef = useRef<T[]>(data)

//   useEffect(() => {
//     dataRef.current = data
//   }, [data])

//   useEffect(() => {
//     const filteredResult = filterDataCombined(dataRef.current, search, keys, filters)

//     const isEqual =filteredResult.length === filteredData.length && filteredResult.every((item, index) => {
//         return item === filteredData[index]
//       })

//     if (!isEqual) {
//       setFilteredData(search === '' ? [...dataRef.current] : filteredResult)
//     }
//   }, [search, keys, filters, filteredData])

//   return filteredData
// }
