export type StudentsType = {
  id: number
  photo?: string
  nom: string
  prenom: string
  sexe: string
  classe: string
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
  enfant_prof: "oui" |"non"
}

export type FilterOptions = {
  annee: string | null
  classe: string | null
  sexe: string | null
  mention?: string | null
}
