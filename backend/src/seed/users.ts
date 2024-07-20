/** @format */

import { Types } from "mongoose";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";

export interface IUserSeed {
  name: string;
  email: string;
  password: string;
  specialties?: specialty[];
  interests?: specialty[];
  avatar: string;
  aboutme?: string;
  phoneNumber?: string;
}

export type specialty = {
  categoryId: Types.ObjectId;
  specialtyId: Types.ObjectId;
};

// funcion para hashear las contraseñas
export async function hashAllPasswords(
  users: IUserSeed[]
): Promise<IUserSeed[]> {
  const updatedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      return { ...user, password: hashedPassword };
    })
  );
  return updatedUsers;
}

// funcion para asignar especialidades e intereses a cada usuario
export function assignSpecialtiesAndInterests(
  users: IUserSeed[],
  allSpecialties: specialty[]
): IUserSeed[] {
  return users.map((user) => {
    // Generar números aleatorios para la cantidad de specialties
    // e interests para añadir al usuario de la iteración actual
    const numSpecialties: number = Math.floor(Math.random() * 5) + 1;
    const numInterests: number = Math.floor(Math.random() * 5) + 1;

    // Se mezcla el array de especialidades
    const shuffledSpecialties: specialty[] = [...allSpecialties].sort(
      () => 0.5 - Math.random()
    );

    // Y se asignan los primeros specialties
    const specialties: specialty[] = shuffledSpecialties.slice(
      0,
      numSpecialties
    );

    // Asignar interests (excluyendo las especialidades ya asignadas)
    const remainingSpecialties = shuffledSpecialties.filter(
      (spec) => !specialties.some((s) => s.specialtyId === spec.specialtyId)
    );
    const interests = remainingSpecialties.slice(0, numInterests);

    return {
      ...user,
      specialties,
      interests,
    };
  });
}

