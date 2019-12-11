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
  costWithDiscount?: string;
  quantity?: number;
  size?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  size: string;
  quantity: number;
  costWithDiscount?: string;
  _id?: string;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
  adress: string;
  phone: string;
}
