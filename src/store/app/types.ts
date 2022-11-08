export interface AppState {
  bills: Bill[];
  grandTotal: number;
}

export interface Bill {
  id: string;
  name: string;
  orders: Order[];
}

export interface Order {
  id: string;
  orderName?: string;
  amount?: number;
  price: number;
}
