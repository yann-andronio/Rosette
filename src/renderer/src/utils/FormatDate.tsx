 export const formatDate = (isoDateString) => {
  if (!isoDateString) return 'Date non valide'

  const date = new Date(isoDateString)
  if (isNaN(date.getTime())) return 'Date non valide'

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
     } as Intl.DateTimeFormatOptions 
    //  mangala erreur de typage nle intl ....

  return date.toLocaleString('fr-FR', options)
}
