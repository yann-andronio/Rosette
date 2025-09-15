export function getMentionColor(moyenne: number|null): string {
  if(moyenne == null)return 'text-purple-500'
  if (moyenne < 10) return 'text-red-500' // Échec
  if (moyenne < 12) return 'text-yellow-500' // Passable
  if (moyenne < 14) return 'text-orange-500' // Assez bien
  if (moyenne < 16) return 'text-green-500' // Bien
  if (moyenne < 18) return 'text-blue-500' // Très bien
   // Honorable
}
