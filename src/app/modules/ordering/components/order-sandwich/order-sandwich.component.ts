import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../../../models/order.model";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-order-sandwich',
  templateUrl: './order-sandwich.component.html',
  styleUrls: ['./order-sandwich.component.scss']
})
export class OrderSandwichComponent implements OnInit{
  nameForm: FormGroup;
  remarkForm: FormGroup;
  nameUnfilled = true;
  wantsSandwichUnfilled = true;
  remarkUnfilled = true;
  wantsSandwich = false;
  myOrder: Order;
  timeForRemark = false;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    this.remarkForm = this.formBuilder.group({
      remark: [null, []]
    });
  }

  submitName() {
    if(this.nameForm.valid) {
      let name = this.nameForm.get('name').value;
      this.orderService.findTodaysUnfilledOrderByName(name).subscribe((data: Order) =>
      {
          this.myOrder = data;
      });
    }
      if (this.myOrder) {
        this.nameUnfilled = false;
        this.nameForm.controls['name'].disable();
        console.log(this.myOrder);
      }
  }

  submitRemark() {
    let remark = this.remarkForm.get('remark').value;
    this.myOrder.remark = remark;
  }

  wantsSandwichHandle(yn: boolean) {
    this.wantsSandwichUnfilled = false;
    if (yn = false) {
      this.myOrder.orderStatus = OrderStatus.NOSANDWICH;
      this.timeForRemark = true;
    } else {
      this.wantsSandwich = true;
    }
    console.log(yn);
  }


}
