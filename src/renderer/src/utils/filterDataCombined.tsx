import { FilterOptions } from "@renderer/types/Alltypes"

export function filterDataCombined<T>(
  data: T[],
  searchTerm: string,
  searchKeys: (keyof T)[],
  filters: FilterOptions
): T[] {
  return data.filter((item) => {
    const searchMatch = searchKeys.some((key) => {
      const value = item[key]
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const matchYear = !filters.annee || filters.annee === 'All' || item['annee'] === filters.annee
    const matchClasse =!filters.classe || filters.classe === 'All' || item['classe'] === filters.classe
    const matchSexe = !filters.sexe || filters.sexe === 'All' || item['sexe'] === filters.sexe
    const matchMention =!filters.mention || filters.mention === 'All' || item['mention'] === filters.mention

    return searchMatch && matchYear && matchClasse && matchSexe && matchMention
  })
}
