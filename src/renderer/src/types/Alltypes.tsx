export type StudentsType = {
  id: number
  nom: string
  prenom: string
  sexe: string
  classe: string
  moyenne: number
  annee: string
  mention?: string
}

export type FilterOptions = {
  annee: string | null
  classe: string | null
  sexe: string | null
  mention?: string | null
}
