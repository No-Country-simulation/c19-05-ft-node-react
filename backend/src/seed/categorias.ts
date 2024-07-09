import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";

export const categories = [
    {name:"Salud y Bienestar",customId:1},
    {name:"Tecnologia e Informatica",customId:2},
    {name:"Artes y Entretenimiento",customId:3},
    {name:"Educacion y Ensenanza",customId:4},
    {name:"Negocios y Finanzas",customId:5},
    {name:"Deportes y Fitness",customId:6},
    {name:"Ciencias y Medicina",customId:7},
    {name:"Hogar y Jardineria",customId:8},
    {name:"Gastronomia",customId:9},
    {name:"Moda y Belleza",customId:10},
    
  ];

  
export const specialties = [
    { name: "Nutricion", categoryId:"",customId:1},
    { name: "Fisioterapia", categoryId:"" ,customId:1},
    { name: "Psicologia",  categoryId:"" ,customId:1},
    { name: "Desarrollo Web", categoryId:"" ,customId:2},
    { name: "Ciberseguridad", categoryId:"" ,customId:2},
    { name: "Inteligencia Artificial", categoryId:"" ,customId:2},
    { name: "Musica", categoryId:"" ,customId:3},
    { name: "Pintura",categoryId:"" ,customId:3},
    { name: "Cine",  categoryId:"" ,customId:3},
    { name: "Ensenanza de Idiomas", categoryId:"" ,customId:4},
    { name: "Matematicas",  categoryId:"" ,customId:4},
    { name: "Historia", categoryId:"" ,customId:4},
    { name: "Contabilidad", categoryId:"" ,customId:5},
    { name: "Marketing",  categoryId:"" ,customId:5},
    { name: "Gestion de Proyectos",categoryId:"" ,customId:5},
    { name: "Entrenamiento Personal",categoryId:"" ,customId:6},
    { name: "Yoga",categoryId:"",customId:6},
    { name: "Natacion",categoryId:"" ,customId:6},
    { name: "Biologia",categoryId:"" ,customId:7},
    { name: "Quimica",categoryId:"" ,customId:7},
    { name: "Medicina",categoryId:"" ,customId:7},
    { name: "Diseno de Interiores",categoryId:"" ,customId:8},
    { name: "Jardineria", categoryId:"" ,customId:8},
    { name: "Mantenimiento del Hogar",categoryId:"",customId:8 },
    { name: "Cocina Internacional", categoryId:"" ,customId:9},
    { name: "Reposteria",categoryId:"",customId:9},
    { name: "Enologia", categoryId:"",customId:9},
    { name: "Diseno de Moda",categoryId:"" ,customId:10},
    { name: "Maquillaje", categoryId:"" ,customId:10},
    { name: "Estilismo", categoryId:"" ,customId:10}
  ];

export const addCategories = async (categories:{name:string,customId:number}[]) => {

    try {
        const addArray = categories.map(category => {
            return Category.create(category)
        })
        
        await Promise.allSettled(addArray);
        console.log(addArray);
        return "Carga completa"
    } catch (error) {
        console.log(error);
        
    }
}


export const addSpecialties = async (specialties:{name:string,categoryId:string,customId:number}[]) => {
    try {
        const categories = await Category.find();  
        const newArray = specialties.map(specialty => {
            for (let index = 0; index < categories.length; index++) {
                if(specialty.customId === categories[index].customId) {
                    specialty.categoryId = categories[index].id
                    return Specialty.create(specialty)
                }               
            }
        })
        await Promise.allSettled(newArray)
        console.log(newArray);  
        return "Seed completo"
    } catch (error) {
        console.log(error);
        
    }
}


