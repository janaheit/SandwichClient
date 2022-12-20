import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../../../../services/management.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SandwichShop} from "../../../../models/sandwich-shop.model";
import {OrderService} from "../../../../services/order.service";
import {Router} from "@angular/router";

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
    private fb: FormBuilder,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.dayOngoing = this.managementService.dayOngoing;

    this.managementService.getTodaySandwichShop()
      .subscribe({
        next: (shop) => {
          this.todayShop = shop;
          if(shop != null) {
            this.dayOngoing = true;
            this.managementService.dayOngoing = true;
          }
        }
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
      .subscribe({
        next: () => {
          this.dayOngoing = false;
          this.todayShop = null;
          this.managementService.dayOngoing = false;
          this.router.navigate(['/manage/report']);
        },
        error: err => {
          console.log("error occured -> nothing to handle, meaning day was not ended")
        }
      });

  }

}
