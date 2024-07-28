//! LOGIN
export interface Respuesta {
  status: string;
  payload: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  banner: string;
  password: string;
  aboutme: string;
  phoneNumber: string;
  trades: string[];
  contacts: string[];
  specialties: InterestPopulated[];
  interests: InterestPopulated[];
  userRatings: userRating[];
  __v: number;
}

export interface InterestData {
  _id: string;
  name: string;
}
export interface InterestPopulated {
  categoryId: InterestData;
  specialtyId: InterestData;
  _id: string;
}

const numberEnum = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
} as const;

export type enumType = (typeof numberEnum)[keyof typeof numberEnum];

export type userRatingUserId = {
  _id: string;
  name: string;
  avatar: string;
};

export type userRating = {
  userId: userRatingUserId;
  tradeId: string;
  comment: string;
  rating: enumType;
};

//! TYPES GET USERS
export interface ResponseGetUsers {
  status: string;
  payload: GetUsers;
}

export interface GetUsers extends Paginate {
  docs: GetUser[];
}

export interface Paginate {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type GetUser = Pick<
  User,
  | 'aboutme'
  | 'avatar'
  | 'name'
  | 'userRatings'
  | 'specialties'
  | 'interests'
  | '_id'
> & {
  specialties: InterestPopulated[];
  interests: InterestPopulated[];
};

//? TYPES GET USER BY ID

export interface ResponseGetUserById {
  status: string;
  payload: GetUserById;
}

export interface GetUserById {
  name: string;
  aboutme: string;
  avatar: string;
  banner: string;
  specialties: InterestPopulated[];
  interests: InterestPopulated[];
  userRatings: userRating[];
  trades: null;
  phoneNumber: null | string;
  email: null | string;
  isOwnProfile: boolean;
}

//! UPDATE TYPES

export interface UpdateData {
  name: string;
  aboutme: string;
  phoneNumber: string;
  specialties: Interest[];
  interests: Interest[];
}

export interface Aboutme {
  teach: string;
  learn: string;
}

export interface Interest {
  categoryId: string;
  specialtyId: string;
}

// UPDATE RESPONSE

export interface ResponseUpdate {
  status: string;
  payload: PayloadUpdate;
}

export interface PayloadUpdate {
  avatar: string;
  banner: string;
  aboutme: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  trades: string[];
  contacts: string[];
  specialties: Interest[];
  interests: Interest[];
  userRatings: userRating[];
  __v: number;
}

// RECOMMENDED USERS TYPES
export interface ResponseGetRecommendedUsers {
  status: string;
  numberOfRecommendations: number;
  payload: Matchings[];
}

export interface Matchings {
  _id: string;
  name: string;
  matchingSpecialties: Interest[];
  matchingInterests: Interest[];
}
export interface ResponseUserRating {
  status: string;
  payload: string;
}
