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
    avatar: "/man1.jpg",
    phoneNumber: "1234567891",
  },
  {
    name: "James Johnson",
    email: "james.johnson@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and route exploration. Interested in learning landscape photography.",
    avatar: "/man2.jpg",
    phoneNumber: "1234567892",
  },
  {
    name: "Emma Williams",
    email: "emma.williams@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach international cuisine and want to learn foreign languages.",
    avatar: "/woman1.jpg",
    phoneNumber: "1234567893",
  },
  {
    name: "David Brown",
    email: "david.brown@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach football and game strategies. Learning football history.",
    avatar: "/man3.jpg",
    phoneNumber: "1234567894",
  },
  {
    name: "Sophia Miller",
    email: "sophia.miller@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach painting and crafts. Looking to learn graphic design.",
    avatar: "/woman2.jpg",
    phoneNumber: "1234567895",
  },
  {
    name: "Matthew Wilson",
    email: "matthew.wilson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach urban photography. Interested in learning art history.",
    avatar: "/man4.jpg",
    phoneNumber: "1234567896",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.martinez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach yoga and meditation. Learning about nutrition and dietetics.",
    avatar: "/woman3.jpg",
    phoneNumber: "1234567897",
  },
  {
    name: "William Anderson",
    email: "william.anderson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach classic cinema. Want to learn about jazz history.",
    avatar: "/man5.jpg",
    phoneNumber: "1234567898",
  },
  {
    name: "Isabella Taylor",
    email: "isabella.taylor@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach extreme sports. Interested in survival techniques.",
    avatar: "/woman4.jpg",
    phoneNumber: "1234567899",
  },
  {
    name: "Benjamin Thomas",
    email: "benjamin.thomas@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening. Learning about exotic plant cultivation.",
    avatar: "/man6.jpg",
    phoneNumber: "2345678910",
  },
  {
    name: "Ava Jackson",
    email: "ava.jackson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach guitar playing and want to learn musical composition.",
    avatar: "/woman5.jpg",
    phoneNumber: "2345678911",
  },
  {
    name: "Liam White",
    email: "liam.white@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach chess and want to learn new board games.",
    avatar: "/man7.jpg",
    phoneNumber: "2345678912",
  },
  {
    name: "Mia Harris",
    email: "mia.harris@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach poetry writing and want to learn short story writing.",
    avatar: "/woman6.jpg",
    phoneNumber: "2345678913",
  },
  {
    name: "Elijah Martin",
    email: "elijah.martin@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach animal care and want to learn training techniques.",
    avatar: "/man8.jpg",
    phoneNumber: "2345678914",
  },
  {
    name: "Charlotte Lee",
    email: "charlotte.lee@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach vegan cooking and want to learn healthy nutrition.",
    avatar: "/woman7.jpg",
    phoneNumber: "2345678915",
  },
  {
    name: "Oliver Hall",
    email: "oliver.hall@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach video games and eSports and want to learn game programming.",
    avatar: "/man9.jpg",
    phoneNumber: "2345678916",
  },
  {
    name: "Amelia Allen",
    email: "amelia.allen@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach fashion design and want to learn pattern making and sewing.",
    avatar: "/woman8.jpg",
    phoneNumber: "2345678917",
  },
  {
    name: "James Young",
    email: "james.young@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach hiking and camping and want to learn orientation and survival.",
    avatar: "/man10.jpg",
    phoneNumber: "2345678918",
  },
  {
    name: "Harper King",
    email: "harper.king@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach travel photography and want to learn cultural documentation.",
    avatar: "/woman9.jpg",
    phoneNumber: "2345678919",
  },
  {
    name: "Henry Wright",
    email: "henry.wright@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach science fiction and want to learn creative writing.",
    avatar: "/man11.jpg",
    phoneNumber: "3456789120",
  },
  {
    name: "Evelyn Scott",
    email: "evelyn.scott@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach gardening and want to learn organic farming.",
    avatar: "/woman10.jpg",
    phoneNumber: "3456789121",
  },
  {
    name: "Michael Green",
    email: "michael.green@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach auteur cinema and want to learn documentary filmmaking.",
    avatar: "/man12.jpg",
    phoneNumber: "3456789122",
  },
  {
    name: "Abigail Adams",
    email: "abigail.adams@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach pet walking and want to learn dog training.",
    avatar: "/woman11.jpg",
    phoneNumber: "3456789123",
  },
  {
    name: "Alexander Nelson",
    email: "alexander.nelson@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach sport fishing and want to learn fishing techniques.",
    avatar: "/man13.jpg",
    phoneNumber: "3456789124",
  },
  {
    name: "Grace Carter",
    email: "grace.carter@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach contemporary art and want to learn painting techniques.",
    avatar: "/woman12.jpg",
    phoneNumber: "3456789125",
  },
  {
    name: "Daniel Baker",
    email: "daniel.baker@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach astronomy and want to learn star observation.",
    avatar: "/man14.jpg",
    phoneNumber: "3456789126",
  },
  {
    name: "Sofia Mitchell",
    email: "sofia.mitchell@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach nature photography and want to learn fauna exploration.",
    avatar: "/woman13.jpg",
    phoneNumber: "3456789127",
  },
  {
    name: "Jack Perez",
    email: "jack.perez@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach mountain biking and want to learn bicycle maintenance.",
    avatar: "/man15.jpg",
    phoneNumber: "3456789128",
  },
  {
    name: "Avery Roberts",
    email: "avery.roberts@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach home cooking and desserts and want to learn advanced baking.",
    avatar: "/woman14.jpg",
    phoneNumber: "3456789129",
  },
  {
    name: "Sebastian Collins",
    email: "sebastian.collins@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach environmental care and want to learn animal protection.",
    avatar: "/man16.jpg",
    phoneNumber: "4567891230",
  },
  {
    name: "Victoria Bennett",
    email: "victoria.bennett@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach independent cinema and want to learn scriptwriting.",
    avatar: "/woman15.jpg",
    phoneNumber: "4567891231",
  },
  {
    name: "Mason Ross",
    email: "mason.ross@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach water sports and want to learn surfing and windsurfing.",
    avatar: "/man17.jpg",
    phoneNumber: "4567891232",
  },
  {
    name: "Emily Kelly",
    email: "emily.kelly@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Flamenco dancing and want to learn Spanish guitar.",
    avatar: "/woman16.jpg",
    phoneNumber: "4567891233",
  },
  {
    name: "Ethan Turner",
    email: "ethan.turner@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Urban photography and want to learn Street art and graffiti.",
    avatar: "/man18.jpg",
    phoneNumber: "4567891234",
  },
  {
    name: "Chloe Morgan",
    email: "chloe.morgan@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Knitting and crochet and want to learn Pattern design.",
    avatar: "/woman17.jpg",
    phoneNumber: "4567891235",
  },
  {
    name: "Lucas Edwards",
    email: "lucas.edwards@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Public speaking and debate and want to learn Public speeches.",
    avatar: "/man19.jpg",
    phoneNumber: "4567891236",
  },
  {
    name: "Lily Cooper",
    email: "lily.cooper@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Classical music and want to learn Music composition.",
    avatar: "/woman18.jpg",
    phoneNumber: "4567891237",
  },
  {
    name: "Aiden Cox",
    email: "aiden.cox@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Role-playing games and want to learn Game design.",
    avatar: "/man20.jpg",
    phoneNumber: "4567891238",
  },
  {
    name: "Ella Clark",
    email: "ella.clark@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Climbing and mountaineering and want to learn Climbing techniques.",
    avatar: "/woman19.jpg",
    phoneNumber: "4567891239",
  },
  {
    name: "Caleb Ramirez",
    email: "caleb.ramirez@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Alternative medicine and want to learn Holistic therapies.",
    avatar: "/man21.jpg",
    phoneNumber: "4567891240",
  },
  {
    name: "Hannah Reed",
    email: "hannah.reed@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Household economics and want to learn Investment and finance.",
    avatar: "/woman20.jpg",
    phoneNumber: "4567891241",
  },
  {
    name: "Isaac Ward",
    email: "isaac.ward@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach International cuisine and want to learn Local gastronomy.",
    avatar: "/man22.jpg",
    phoneNumber: "4567891242",
  },
  {
    name: "Aria Barnes",
    email: "aria.barnes@gmail.com",
    password: "Javier.milei777",
    aboutme: "I teach Carpentry and want to learn Furniture restoration.",
    avatar: "/woman21.jpg",
    phoneNumber: "4567891243",
  },
  {
    name: "Gabriel Russell",
    email: "gabriel.russell@gmail.com",
    password: "Javier.milei777",
    aboutme:
      "I teach Yoga and meditation and want to learn Relaxation techniques.",
    avatar: "/man23.jpg",
    phoneNumber: "4567891244",
  },
];
