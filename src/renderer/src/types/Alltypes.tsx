export interface StudentsType {
  id: number
  nom: string
  prenom: string
  sexe: string
  classe: string
}

export type FilterOptions = {
  annee: string | null
  classe: string | null
  sexe: string | null
}