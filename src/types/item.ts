export interface CardItem {
  id: string;
  name: string;
  items: Item[];
  totalReceipt: number;
}

interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}
