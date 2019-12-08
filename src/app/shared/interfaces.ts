export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string;
  imageSrc?: string;
  _id?: string;
}

export interface Message {
  message: string;
}

export interface Position {
  name: string;
  description: string;
  cost: string;
  imageSrc?: string;
  category: string;
  _id?: string;
}
