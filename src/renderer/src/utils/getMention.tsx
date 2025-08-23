export function getMention(moyenne: number): string {
  if (moyenne < 10) return 'Aucune'
  if (moyenne < 12) return 'passable'
  if (moyenne < 14) return 'A-bien'
  if (moyenne < 16) return 'Bien'
  if (moyenne < 18) return 'Très-Bien'
  return 'Honorable'
}
