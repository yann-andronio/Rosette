import { EmployerType } from "@renderer/types/Alltypes"

export const EmployersData: EmployerType[] = [
  {
    id: 1,
    nom: 'Rakoto',
    prenom: 'Jean',
    email: 'jean.rakoto@email.com',
    tel: 321234567,
    adresse: 'Lot II B 123, Antananarivo',
    sexe: 'Homme',
    fonction: 'Professeur',
    salaire: 3500,
    statut: 'Actif',
    matieresSalles: [
      { matiere: 'Mathématiques', salle: 'Salle A1' },
      { matiere: 'Physique', salle: 'Salle B2' }
    ]
  },
  {
    id: 2,
    nom: 'Rasoa',
    prenom: 'Marie',
    email: 'marie.rasoa@email.com',
    tel: 349876543,
    adresse: 'Lot IV D 45, Antananarivo',
    sexe: 'Femme',
    fonction: 'Secrétaire',
    salaire: 2500,
    statut: 'Actif',
    matieresSalles: []
  },
  {
    id: 3,
    nom: 'Randria',
    prenom: 'Paul',
    email: 'paul.randria@email.com',
    tel: 381122233,
    adresse: 'Lot IIF 78, Antsirabe',
    sexe: 'Homme',
    fonction: 'Gardien',
    salaire: 2200,
    statut: 'En congé',
    matieresSalles: []
  },
  {
    id: 4,
    nom: 'Raherimanana',
    prenom: 'Lalao',
    email: 'lalao.raherimanana@email.com',
    tel: 336612345,
    adresse: 'Lot III H 56, Fianarantsoa',
    sexe: 'Femme',
    fonction: 'Professeur',
    salaire: 3300,
    statut: 'Actif',
    matieresSalles: [{ matiere: 'Français', salle: 'Salle C1' }]
  },
  {
    id: 5,
    nom: 'micka',
    prenom: 'belastik',
    email: 'belastik.raherimanana@email.com',
    tel: 336612345,
    adresse: 'Lot III H 56, tana',
    sexe: 'Femme',
    fonction: 'Gardien',
    salaire: 3300,
    statut: 'Actif',
    matieresSalles: []
  }
]
