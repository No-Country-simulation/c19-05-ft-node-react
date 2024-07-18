import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";

// custom id para únicamente identificar cada uno
export const categories = [
  { name: "Salud y Bienestar", customId: 1 },
  { name: "Tecnologia e Informatica", customId: 2 },
  { name: "Artes y Entretenimiento", customId: 3 },
  { name: "Educacion y Ensenanza", customId: 4 },
  { name: "Negocios y Finanzas", customId: 5 },
  { name: "Deportes y Fitness", customId: 6 },
  { name: "Ciencias y Medicina", customId: 7 },
  { name: "Hogar y Jardineria", customId: 8 },
  { name: "Gastronomia", customId: 9 },
  { name: "Moda y Belleza", customId: 10 },
];

// cada customId va a coincidir con la customId de las categorías que ya existen
export const specialties = [
  { name: "Nutricion", categoryId: "", customId: 1 },
  { name: "Fisioterapia", categoryId: "", customId: 1 },
  { name: "Psicologia", categoryId: "", customId: 1 },
  { name: "Desarrollo Web", categoryId: "", customId: 2 },
  { name: "Ciberseguridad", categoryId: "", customId: 2 },
  { name: "Inteligencia Artificial", categoryId: "", customId: 2 },
  { name: "Musica", categoryId: "", customId: 3 },
  { name: "Pintura", categoryId: "", customId: 3 },
  { name: "Cine", categoryId: "", customId: 3 },
  { name: "Ensenanza de Idiomas", categoryId: "", customId: 4 },
  { name: "Matematicas", categoryId: "", customId: 4 },
  { name: "Historia", categoryId: "", customId: 4 },
  { name: "Contabilidad", categoryId: "", customId: 5 },
  { name: "Marketing", categoryId: "", customId: 5 },
  { name: "Gestion de Proyectos", categoryId: "", customId: 5 },
  { name: "Entrenamiento Personal", categoryId: "", customId: 6 },
  { name: "Yoga", categoryId: "", customId: 6 },
  { name: "Natacion", categoryId: "", customId: 6 },
  { name: "Biologia", categoryId: "", customId: 7 },
  { name: "Quimica", categoryId: "", customId: 7 },
  { name: "Medicina", categoryId: "", customId: 7 },
  { name: "Diseno de Interiores", categoryId: "", customId: 8 },
  { name: "Jardineria", categoryId: "", customId: 8 },
  { name: "Mantenimiento del Hogar", categoryId: "", customId: 8 },
  { name: "Cocina Internacional", categoryId: "", customId: 9 },
  { name: "Reposteria", categoryId: "", customId: 9 },
  { name: "Enologia", categoryId: "", customId: 9 },
  { name: "Diseno de Moda", categoryId: "", customId: 10 },
  { name: "Maquillaje", categoryId: "", customId: 10 },
  { name: "Estilismo", categoryId: "", customId: 10 },
];

export const addCategories = async (
  categories: { name: string; customId: number }[]
) => {
  try {
    // toma el array de categorías, donde cada uno tiene su nombre y id propio
    const addArray = categories.map((category) => {
      // Y cada elemento del array lo convierte en una promesa,
      // la cual una vez cumplida, los agrega a la base de datos
      return Category.create(category);
    });

    // Y esta línea agrega todos los elementos a la base de datos
    // Vale la pena resaltar que MongoDB se encargará de darle un identificador único
    // a cada categoría, y será útil para asignarle el id de categoría a cada especialidad
    await Promise.allSettled(addArray);
    console.log(addArray);
    return "Carga completa";
  } catch (error) {
    console.log(error);
  }
};

export const addSpecialties = async (
  specialties: { name: string; categoryId: string; customId: number }[]
) => {
  try {
    // Consigue todas las categorías que se han agregado a la base de datos
    const categories = await Category.find();
    // Luego, toma todas las especialidades e itera sobre todas ellas.
    const newArray = specialties.map((specialty) => {
      // Recorre todo el array de categorías que se sacó de la base de datos.
      // también toma el índice
      for (let index = 0; index < categories.length; index++) {
        // Si el customId de la especialidad que viene del array de especialidades
        // coincide con el customId de cada categoría que se está recorriendo,
        if (specialty.customId === categories[index].customId) {
          // entonces se le agrega un campo llamado categoryId, el cual es el mismo
          // id que tiene la categoría que MongoDB le añadió por defecto
          specialty.categoryId = categories[index].id;
          // Y se crea el array de promesas
          return Specialty.create(specialty);
        }
      }
    });
    // que una vez ejecutados, agregarán las especialidades a la base de datos
    await Promise.allSettled(newArray);
    console.log(newArray);
    return "Seed completo";
  } catch (error) {
    console.log(error);
  }
};
