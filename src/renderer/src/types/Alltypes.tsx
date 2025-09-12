import { CongeType, SalaireEmploye } from "@renderer/components/modalsform/Addsuiviemployeemodal"

export type EcolageType = {
  mois: string
  payé: boolean
  // solde: number
  created_at: string
}

export type StatusStudentsType = {
  id: number
  annee: {annee: string}
  salle: {nom_salle: string}
  classe: {nom_classe: string}
  moyenne_status?: number
  status_admissions?: 'admis' | 'cours'|'redoublé'|'suspendu'
}

export type StudentsType = {
  id: number
  photo: string
  nom: string
  prenom: string
  sexe: number
  nom_salle: string
  nom_classe: string
  moyenne?: number
  annee: string
  mention?: string
  adresse?: string
  dateNaissance: string
  lieuNaissance?: string
  nomPere?: string
  prenomPere?: string
  nomMere?: string
  prenomMere?: string
  telephone_pere?: string
  telephone_mere?: string
  nomTuteur?: string
  prenomTuteur?: string
  telephone_tuteur?: string
  matricule?: string
  ecole?: string
  enfant_prof: number

  note1?: number
  note2?: number
  note3?: number

  sousetudiants: StatusStudentsType[]
  statusecolage?: string | null
  moisEcolage?: string | null
  ecolage?: EcolageType[]
}

export type FilterOptions = {
  annee?: string | null
  nom_salle?: string | null
  nom_classe?: string | null
  sexe?: string | null
  mention?: string | null
  statusecolage?: string | null
  mois?: string | null
}

export type MonthType = {
  id: number
  name: string
}

// type hoan employerr

// Définition du type pour le salaire d'un employé


// Définition du type principal pour un employé
export type EmployerType = {
  id: number;
  photo?: string;
  nom: string;
  prenom: string;
  email: string;
  tel: number;
  adresse: string;
  sexe: 'Homme' | 'Femme';
  fonction: string;
  salairebase?: number;
  statut: 'Actif' | 'En congé' | 'Suspendu';
  matieresSalles?: {
    matiere: string;
    salle: string;
  }[];
  dateEmbauche: string;
  conges?: CongeType[];
  salaires?: SalaireEmploye[];
};


