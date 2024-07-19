export interface ResCRUTrade {
  status: string;
  payload: Trade;
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
  payload: Trade[];
}