// export const users: IUserSeed[] = [
//     {
//         name: 'Catriel Milei',
//         email: 'catrielmilei@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionado a la lectura y amante de los gatos.',
//         phoneNumber: '1234567891'
//     },
//     {
//         name: 'Lorenzo Dominguez',
//         email: 'lorenzo.dominguez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta de las caminatas al aire libre y el senderismo.',
//         phoneNumber: '1234567892'
//     },
//     {
//         name: 'Juliana Ortiz',
//         email: 'juliana.ortiz@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Apasionada por la cocina y los viajes.',
//         phoneNumber: '1234567893'
//     },
//     {
//         name: 'Santiago Perez',
//         email: 'santiago.perez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Fanático del fútbol y coleccionista de camisetas.',
//         phoneNumber: '1234567894'
//     },
//     {
//         name: 'Camila Gomez',
//         email: 'camila.gomez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le encanta pintar y hacer manualidades.',
//         phoneNumber: '1234567895'
//     },
//     {
//         name: 'Mateo Fernandez',
//         email: 'mateo.fernandez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionado a la fotografía y explorador urbano.',
//         phoneNumber: '1234567896'
//     },
//     {
//         name: 'Victoria Martinez',
//         email: 'victoria.martinez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta practicar yoga y meditar.',
//         phoneNumber: '1234567897'
//     },
//     {
//         name: 'Lucas Lopez',
//         email: 'lucas.lopez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Entusiasta del cine clásico y la música jazz.',
//         phoneNumber: '1234567898'
//     },
//     {
//         name: 'Martina Diaz',
//         email: 'martina.diaz@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aventurera y amante de los deportes extremos.',
//         phoneNumber: '1234567899'
//     },
//     {
//         name: 'Benjamín Silva',
//         email: 'benjamin.silva@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Apasionado por la jardinería y las plantas.',
//         phoneNumber: '2345678910'
//     },
//     {
//         name: 'Sofía Morales',
//         email: 'sofia.morales@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le encanta tocar la guitarra y componer canciones.',
//         phoneNumber: '2345678911'
//     },
//     {
//         name: 'Daniel Torres',
//         email: 'daniel.torres@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionado al ajedrez y los juegos de mesa.',
//         phoneNumber: '2345678912'
//     },
//     {
//         name: 'Elena Castro',
//         email: 'elena.castro@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta escribir poesía y relatos cortos.',
//         phoneNumber: '2345678913'
//     },
//     {
//         name: 'Emilio Ramos',
//         email: 'emilio.ramos@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Amante de los animales y voluntario en refugios.',
//         phoneNumber: '2345678914'
//     },
//     {
//         name: 'Carla Cruz',
//         email: 'carla.cruz@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta de la cocina vegana y la alimentación saludable.',
//         phoneNumber: '2345678915'
//     },
//     {
//         name: 'Joaquín Reyes',
//         email: 'joaquin.reyes@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Fanático de los videojuegos y los eSports.',
//         phoneNumber: '2345678916'
//     },
//     {
//         name: 'Paula Ruiz',
//         email: 'paula.ruiz@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionada a la moda y el diseño de ropa.',
//         phoneNumber: '2345678917'
//     },
//     {
//         name: 'Bruno Delgado',
//         email: 'bruno.delgado@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le encanta hacer senderismo y acampar.',
//         phoneNumber: '2345678918'
//     },
//     {
//         name: 'Lucía Hernández',
//         email: 'lucia.hernandez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Entusiasta de la fotografía y los viajes.',
//         phoneNumber: '2345678919'
//     },
//     {
//         name: 'Hugo Gutierrez',
//         email: 'hugo.gutierrez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionado a la lectura de ciencia ficción.',
//         phoneNumber: '3456789120'
//     },
//     {
//         name: 'Irene Vargas',
//         email: 'irene.vargas@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta la jardinería y cultivar sus propias verduras.',
//         phoneNumber: '3456789121'
//     },
//     {
//         name: 'Felipe Mendoza',
//         email: 'felipe.mendoza@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta del cine de autor y los documentales.',
//         phoneNumber: '3456789122'
//     },
//     {
//         name: 'Valentina Castro',
//         email: 'valentina.castro@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Amante de los perros y paseadora de mascotas.',
//         phoneNumber: '3456789123'
//     },
//     {
//         name: 'Tomás Blanco',
//         email: 'tomas.blanco@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionado a la pesca y la vida al aire libre.',
//         phoneNumber: '3456789124'
//     },
//     {
//         name: 'Alicia Ortega',
//         email: 'alicia.ortega@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta de la pintura y el arte contemporáneo.',
//         phoneNumber: '3456789125'
//     },
//     {
//         name: 'Rodrigo Navarro',
//         email: 'rodrigo.navarro@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta la astronomía y observar las estrellas.',
//         phoneNumber: '3456789126'
//     },
//     {
//         name: 'Carolina Vega',
//         email: 'carolina.vega@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Entusiasta de la fotografía y la naturaleza.',
//         phoneNumber: '3456789127'
//     },
//     {
//         name: 'Ignacio Campos',
//         email: 'ignacio.campos@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le encanta el ciclismo de montaña y la aventura.',
//         phoneNumber: '3456789128'
//     },
//     {
//         name: 'Isabel Romero',
//         email: 'isabel.romero@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionada a la cocina y los postres caseros.',
//         phoneNumber: '3456789129'
//     },
//     {
//         name: 'Ricardo Salazar',
//         email: 'ricardo.salazar@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Amante de los animales y defensor del medio ambiente.',
//         phoneNumber: '4567891230'
//     },
//     {
//         name: 'Emma Cordero',
//         email: 'emma.cordero@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Apasionada por el cine independiente y la lectura.',
//         phoneNumber: '4567891231'
//     },
//     {
//         name: 'Fernando López',
//         email: 'fernando.lopez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta de los deportes acuáticos y la playa.',
//         phoneNumber: '4567891232'
//     },
//     {
//         name: 'Natalia Santos',
//         email: 'natalia.santos@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta el yoga y la meditación.',
//         phoneNumber: '4567891233'
//     },
//     {
//         name: 'Alejandro Gómez',
//         email: 'alejandro.gomez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Fanático del cine de ciencia ficción y los videojuegos.',
//         phoneNumber: '4567891234'
//     },
//     {
//         name: 'Lorena Aguirre',
//         email: 'lorena.aguirre@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Amante de la naturaleza y el senderismo.',
//         phoneNumber: '4567891235'
//     },
//     {
//         name: 'Gabriel Soto',
//         email: 'gabriel.soto@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Disfruta de la jardinería y el cultivo de plantas.',
//         phoneNumber: '5678912340'
//     },
//     {
//         name: 'Marta Fernández',
//         email: 'marta.fernandez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Aficionada a los viajes y las culturas internacionales.',
//         phoneNumber: '5678912341'
//     },
//     {
//         name: 'Rafael Herrera',
//         email: 'rafael.herrera@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le gusta tocar el violonchelo y la música clásica.',
//         phoneNumber: '5678912342'
//     },
//     {
//         name: 'Claudia Ramírez',
//         email: 'claudia.ramirez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Apasionada por la fotografía y la vida urbana.',
//         phoneNumber: '5678912343'
//     },
//     {
//         name: 'Mario Vargas',
//         email: 'mario.vargas@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Le encanta la lectura de novelas históricas.',
//         phoneNumber: '5678912344'
//     },
//     {
//         name: 'Carolina Mendez',
//         email: 'carolina.mendez@gmail.com',
//         password: 'Javier.milei777',
//         description: 'Amante de los animales y de los paseos al aire libre.',
//         phoneNumber: '5678912345'
//     }
// ];

