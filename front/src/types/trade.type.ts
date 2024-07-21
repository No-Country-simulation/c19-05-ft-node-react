export interface ResCRUDTrade {
  status: string;
  payload: TradeDetails;
}

export interface Trade {
  members: Members;
  duration: number;
  expiresAt: null;
  status: 'PENDING' | 'ACCEPTED' | 'FINISHED';
  _id: string;
  __v: number;
}

export interface Members {
  memberOne: Member;
  memberTwo: Member;
  _id: string;
}

export interface Member {
  id: string;
  specialty: string;
  hasRated: boolean;
}

export interface GetAllTrades {
  status: string;
  payload: TradeDetails[];
}

export interface ResTradeDetails {
  status: string;
  payload: TradeDetails;
}

export interface TradeDetails {
  chatRoom: string;
  _id: string;
  members: MembersTradeDetails;
  duration: number;
  expiresAt: string;
  status: string;
  __v: number;
}

export interface MembersTradeDetails {
  memberOne: MemberTradeDetails;
  memberTwo: MemberTradeDetails;
  _id: string;
}

export interface MemberTradeDetails {
  id: UserInfoTradeDetails;
  specialty: SpecialtyTradeDetails;
  hasRated: boolean;
}

export interface UserInfoTradeDetails {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface SpecialtyTradeDetails {
  _id: string;
  name: string;
}
