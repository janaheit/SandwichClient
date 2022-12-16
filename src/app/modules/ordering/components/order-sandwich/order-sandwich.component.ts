import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../../../models/order.model";
import {OrderService} from "../../../../services/order.service";
import {OrderForm} from "../../../../form-models/order-form";

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
  readyToSubmit = false;

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
    this.remarkUnfilled = false;
    this.remarkForm.controls['remark'].disable();
    this.readyToSubmit = true;
    console.log(this.myOrder);
  }

  wantsSandwichHandle(yn: boolean) {
    this.wantsSandwichUnfilled = false;
    if (yn == false) {
      //console.log("In the no sandwich run")
      this.myOrder.orderStatus = "NOSANDWICH";
      this.timeForRemark = true;
    } else {
      this.wantsSandwich = true;
    }
    //console.log(yn);
    //console.log("Time for remark?")
    //console.log(this.timeForRemark);
  }

  submitOrder() {
    let myOrderDto = new OrderForm();
    if (this.wantsSandwich == false) {

      myOrderDto.noSandwich = true;
      myOrderDto.orderId = this.myOrder.orderID;
      myOrderDto.personFullName = this.myOrder.personName;
    } else {
      return;
    }

    this.orderService.handleOrder(myOrderDto).subscribe((order: Order) => {
      console.log("All is sent, we could return what's getting back")
    })

  }


}
