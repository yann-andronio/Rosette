import { EcolageType, FilterOptions } from "@renderer/types/Alltypes"

export function filterDataCombined<T extends { ecolage?: EcolageType[] }>(
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
    const matchSalle = !filters.salle || filters.salle === 'All' || (item['salle'] && item['salle'].toLowerCase() === filters.salle.toLowerCase())
    const matchNiveau = !filters.niveau ||filters.niveau === 'All' ||(item['niveau'] && item['niveau'].toLowerCase() === filters.niveau.toLowerCase())
    const matchSexe = !filters.sexe || filters.sexe === 'All' || item['sexe'] === filters.sexe
    const matchMention = !filters.mention || filters.mention === 'All' || item['mention'] === filters.mention
    const matchStatus = !filters.statusecolage || filters.statusecolage === 'All' || item['statusecolage'] === filters.statusecolage

    // Filtrer selon le mois et le statut d'écolage
   const matchMois = !filters.mois || filters.mois === 'All'? true: item.ecolage?.some((e) => {
          if (e.mois !== filters.mois) return false
          if (filters.statusecolage && e.statusecolage !== filters.statusecolage) return false
          return true
   })
    
    return ( searchMatch && matchYear && matchSalle && matchSexe && matchMention && matchNiveau && matchStatus && matchMois
    )
  })
}
