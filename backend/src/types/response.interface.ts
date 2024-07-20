import { IMessage } from "../models/Message";
import { ITrade } from "../models/Trade.model";
import { IUser } from "../models/User.model";

export interface response {
  status: boolean;
  payload:
    | IUser
    | string
    | []
    | Partial<IUser>
    | ITrade
    | ITrade[]
    | IMessage
    | IMessage[]
    | any;
}

export interface TopLevel {
  status: boolean;
  payload: Payload;
}

export interface Payload {
  name: string;
  email: string;
  password: string;
  contacts: any[];
  _id: string;
  __v: number;
}
