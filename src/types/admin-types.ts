
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  plan: string;
  bots: number;
  botTypes: string[];
  activity: string;
  joinDate: string;
};

export type AdminBot = {
  id: string;
  name: string;
  status: string;
  createdDate: string;
};

export type UserBot = AdminBot & {
  owner: string;
  ownerId: string;
  accounts: number;
};

export type PremiumBot = AdminBot & {
  users: number;
  profit: string;
};

export type PropBot = AdminBot & {
  users: number;
  profit: string;
  type: string;
};
