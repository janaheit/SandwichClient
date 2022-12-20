import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../../../../services/management.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SandwichShop} from "../../../../models/sandwich-shop.model";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-manage-day',
  templateUrl: './manage-day.component.html',
  styleUrls: ['./manage-day.component.scss']
})
export class ManageDayComponent implements OnInit {

  shops: SandwichShop[];
  entityForm: FormGroup;
  todayShop: SandwichShop;
  dayOngoing: boolean;

  constructor(
    private managementService:ManagementService,
    private orderService: OrderService,
    private fb: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.dayOngoing = this.managementService.dayOngoing;
    // TODO error handling
    this.orderService.getTodaysSandwichShop()
      .subscribe((shop)=> {
        this.todayShop = shop;
        this.dayOngoing = true;
        this.managementService.dayOngoing = true;
      });

    this.managementService.getShops()
      .subscribe((shops) => {
        this.shops = shops;
      })

    this.entityForm = this.fb.group(
      {
        shops: [null, Validators.required]
      }
    )
    if (this.todayShop != null) this.entityForm.get('shops').setValue(this.todayShop.id);
  }

  submit(){
    if (this.entityForm.invalid){
      console.log("invalid, not submitted");
      return;
    }

    this.todayShop = this.shops.find((s) => {
      return s.id == this.entityForm.get('shops').value;
    })

    console.log(this.todayShop);

    this.startDay();
  }



  startDay(){
    this.managementService.startDay(this.todayShop)
      .subscribe(()=>{
        console.log("day started");
        this.dayOngoing = true;
        this.managementService.dayOngoing = true;
      })
  }

  endDay(){
    this.managementService.closeOrdersOfDay()
      .subscribe(()=>{
        console.log("day ended");
      });
    this.dayOngoing = false;
    this.managementService.dayOngoing = false;
  }

}
