import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "../models/order.model";
import {DateIoService} from "./date-io.service";
import {Session} from "../models/session.model";
import {SandwichShop} from "../models/sandwich-shop.model";
import {Person} from "../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  controllerName: string = "/orders"
  url:string;
  http: HttpClient;
  dayOngoing :  boolean;

  constructor(
    httpClient: HttpClient,
    private dateService: DateIoService,
  ) {
    this.http = httpClient;
    this.url = environment.api.url + this.controllerName;
    this.dayOngoing=false;
  }

  startDay(shop: SandwichShop){
    return this.http.post(this.url + '/startup', shop);
  }

  getShops() {
    return this.http.get<SandwichShop[]>(this.url + '/shops');
  }

  // Gets only ordered => thus NoSandwich is not included
  findAllFilledOrdersToday(){
    return this.http.get<Order[]>(this.url + '/today');
  }
  findAllNoSandwichOrdersToday(){
    return this.http.get<Order[]>(this.url + '/today/no-sandwich');
  }

  findPersonsThatHaveNotOrdered(){
    return this.http.get<Person[]>(this.url + '/missing');
  }

  getAllClosedOrdersForDate(date: Date){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("date", this.dateService.formatDate(date));
    return this.http.get<Order>(this.url + "/query", {params: queryParams});
  }

  getClosedOrderForPeriod(start: Date, end:Date){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("start", this.dateService.formatDate(start));
    queryParams = queryParams.append("end", this.dateService.formatDate(end));
    return this.http.get<Order>(this.url + "/unfilled/query", {params: queryParams});
  }

  getAllSessionsDuringPeriod(start: Date, end:Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("start", this.dateService.formatDate(start));
    queryParams = queryParams.append("end", this.dateService.formatDate(end));
    return this.http.get<Session[]>(this.url + "/sessions/period", {params: queryParams});
  }

  getAllSessionsForInstructor(name:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);
    return this.http.get<Session[]>(this.url + "/sessions/instructor", {params: queryParams});
  }

  closeOrdersOfDay(){
    return this.http.post(this.url + "/close", "");
  }

}
