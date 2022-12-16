
export class Order {

  orderID: number;
  orderStatus: OrderStatus;
  personID: number;
  sandwichID: number;
  sandwichName: string;
  sandwichCategory: string;
  breadType: BreadType;
  options: Options[];
  remark: string;
  sessionID: number;
  sessionName: string;
  sandwichShopID: number;
  sandwichShopName: string;
  date: Date;

}
