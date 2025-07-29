

import { FilterOptions } from "@renderer/types/Alltypes"
export function filterDataCombined<T>(data: T[], search: string, keys: (keyof T)[], filters: FilterOptions): T[] {
    
  const searchLower = search.toLowerCase()
    
  return data.filter((item) => {
    // filtre hoan (search)
    const matchSearch = keys.some((key) => {
      const value = item[key]
      return typeof value === 'string' && value.toLowerCase().includes(searchLower)
    })

    //  Filtre isaka boutons
    const matchYear = filters.annee === 'All' || item['annee'] === filters.annee
    const matchClasse = filters.classe === 'All' || item['classe'] === filters.classe
    const matchSexe = filters.sexe === 'All' || item['sexe'] === filters.sexe
    const matchMention = filters.mention === 'All' || item['mention'] === filters.mention

    return matchSearch && matchYear && matchClasse && matchSexe && matchMention
  })
}
