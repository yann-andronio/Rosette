export type StatusStudentsType = {
  annee_status: string
  salle: string
  niveau: string
  Moyenne_status?: number
  statut?: 'admis' | 'redoublé'
}

export type StudentsType = {
  id: number
  photo?: string
  nom: string
  prenom: string
  sexe: string
  salle: string
  niveau:string
  moyenne: number
  annee: string
  mention?: string
  adresse?: string
  date_naissance?: string
  lieu_naissance?: string
  nom_pere?: string
  prenom_pere?: string
  nom_mere?: string
  prenom_mere?: string
  tel_pere?: string
  tel_mere?: string
  nom_tuteur?: string
  prenom_tuteur?: string
  tel_tuteur?: string
  matricule?: string
  ecole_prec?: string
  enfant_prof: 'oui' | 'non'

  trimestre1?: number
  trimestre2?: number
  trimestre3?: number

  historiqueStatus?: StatusStudentsType[]
}

export type FilterOptions = {
  annee: string | null
  salle: string | null
  niveau: string | null
  sexe: string | null
  mention?: string | null
}
export type MonthType = {
  id: number
  name: string | null
}
