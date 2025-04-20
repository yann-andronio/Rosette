
import { useEffect, useState } from 'react'
import { filterDatasearch } from '../utils/Ufilterdatasearch'

export function useFilterData<T>(data: T[], search: string, keys: (keyof T)[]): T[] {
  const [filtered, setFiltered] = useState<T[]>(data)

  useEffect(() => {
    const result = filterDatasearch(data, search, keys)
    setFiltered(search === '' ? [...data] : result)
  }, [search, data, keys])

  return filtered
}
