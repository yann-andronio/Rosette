export function getMention(moyenne: number|null, sub:number): string {
  if(moyenne != null){
    if (moyenne < 10/sub) return 'Aucune'
    if (moyenne < 12/sub) return 'passable'
    if (moyenne < 14/sub) return 'A-bien'
    if (moyenne < 16/sub) return 'Bien'
    if (moyenne < 18/sub) return 'Très-Bien'
    return 'Honorable'
  }else{
    return 'N/A'
  }


}
