import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../models/order.model";
import {environment} from "../../environments/environment";
import {query} from "@angular/animations";
import {OrderForm} from "../form-models/order-form";
import {SandwichShop} from "../models/sandwich-shop.model";
import {Sandwich} from "../models/sandwich.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  controllerName: string = "/order"
  url:string;
  http: HttpClient;

  constructor(
    httpClient: HttpClient,
    ) {
    this.http = httpClient;
    this.url = environment.api.url + this.controllerName;
  }

  // CAREFUL: Jana Heitkeper has to be Jana Heitkeper, while Marcel van Hassel has to be Mqrcelvan Hassel
  findTodaysUnfilledOrderByName(name: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);
    return this.http.get<Order>(this.url + "/unfilled/query", {params: queryParams});
  }

  handleOrder(orderForm: OrderForm){
    return this.http.post<Order>(this.url, orderForm);
  }

  getTodaysBreadTypes(){
    return this.http.get<BreadType[]>(this.url + "/shop/breadtypes")
  }
  getTodaysOptions(){
    return this.http.get<Options[]>(this.url + "/shop/options")
  }
  getTodaysSandwiches(){
    return this.http.get<Sandwich[]>(this.url + "/shop/sandwiches")
  }
  getTodaysSandwichShop(){
    return this.http.get<SandwichShop>(this.url + "/shop")
  }
}
