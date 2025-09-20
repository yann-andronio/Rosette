import { EmployerType } from '@renderer/types/Alltypes'

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
    salairebase: 3500,
    statut: 'Actif',
    dateEmbauche: '2020-02-15',
    matieresSalles: [
      { matiere: 'Mathématiques', salle: 'Salle A1' },
      { matiere: 'Physique', salle: 'Salle B2' }
    ],
    conges: [
      { dateDebut: new Date('2025-01-10'), dateFin: new Date('2025-01-15'), motif: 'Congé annuel' },
      { dateDebut: new Date('2025-06-01'), dateFin: new Date('2025-06-05'), motif: 'Formation' }
    ],
    salaires: [
      { mois: 1, montant: 3500, typePaiement: 'Avance', motif: 'Salaire de base' },
      { mois: 2, montant: 3500, typePaiement: 'Salaire complet', motif: 'Salaire de base' }
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
    salairebase: 2500,
    statut: 'Actif',
    dateEmbauche: '2019-05-20',
    matieresSalles: [],
    conges: [
      { dateDebut: new Date('2025-03-15'), dateFin: new Date('2025-03-20'), motif: 'Congé annuel' }
    ],
    salaires: [
      { mois: 1, montant: 2500, typePaiement: 'Chèque', motif: 'Salaire de base' },
      { mois: 2, montant: 2500, typePaiement: 'Chèque', motif: 'Salaire de base' }
    ]
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
    salairebase: 2200,
    statut: 'En congé',
    dateEmbauche: '2021-09-10',
    matieresSalles: [],
    conges: [
      { dateDebut: new Date('2025-08-01'), dateFin: new Date('2025-08-10'), motif: 'Congé maladie' }
    ],
    salaires: [
      { mois: 1, montant: 2200, typePaiement: 'Espèce', motif: 'Salaire de base' },
      { mois: 2, montant: 2200, typePaiement: 'Espèce', motif: 'Salaire de base' }
    ]
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
    salairebase: 3300,
    statut: 'Actif',
    dateEmbauche: '2018-11-05',
    matieresSalles: [{ matiere: 'Français', salle: 'Salle C1' }],
    conges: [],
    salaires: [
      { mois: 1, montant: 3300, typePaiement: 'Virement', motif: 'Salaire de base' },
      { mois: 2, montant: 3300, typePaiement: 'Virement', motif: 'Salaire de base' }
    ]
  }
]
