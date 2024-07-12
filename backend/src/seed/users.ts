import mongoose, { Document, PaginateModel, PopulatedDoc, Schema, Types } from "mongoose"

interface IUser {
   name: string
   email: string
   password: string
   specialties?: specialty[]
   interests?: specialty[]
   description?: string
   phoneNumber?: string
}

export type specialty = {
   categoryId: Types.ObjectId
   specialtyId: Types.ObjectId
}

export const users: IUser[] = [
    {
        name: 'Catriel Milei',
        email: 'catrielmilei@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionado a la lectura y amante de los gatos.',
        phoneNumber: '1234567890'
    },
    {
        name: 'Lorenzo Dominguez',
        email: 'lorenzo.dominguez@gmail.com',
        password: 'Javier.milei777',
        description: 'Disfruta de las caminatas al aire libre y el senderismo.',
        phoneNumber: '2345678901'
    },
    {
        name: 'Juliana Ortiz',
        email: 'juliana.ortiz@gmail.com',
        password: 'Javier.milei777',
        description: 'Apasionada por la cocina y los viajes.',
        phoneNumber: '3456789012'
    },
    {
        name: 'Santiago Perez',
        email: 'santiago.perez@gmail.com',
        password: 'Javier.milei777',
        description: 'Fanático del fútbol y coleccionista de camisetas.',
        phoneNumber: '4567890123'
    },
    {
        name: 'Camila Gomez',
        email: 'camila.gomez@gmail.com',
        password: 'Javier.milei777',
        description: 'Le encanta pintar y hacer manualidades.',
        phoneNumber: '5678901234'
    },
    {
        name: 'Mateo Fernandez',
        email: 'mateo.fernandez@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionado a la fotografía y explorador urbano.',
        phoneNumber: '6789012345'
    },
    {
        name: 'Victoria Martinez',
        email: 'victoria.martinez@gmail.com',
        password: 'Javier.milei777',
        description: 'Le gusta practicar yoga y meditar.',
        phoneNumber: '7890123456'
    },
    {
        name: 'Lucas Lopez',
        email: 'lucas.lopez@gmail.com',
        password: 'Javier.milei777',
        description: 'Entusiasta del cine clásico y la música jazz.',
        phoneNumber: '8901234567'
    },
    {
        name: 'Martina Diaz',
        email: 'martina.diaz@gmail.com',
        password: 'Javier.milei777',
        description: 'Aventurera y amante de los deportes extremos.',
        phoneNumber: '9012345678'
    },
    {
        name: 'Benjamín Silva',
        email: 'benjamin.silva@gmail.com',
        password: 'Javier.milei777',
        description: 'Apasionado por la jardinería y las plantas.',
        phoneNumber: '0123456789'
    },
    {
        name: 'Sofía Morales',
        email: 'sofia.morales@gmail.com',
        password: 'Javier.milei777',
        description: 'Le encanta tocar la guitarra y componer canciones.',
        phoneNumber: '1234567890'
    },
    {
        name: 'Daniel Torres',
        email: 'daniel.torres@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionado al ajedrez y los juegos de mesa.',
        phoneNumber: '2345678901'
    },
    {
        name: 'Elena Castro',
        email: 'elena.castro@gmail.com',
        password: 'Javier.milei777',
        description: 'Le gusta escribir poesía y relatos cortos.',
        phoneNumber: '3456789012'
    },
    {
        name: 'Emilio Ramos',
        email: 'emilio.ramos@gmail.com',
        password: 'Javier.milei777',
        description: 'Amante de los animales y voluntario en refugios.',
        phoneNumber: '4567890123'
    },
    {
        name: 'Carla Cruz',
        email: 'carla.cruz@gmail.com',
        password: 'Javier.milei777',
        description: 'Disfruta de la cocina vegana y la alimentación saludable.',
        phoneNumber: '5678901234'
    },
    {
        name: 'Joaquín Reyes',
        email: 'joaquin.reyes@gmail.com',
        password: 'Javier.milei777',
        description: 'Fanático de los videojuegos y los eSports.',
        phoneNumber: '6789012345'
    },
    {
        name: 'Paula Ruiz',
        email: 'paula.ruiz@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionada a la moda y el diseño de ropa.',
        phoneNumber: '7890123456'
    },
    {
        name: 'Bruno Delgado',
        email: 'bruno.delgado@gmail.com',
        password: 'Javier.milei777',
        description: 'Le encanta hacer senderismo y acampar.',
        phoneNumber: '8901234567'
    },
    {
        name: 'Lucía Hernández',
        email: 'lucia.hernandez@gmail.com',
        password: 'Javier.milei777',
        description: 'Entusiasta de la fotografía y los viajes.',
        phoneNumber: '9012345678'
    },
    {
        name: 'Hugo Gutierrez',
        email: 'hugo.gutierrez@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionado a la lectura de ciencia ficción.',
        phoneNumber: '0123456789'
    },
    {
        name: 'Irene Vargas',
        email: 'irene.vargas@gmail.com',
        password: 'Javier.milei777',
        description: 'Le gusta la jardinería y cultivar sus propias verduras.',
        phoneNumber: '1234567890'
    },
    {
        name: 'Felipe Mendoza',
        email: 'felipe.mendoza@gmail.com',
        password: 'Javier.milei777',
        description: 'Disfruta del cine de autor y los documentales.',
        phoneNumber: '2345678901'
    },
    {
        name: 'Valentina Castro',
        email: 'valentina.castro@gmail.com',
        password: 'Javier.milei777',
        description: 'Amante de los perros y paseadora de mascotas.',
        phoneNumber: '3456789012'
    },
    {
        name: 'Tomás Blanco',
        email: 'tomas.blanco@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionado a la pesca y la vida al aire libre.',
        phoneNumber: '4567890123'
    },
    {
        name: 'Alicia Ortega',
        email: 'alicia.ortega@gmail.com',
        password: 'Javier.milei777',
        description: 'Disfruta de la pintura y el arte contemporáneo.',
        phoneNumber: '5678901234'
    },
    {
        name: 'Rodrigo Navarro',
        email: 'rodrigo.navarro@gmail.com',
        password: 'Javier.milei777',
        description: 'Le gusta la astronomía y observar las estrellas.',
        phoneNumber: '6789012345'
    },
    {
        name: 'Carolina Vega',
        email: 'carolina.vega@gmail.com',
        password: 'Javier.milei777',
        description: 'Entusiasta de la fotografía y la naturaleza.',
        phoneNumber: '7890123456'
    },
    {
        name: 'Ignacio Campos',
        email: 'ignacio.campos@gmail.com',
        password: 'Javier.milei777',
        description: 'Le encanta el ciclismo de montaña y la aventura.',
        phoneNumber: '8901234567'
    },
    {
        name: 'Isabel Romero',
        email: 'isabel.romero@gmail.com',
        password: 'Javier.milei777',
        description: 'Aficionada a la cocina y los postres caseros.',
        phoneNumber: '9012345678'
    },
    {
        name: 'Ricardo Salazar',
        email: 'ricardo.salazar@gmail.com',
        password: 'Javier.milei777',
        description: 'Amante de los animales y defensor del medio ambiente.',
        phoneNumber: '0123456789'
    }
];
