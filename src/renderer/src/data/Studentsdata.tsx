import { StudentsType } from '@renderer/types/Alltypes'
import photoTest from '../images/test.png'

export const Studentsdata: StudentsType[] = [
  {
    id: 1,
    photo: photoTest,
    nom: 'Rakotoson',
    prenom: 'Arnaud',
    sexe: 'Homme',
    salle: 'T2 3a',
    niveau: 'Terminale',
    moyenne: 16.4,
    annee: '2000',
    mention: 'Très Bien',
    adresse: 'Lot II F 45, Antananarivo',
    date_naissance: '2006-04-12',
    lieu_naissance: 'Antsirabe',
    nom_pere: 'Rakotovao',
    prenom_pere: 'Jean',
    nom_mere: 'Randrianasolo',
    prenom_mere: 'Fanja',
    tel_pere: '0321234567',
    tel_mere: '0349876543',
    nom_tuteur: 'Andrianarisoa',
    prenom_tuteur: 'Patrick',
    tel_tuteur: '0331122334',
    matricule: 'A001',
    ecole_prec: 'Lycée Sainte-Marie',
    enfant_prof: 'oui',
    trimestre1: 16.0,
    trimestre2: 17.1,
    trimestre3: 16.2,
    historiqueStatus: [
      {
        annee_status: '2022',
        salle: 'Première A1',
        niveau: 'Première',
        moyenne_status: 15.2,
        statut: 'redoublé'
      },
      {
        annee_status: '2023',
        salle: 'Première A2',
        niveau: '3e',
        moyenne_status: 15.2,
        statut: 'admis'
      },
      { annee_status: '2024', salle: 'Première A1', niveau: '3e' }
    ],
    statusecolage: 'Complet',
    moisEcolage: 'Janvier',
    ecolage: [
      { mois: 'Janvier', statusecolage: 'Complet', montant: 200000, datePaiement: '2024-01-05' },
      { mois: 'Février', statusecolage: 'Complet', montant: 200000, datePaiement: '2024-02-05' },
      { mois: 'Mars', statusecolage: 'Complet', montant: 200000, datePaiement: '2024-03-05' },
      { mois: 'Mai', statusecolage: 'Complet', montant: 200000, datePaiement: '2024-03-05' }
    ]
  },
  {
    id: 2,
    photo: '',
    nom: 'Ramiaramanana',
    prenom: 'Lova',
    sexe: 'Femme',
    salle: 'term 2d',
    niveau: 'Terminale',
    moyenne: 13.2,
    annee: '2024',
    mention: 'Assez Bien',
    adresse: 'Ampasapito, Antananarivo',
    date_naissance: '2007-08-09',
    lieu_naissance: 'Fianarantsoa',
    nom_pere: 'Ramiaramanana',
    prenom_pere: 'Hery',
    nom_mere: 'Rasoa',
    prenom_mere: 'Lilas',
    tel_pere: '0329876543',
    tel_mere: '0345566778',
    nom_tuteur: '',
    prenom_tuteur: '',
    tel_tuteur: '',
    matricule: 'A002',
    ecole_prec: 'Collège La Lumière',
    enfant_prof: 'non',
    trimestre1: 12.0,
    trimestre2: 14.0,
    trimestre3: 13.0,
    historiqueStatus: [
      {
        annee_status: '2023',
        salle: 'Seconde S2',
        niveau: '3e',
        moyenne_status: 12.5,
        statut: 'admis'
      }
    ],
    statusecolage: 'Incomplet',
    moisEcolage: 'Février',
    ecolage: [
      { mois: 'Janvier', statusecolage: 'Complet', montant: 180000, datePaiement: '2024-01-05' },
      { mois: 'Février', statusecolage: 'Incomplet', montant: 180000, datePaiement: '' },
      { mois: 'Mars', statusecolage: 'Incomplet', montant: 180000, datePaiement: '' }
    ]
  }
]