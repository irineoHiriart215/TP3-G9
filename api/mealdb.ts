const BASE_DIR = "https://www.themealdb.com/api/json/v1/1/";

export async function searchMeals(query: string) {
    const url = `${BASE_DIR}/search.php?s=${encodeURIComponent(query)}`;
    console.log('URL usada:', url);
  
    try {
      const response = await fetch(url);
      const text = await response.text();
      console.log('Respuesta RAW:', text);  
      const data = JSON.parse(text);
      return data.meals || [];
    } catch (error) {
      console.error('Error al buscar recetas:', error);
      return [];
    }
}

export async function getRandomMeals(count: number = 10) {
    const promises = Array.from({ length: count }, () =>
      fetch(`${BASE_DIR}/random.php`).then(res => res.json())
    );
  
    try {
      const results = await Promise.all(promises);
      // results = [{ meals: [...] }, { meals: [...] }, ...]
      return results.flatMap(r => r.meals || []);
    } catch (error) {
      console.error('Error al obtener recetas aleatorias:', error);
      return [];
    }
  }