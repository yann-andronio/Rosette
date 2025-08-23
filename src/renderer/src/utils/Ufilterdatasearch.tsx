// eto nle T dia type dynamique (mbola tsy fantatra ny type hiditra @ngiah) , data:tiky nle item de tableaux andeha ampesaina
// keysof T : renvoie clé nle objet . ex:name , age  de eto izy sous forme de tableau de clé ["name , age "]
// .some() est une méthode @na tableau mijery  raha misy condition marina iray   dia marina jiaby 
// item[key] maka val nle propriété anatin nle objet.

export function filterDatasearch<T>(data: T[], search: string, keys: (keyof T)[]): T[] {
  const transformValuesearch = search.toLowerCase()

  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key]
      return typeof value === 'string' && value.toLowerCase().includes(transformValuesearch)
    })
  )
}
