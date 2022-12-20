import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../../../models/order.model";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit{

  personName: string;
  nameForm: FormGroup;
  todaysOrders: Order[];
  orderHistory: Order[];
  displayedColumnsToday: string[] = ['date', 'sandwichName', 'breadType', 'options', 'remark', 'amount', 'action'];
  displayedColumnsHistory: string[] = ['date', 'sandwichName', 'breadType', 'options', 'remark', 'amount',];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private orderService: OrderService) {

  }

  ngOnInit(): void {
    if(this.userService.getCurrentName()) {
      this.personName = this.userService.getCurrentName();
      this.retrieveTodaysFilledOrders(this.personName);
      this.retrieveHistoryOrders(this.personName);
    }
    this.nameForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  submitName() {
    if(this.nameForm.valid) {
      let name = this.nameForm.get('name').value;
      this.retrieveTodaysFilledOrders(name);
      this.retrieveHistoryOrders(name);
    }
  }


  retrieveTodaysFilledOrders(name: string) {
    this.orderService.findTodaysFilledOrdersByName(name).subscribe((data: Order[]) =>
    {
      this.todaysOrders = data;
      if (this.todaysOrders) {
        if(!this.personName && this.todaysOrders.length != 0) {
          this.userService.setCurrentName(this.todaysOrders[0].personName);
          this.personName = this.userService.getCurrentName();
          //console.log(this.myOrder);
        }
      }
    });
  }

  retrieveHistoryOrders(name: string) {
    this.orderService.findOrdersOfLastTwoMonthsByName(name).subscribe((data: Order[]) =>
    {
      this.orderHistory = data;
      if (this.orderHistory) {
        if(!this.personName && this.orderHistory.length != 0) {
          this.userService.setCurrentName(this.orderHistory[0].personName);
          this.personName = this.userService.getCurrentName();
          //console.log(this.myOrder);
        }
      }
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrderById(id).subscribe((data) => {
      this.retrieveTodaysFilledOrders(this.personName);
    });

  }


}
