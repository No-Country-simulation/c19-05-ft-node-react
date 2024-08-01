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
    name: "John Smith",
    email: "john.smith@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach advanced reading and cat care. Looking to learn relaxation techniques and mindfulness.",
    avatar: "/avatar/man.1.webp",
    phoneNumber: "1234567891",
  },
  {
    name: "James Johnson",
    email: "james.johnson@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and route exploration. Interested in learning landscape photography.",
    avatar: "/avatar/man.2.webp",
    phoneNumber: "1234567892",
  },
  {
    name: "Emma Williams",
    email: "emma.williams@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach international cuisine and want to learn foreign languages.",
    avatar: "/avatar/woman.1.webp",
    phoneNumber: "1234567893",
  },
  {
    name: "David Brown",
    email: "david.brown@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach football and game strategies. Learning football history.",
    avatar: "/avatar/man.3.webp",
    phoneNumber: "1234567894",
  },
  {
    name: "Sophia Miller",
    email: "sophia.miller@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach painting and crafts. Looking to learn graphic design.",
    avatar: "/avatar/woman.2.webp",
    phoneNumber: "1234567895",
  },
  {
    name: "Matthew Wilson",
    email: "matthew.wilson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach urban photography. Interested in learning art history.",
    avatar: "/avatar/man.4.webp",
    phoneNumber: "1234567896",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach yoga and meditation. Learning about nutrition and dietetics.",
    avatar: "/avatar/woman.3.webp",
    phoneNumber: "1234567897",
  },
  {
    name: "William Anderson",
    email: "william.anderson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach classic cinema. Want to learn about jazz history.",
    avatar: "/avatar/man.5.webp",
    phoneNumber: "1234567898",
  },
  {
    name: "Isabella Taylor",
    email: "isabella.taylor@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach extreme sports. Interested in survival techniques.",
    avatar: "/avatar/woman.4.webp",
    phoneNumber: "1234567899",
  },
  {
    name: "Benjamin Thomas",
    email: "benjamin.thomas@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening. Learning about exotic plant cultivation.",
    avatar: "/avatar/man.1.webp",
    phoneNumber: "2345678910",
  },
  {
    name: "Ava Jackson",
    email: "ava.jackson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach guitar playing and want to learn musical composition.",
    avatar: "/avatar/woman.5.webp",
    phoneNumber: "2345678911",
  },
  {
    name: "Liam White",
    email: "liam.white@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach chess and want to learn new board games.",
    avatar: "/avatar/man.1.webp",
    phoneNumber: "2345678912",
  },
  {
    name: "Mia Harris",
    email: "mia.harris@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach poetry writing and want to learn short story writing.",
    avatar: "/avatar/woman.6.webp",
    phoneNumber: "2345678913",
  },
  {
    name: "Javier Milei",
    email: "javier.milei@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach economy science and want to learn how to speak with dogs.",
    avatar: "/avatar/man.6.webp",
    phoneNumber: "2345678914",
  },
  {
    name: "Charlotte Lee",
    email: "charlotte.lee@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach vegan cooking and want to learn healthy nutrition.",
    avatar: "/avatar/woman.1.webp",
    phoneNumber: "2345678915",
  },
  {
    name: "Oliver Hall",
    email: "oliver.hall@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach video games and eSports and want to learn game programming.",
    avatar: "/avatar/man.1.webp",
    phoneNumber: "2345678916",
  },
  {
    name: "Amelia Allen",
    email: "amelia.allen@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach fashion design and want to learn pattern making and sewing.",
    avatar: "/avatar/woman.2.webp",
    phoneNumber: "2345678917",
  },
  {
    name: "James Young",
    email: "james.young@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and camping and want to learn orientation and survival.",
    avatar: "/avatar/man.2.webp",
    phoneNumber: "2345678918",
  },
  {
    name: "Harper King",
    email: "harper.king@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach travel photography and want to learn cultural documentation.",
    avatar: "/avatar/woman.3.webp",
    phoneNumber: "2345678919",
  },
  {
    name: "Henry Wright",
    email: "henry.wright@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach science fiction and want to learn creative writing.",
    avatar: "/avatar/man.3.webp",
    phoneNumber: "3456789120",
  },
  {
    name: "Evelyn Scott",
    email: "evelyn.scott@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening and want to learn organic farming.",
    avatar: "/avatar/woman.4.webp",
    phoneNumber: "3456789121",
  },
  {
    name: "Michael Green",
    email: "michael.green@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach auteur cinema and want to learn documentary filmmaking.",
    avatar: "/avatar/man.4.webp",
    phoneNumber: "3456789122",
  },
  {
    name: "Abigail Adams",
    email: "abigail.adams@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach pet walking and want to learn dog training.",
    avatar: "/avatar/woman.6.webp",
    phoneNumber: "3456789123",
  },
  {
    name: "Alexander Nelson",
    email: "alexander.nelson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach sport fishing and want to learn fishing techniques.",
    avatar: "/avatar/man.1.webp",
    phoneNumber: "3456789124",
  },
  {
    name: "Grace Carter",
    email: "grace.carter@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach contemporary art and want to learn painting techniques.",
    avatar: "/avatar/woman.1.webp",
    phoneNumber: "3456789125",
  },
  {
    name: "Daniel Baker",
    email: "daniel.baker@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach astronomy and want to learn star observation.",
    avatar: "/avatar/man.2.webp",
    phoneNumber: "3456789126",
  },
  {
    name: "Sofia Mitchell",
    email: "sofia.mitchell@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach nature photography and want to learn fauna exploration.",
    avatar: "/avatar/woman.2.webp",
    phoneNumber: "3456789127",
  },
  {
    name: "Jack Perez",
    email: "jack.perez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach mountain biking and want to learn bicycle maintenance.",
    avatar: "/avatar/man.3.webp",
    phoneNumber: "3456789128",
  },
  {
    name: "Avery Roberts",
    email: "avery.roberts@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach home cooking and desserts and want to learn advanced baking.",
    avatar: "/avatar/woman.3.webp",
    phoneNumber: "3456789129",
  },
  {
    name: "Sebastian Collins",
    email: "sebastian.collins@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach environmental care and want to learn animal protection.",
    avatar: "/avatar/man.4.webp",
    phoneNumber: "4567891230",
  },
];
