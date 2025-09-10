import { EcolageType, FilterOptions } from "@renderer/types/Alltypes"
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'

export function filterDataCombined<T extends { data: Etudiant[] }>(
  data: T[],
  searchTerm: string,
  searchKeys: string[],
  filters: FilterOptions
): T[] {
  return data.filter((item) => {
    const searchMatch = searchKeys.some((key) => {
      const value = item[key]
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    })
      // || item['sexe'] === filters.sexe
    const matchYear = !filters.annee || filters.annee === 'All' || item['annee'] === filters.annee
    const matchSalle = !filters.nom_salle || filters.nom_salle === 'All' || (item['salle'] && item['salle'].toLowerCase() === filters.nom_salle.toLowerCase())
    const matchNiveau = !filters.nom_classe ||filters.nom_classe === 'All' ||(item['niveau'] && item['niveau'].toLowerCase() === filters.nom_classe.toLowerCase())
    const matchSexe = !filters.sexe || filters.sexe === 'All'
    const matchMention = !filters.mention || filters.mention === 'All' || item['mention'] === filters.mention
    const matchStatus = !filters.statusecolage || filters.statusecolage === 'All' || item['statusecolage'] === filters.statusecolage

    // Filtrer selon le mois et le statut d'écolage
    const matchMois = !filters.mois || filters.mois === 'All'? true: item.data.some((e) => {

      e.ecolage.map(ex => ex.mois !== filters.mois)
      e.ecolage.map(ex => ex.payé !== filters.statusecolage&&filters.statusecolage)
      return true
    })

    return ( searchMatch && matchYear && matchSalle && matchSexe && matchMention && matchNiveau && matchStatus && matchMois
    )
  })
}
