export type Fruit = {
    id: number; 
    name: string; 
    quantityInStock: number; 
    price: number;
  };
  
  export type Catalog = Fruit[];
  
  export type OrderItem = {
    fruitId: number; 
    quantity: number; 
    unitPrice: number; 
    amount: number; 
  };
  
  export type Order = {
    orderItems: OrderItem[]; 
    amount: number; 
  };
  
  export type State = {
    catalog: Catalog; 
  };
  