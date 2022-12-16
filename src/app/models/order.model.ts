
export class Order {

  orderID: number;
  orderStatus: string;
  personID: number;
  personName: string;
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
