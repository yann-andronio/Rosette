import { useEffect, useState, useRef } from 'react'
import { filterDatasearch } from '../utils/Ufilterdatasearch'

export function useFilterData<T>(data: T[], search: string, keys: (keyof T)[]): T[] {
  const [filtered, setFiltered] = useState<T[]>(data)

  // Utilisation de useRef pour garder une référence à la version initiale de `data`
  const dataRef = useRef<T[]>(data)

  // Mettre à jour `dataRef` seulement quand `data` change
  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    const result = filterDatasearch(dataRef.current, search, keys)

    // Ne mettre à jour `filtered` que si le résultat change
    if (JSON.stringify(result) !== JSON.stringify(filtered)) {
      setFiltered(search === '' ? [...dataRef.current] : result)
    }
  }, [search, keys, filtered]) 

  return filtered
}
