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

export const users: IUserSeed[] = [
  {
    name: "Catriel Milei",
    email: "catrielmilei@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach advanced reading and cat care. Looking to learn relaxation techniques and mindfulness.",
    avatar: "/gallery6.jpg",
    phoneNumber: "1234567891",
  },
  {
    name: "Lorenzo Dominguez",
    email: "lorenzo.dominguez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and route exploration. Interested in learning landscape photography.",
    avatar: "/gallery16.jpg",
    phoneNumber: "1234567892",
  },
  {
    name: "Juliana Ortiz",
    email: "juliana.ortiz@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach international cuisine and want to learn foreign languages.",
    avatar: "/gallery4.jpg",
    phoneNumber: "1234567893",
  },
  {
    name: "Santiago Perez",
    email: "santiago.perez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach football and game strategies. Learning football history.",
    avatar: "/gallery10.jpg",
    phoneNumber: "1234567894",
  },
  {
    name: "Camila Gomez",
    email: "camila.gomez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach painting and crafts. Looking to learn graphic design.",
    avatar: "/gallery9.jpng",
    phoneNumber: "1234567895",
  },
  {
    name: "Mateo Fernandez",
    email: "mateo.fernandez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach urban photography. Interested in learning art history.",
    avatar: "/gallery1.jpg",
    phoneNumber: "1234567896",
  },
  {
    name: "Victoria Martinez",
    email: "victoria.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach yoga and meditation. Learning about nutrition and dietetics.",
    avatar: "/gallery11.jpg",
    phoneNumber: "1234567897",
  },
  {
    name: "Lucas Lopez",
    email: "lucas.lopez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach classic cinema. Want to learn about jazz history.",
    avatar: "/gallery8.jpg",
    phoneNumber: "1234567898",
  },
  {
    name: "Martina Diaz",
    email: "martina.diaz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach extreme sports. Interested in survival techniques.",
    avatar: "/gallery12.jpg",
    phoneNumber: "1234567899",
  },
  {
    name: "Benjamín Silva",
    email: "benjamin.silva@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening. Learning about exotic plant cultivation.",
    avatar: "/gallery5.jpg",
    phoneNumber: "2345678910",
  },
  {
    name: "Sofía Morales",
    email: "sofia.morales@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach guitar playing and want to learn musical composition.",
    avatar: "/gallery13.jpg",
    phoneNumber: "2345678911",
  },
  {
    name: "Daniel Torres",
    email: "daniel.torres@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach chess and want to learn new board games.",
    avatar: "/gallery15.jpg",
    phoneNumber: "2345678912",
  },
  {
    name: "Elena Castro",
    email: "elena.castro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach poetry writing and want to learn short story writing.",
    avatar: "/gallery4.jpg",
    phoneNumber: "2345678913",
  },
  {
    name: "Emilio Ramos",
    email: "emilio.ramos@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach animal care and want to learn training techniques.",
    avatar: "/gallery16.jpg",
    phoneNumber: "2345678914",
  },
  {
    name: "Carla Cruz",
    email: "carla.cruz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach vegan cooking and want to learn healthy nutrition.",
    avatar: "/gallery7.jpg",
    phoneNumber: "2345678915",
  },
  {
    name: "Joaquín Reyes",
    email: "joaquin.reyes@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach video games and eSports and want to learn game programming.",
    avatar: "/gallery1.jpg",
    phoneNumber: "2345678916",
  },
  {
    name: "Paula Ruiz",
    email: "paula.ruiz@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach fashion design and want to learn pattern making and sewing.",
    avatar: "/gallery2.jpg",
    phoneNumber: "2345678917",
  },
  {
    name: "Bruno Delgado",
    email: "bruno.delgado@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and camping and want to learn orientation and survival.",
    avatar: "/gallery6.jpg",
    phoneNumber: "2345678918",
  },
  {
    name: "Lucía Hernández",
    email: "lucia.hernandez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach travel photography and want to learn cultural documentation.",
    avatar: "/gallery3.jpg",
    phoneNumber: "2345678919",
  },
  {
    name: "Hugo Gutierrez",
    email: "hugo.gutierrez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach science fiction and want to learn creative writing.",
    avatar: "/gallery8.jpg",
    phoneNumber: "3456789120",
  },
  {
    name: "Irene Vargas",
    email: "irene.vargas@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening and want to learn organic farming.",
    avatar: "/gallery4.jpg",
    phoneNumber: "3456789121",
  },
  {
    name: "Felipe Mendoza",
    email: "felipe.mendoza@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach auteur cinema and want to learn documentary filmmaking.",
    avatar: "/gallery10.jpg",
    phoneNumber: "3456789122",
  },
  {
    name: "Valentina Castro",
    email: "valentina.castro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach pet walking and want to learn dog training.",
    avatar: "/gallery7.jpg",
    phoneNumber: "3456789123",
  },
  {
    name: "Tomás Blanco",
    email: "tomas.blanco@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach sport fishing and want to learn fishing techniques.",
    avatar: "/gallery14.jpg",
    phoneNumber: "3456789124",
  },
  {
    name: "Alicia Ortega",
    email: "alicia.ortega@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach contemporary art and want to learn painting techniques.",
    avatar: "/gallery9.jpg",
    phoneNumber: "3456789125",
  },
  {
    name: "Rodrigo Navarro",
    email: "rodrigo.navarro@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach astronomy and want to learn star observation.",
    avatar: "/gallery15.jpg",
    phoneNumber: "3456789126",
  },
  {
    name: "Carolina Vega",
    email: "carolina.vega@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach nature photography and want to learn fauna exploration.",
    avatar: "/gallery11.jpg",
    phoneNumber: "3456789127",
  },
  {
    name: "Ignacio Campos",
    email: "ignacio.campos@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach mountain biking and want to learn bicycle maintenance.",
    avatar: "/gallery16.jpg",
    phoneNumber: "3456789128",
  },
  {
    name: "Isabel Romero",
    email: "isabel.romero@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach home cooking and desserts and want to learn advanced baking.",
    avatar: "/gallery12.jpg",
    phoneNumber: "3456789129",
  },
  {
    name: "Ricardo Salazar",
    email: "ricardo.salazar@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach environmental care and want to learn animal protection.",
    avatar: "/gallery1.jpg",
    phoneNumber: "4567891230",
  },
  {
    name: "Emma Cordero",
    email: "emma.cordero@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach independent cinema and want to learn scriptwriting.",
    avatar: "/gallery13.jpg",
    phoneNumber: "4567891231",
  },
  {
    name: "Fernando López",
    email: "fernando.lopez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach water sports and want to learn surfing and windsurfing.",
    avatar: "/gallery6.jpg",
    phoneNumber: "4567891232",
  },
  {
    name: "Ana Morales",
    email: "ana.morales@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Flamenco dancing and want to learn Spanish guitar.",
    avatar: "/gallery2.jpg",
    phoneNumber: "4567891233",
  },
  {
    name: "Luis Pérez",
    email: "luis.perez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Urban photography and want to learn Street art and graffiti.",
    avatar: "/gallery8.jpg",
    phoneNumber: "4567891234",
  },
  {
    name: "María Flores",
    email: "maria.flores@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Knitting and crochet and want to learn Pattern design.",
    avatar: "/gallery3.jpg",
    phoneNumber: "4567891235",
  },
  {
    name: "Gonzalo Núñez",
    email: "gonzalo.nunez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Public speaking and debate and want to learn Public speeches.",
    avatar: "/gallery14.jpg",
    phoneNumber: "4567891236",
  },
  {
    name: "Clara Garrido",
    email: "clara.garrido@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Classical music and want to learn Music composition.",
    avatar: "/gallery4.jpg",
    phoneNumber: "4567891237",
  },
  {
    name: "Esteban Martínez",
    email: "esteban.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Role-playing games and want to learn Game design.",
    avatar: "/gallery15.jpg",
    phoneNumber: "4567891238",
  },
  {
    name: "Laura Gómez",
    email: "laura.gomez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Climbing and mountaineering and want to learn Climbing techniques.",
    avatar: "/gallery5.jpg",
    phoneNumber: "4567891239",
  },
  {
    name: "Cristina Rivas",
    email: "cristina.rivas@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Alternative medicine and want to learn Holistic therapies.",
    avatar: "/gallery7.jpg",
    phoneNumber: "4567891240",
  },
  {
    name: "Francisco Rivera",
    email: "francisco.rivera@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Household economics and want to learn Investment and finance.",
    avatar: "/gallery16.jpg",
    phoneNumber: "4567891241",
  },
  {
    name: "Andrea Aguilar",
    email: "andrea.aguilar@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach International cuisine and want to learn Local gastronomy.",
    avatar: "/gallery9.jpg",
    phoneNumber: "4567891242",
  },
  {
    name: "Martín Sanz",
    email: "martin.sanz@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Carpentry and want to learn Furniture restoration.",
    avatar: "/gallery1.jpg",
    phoneNumber: "4567891243",
  },
  {
    name: "Julieta Vidal",
    email: "julieta.vidal@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Yoga and meditation and want to learn Relaxation techniques.",
    avatar: "/gallery11.jpg",
    phoneNumber: "4567891244",
  },
];