export const users: IUserSeed[] = [
  {
    name: "Catriel Milei",
    email: "catrielmilei@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach advanced reading and cat care. Looking to learn relaxation techniques and mindfulness.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567891",
  },
  {
    name: "Lorenzo Dominguez",
    email: "lorenzo.dominguez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and route exploration. Interested in learning landscape photography.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567892",
  },
  {
    name: "Juliana Ortiz",
    email: "juliana.ortiz@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach international cuisine and want to learn foreign languages.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567893",
  },
  {
    name: "Santiago Perez",
    email: "santiago.perez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach football and game strategies. Learning football history.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567894",
  },
  {
    name: "Camila Gomez",
    email: "camila.gomez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach painting and crafts. Looking to learn graphic design.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567895",
  },
  {
    name: "Mateo Fernandez",
    email: "mateo.fernandez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach urban photography. Interested in learning art history.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567896",
  },
  {
    name: "Victoria Martinez",
    email: "victoria.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach yoga and meditation. Learning about nutrition and dietetics.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567897",
  },
  {
    name: "Lucas Lopez",
    email: "lucas.lopez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach classic cinema. Want to learn about jazz history.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567898",
  },
  {
    name: "Martina Diaz",
    email: "martina.diaz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach extreme sports. Interested in survival techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "1234567899",
  },
  {
    name: "Benjamín Silva",
    email: "benjamin.silva@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening. Learning about exotic plant cultivation.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678910",
  },
  {
    name: "Sofía Morales",
    email: "sofia.morales@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach guitar playing and want to learn musical composition.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678911",
  },
  {
    name: "Daniel Torres",
    email: "daniel.torres@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach chess and want to learn new board games.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678912",
  },
  {
    name: "Elena Castro",
    email: "elena.castro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach poetry writing and want to learn short story writing.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678913",
  },
  {
    name: "Emilio Ramos",
    email: "emilio.ramos@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach animal care and want to learn training techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678914",
  },
  {
    name: "Carla Cruz",
    email: "carla.cruz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach vegan cooking and want to learn healthy nutrition.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678915",
  },
  {
    name: "Joaquín Reyes",
    email: "joaquin.reyes@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach video games and eSports and want to learn game programming.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678916",
  },
  {
    name: "Paula Ruiz",
    email: "paula.ruiz@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach fashion design and want to learn pattern making and sewing.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678917",
  },
  {
    name: "Bruno Delgado",
    email: "bruno.delgado@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and camping and want to learn orientation and survival.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678918",
  },
  {
    name: "Lucía Hernández",
    email: "lucia.hernandez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach travel photography and want to learn cultural documentation.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "2345678919",
  },
  {
    name: "Hugo Gutierrez",
    email: "hugo.gutierrez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach science fiction and want to learn creative writing.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789120",
  },
  {
    name: "Irene Vargas",
    email: "irene.vargas@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening and want to learn organic farming.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789121",
  },
  {
    name: "Felipe Mendoza",
    email: "felipe.mendoza@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach auteur cinema and want to learn documentary filmmaking.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789122",
  },
  {
    name: "Valentina Castro",
    email: "valentina.castro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach pet walking and want to learn dog training.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789123",
  },
  {
    name: "Tomás Blanco",
    email: "tomas.blanco@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach sport fishing and want to learn fishing techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789124",
  },
  {
    name: "Alicia Ortega",
    email: "alicia.ortega@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach contemporary art and want to learn painting techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789125",
  },
  {
    name: "Rodrigo Navarro",
    email: "rodrigo.navarro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach astronomy and want to learn star observation.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789126",
  },
  {
    name: "Carolina Vega",
    email: "carolina.vega@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach nature photography and want to learn fauna exploration.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789127",
  },
  {
    name: "Ignacio Campos",
    email: "ignacio.campos@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach mountain biking and want to learn bicycle maintenance.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789128",
  },
  {
    name: "Isabel Romero",
    email: "isabel.romero@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach home cooking and desserts and want to learn advanced baking.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "3456789129",
  },
  {
    name: "Ricardo Salazar",
    email: "ricardo.salazar@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach environmental care and want to learn animal protection.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891230",
  },
  {
    name: "Emma Cordero",
    email: "emma.cordero@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach independent cinema and want to learn scriptwriting.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891231",
  },
  {
    name: "Fernando López",
    email: "fernando.lopez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach water sports and want to learn surfing and windsurfing.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891232",
  },
  {
    name: "Ana Morales",
    email: "ana.morales@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Flamenco dancing and want to learn Spanish guitar.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891233",
  },
  {
    name: "Luis Pérez",
    email: "luis.perez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Urban photography and want to learn Street art and graffiti.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891234",
  },
  {
    name: "María Flores",
    email: "maria.flores@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Knitting and crochet and want to learn Pattern design.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891235",
  },
  {
    name: "Gonzalo Núñez",
    email: "gonzalo.nunez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Public speaking and debate and want to learn Public speeches.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891236",
  },
  {
    name: "Clara Garrido",
    email: "clara.garrido@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Classical music and want to learn Music composition.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891237",
  },
  {
    name: "Esteban Martínez",
    email: "esteban.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Role-playing games and want to learn Game design.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891238",
  },
  {
    name: "Laura Gómez",
    email: "laura.gomez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Climbing and mountaineering and want to learn Climbing techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891239",
  },
  {
    name: "Cristina Rivas",
    email: "cristina.rivas@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Alternative medicine and want to learn Holistic therapies.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891240",
  },
  {
    name: "Francisco Rivera",
    email: "francisco.rivera@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Household economics and want to learn Investment and finance.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891241",
  },
  {
    name: "Andrea Aguilar",
    email: "andrea.aguilar@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach International cuisine and want to learn Local gastronomy.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891242",
  },
  {
    name: "Martín Sanz",
    email: "martin.sanz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Carpentry and want to learn Furniture restoration.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891243",
  },
  {
    name: "Julieta Vidal",
    email: "julieta.vidal@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Yoga and meditation and want to learn Relaxation techniques.",
    avatar: "/JavierMilei.jpg",
    phoneNumber: "4567891244",
  },
];
