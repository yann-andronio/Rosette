// eto nle T dia type dynamique (mbola tsy fantatra ny type hiditra @ngiah) , data:tiky nle item de tableaux andeha ampesaina
// keysof T : renvoie clé nle objet . ex:name , age  de eto izy sous forme de tableau de clé ["name , age "]
// .some() est une méthode @na tableau mijery  raha misy condition marina iray   dia marina jiaby 
// item[key] maka val nle propriété anatin nle objet.

// utils/Ufilterdatasearch.ts
export function filterDatasearch<T>(data: T[], search: string, keys: (keyof T)[]): T[] {
  if (!search) return data;

  const lowerSearch = search.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        // Si c'est un tableau d'objets, on cherche dans tous les champs string
        return value.some((subItem) =>
          Object.values(subItem)
            .filter((v) => typeof v === 'string')
            .some((v) => v.toLowerCase().includes(lowerSearch))
        );
      } else if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearch);
      }
      return false;
    })
  );
}
