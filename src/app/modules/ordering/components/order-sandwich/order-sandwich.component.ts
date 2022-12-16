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
  nameUnfilled = true;
  wantsSandwichUnfilled = true;
  myOrder: Order;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  submitName() {
    if(this.nameForm.valid) {
      let name = this.nameForm.get('name').value;
      this.orderService.findTodaysUnfilledOrderByName(name).subscribe((data) =>
      {
        this.myOrder = data;
      });
    }
    if(this.myOrder) {
      this.nameUnfilled = false;
      this.nameForm.controls['name'].disable();
      console.log(this.myOrder);
    }
  }


}
