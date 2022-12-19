import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../../../models/order.model";
import {OrderService} from "../../../../services/order.service";
import {OrderForm} from "../../../../form-models/order-form";
import {MatTableDataSource} from "@angular/material/table";
import {Sandwich} from "../../../../models/sandwich.model";

const ELEMENT_DATA: Sandwich[] = [];

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
  readyToViewSandwiches = false;
  disabledAddButton = false;
  todaysBreadtypes = [];
  chosenBreadtype?: string;

  //Sandwich table information
  displayedColumns: string[] = ['add', 'name', 'description', 'category'];
  dataSource = ELEMENT_DATA;

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

  retrieveAllSandwiches() {
    this.orderService.getTodaysSandwiches().subscribe((data) => {
      this.dataSource = data;
    })
  }

  retrieveBreadTypes() {
    this.orderService.getTodaysBreadTypes().subscribe((data) => {
      this.todaysBreadtypes = data;
      //console.log("YEs!")
    })
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
    //console.log(this.myOrder);
  }

  wantsSandwichHandle(yn: boolean) {
    this.wantsSandwichUnfilled = false;
    if (yn == false) {
      //console.log("In the no sandwich run")
      this.myOrder.orderStatus = "NOSANDWICH";
      this.timeForRemark = true;
    } else {
      this.wantsSandwich = true;
      this.readyToViewSandwiches = true;
      this.retrieveAllSandwiches();
    }
    //console.log(yn);
    //console.log("Time for remark?")
    //console.log(this.timeForRemark);
  }

  selectSandwich(sandwichId: number, sandwichIndex: number){
    this.myOrder.sandwichID = sandwichId;
    this.myOrder.orderStatus = "ORDERED";
    this.dataSource = [this.dataSource[sandwichIndex]];
    this.disabledAddButton = true;
    this.retrieveBreadTypes();
    //console.log(sandwichIndex);
    //console.log(this.myOrder);
  }


  submitOrder() {
    let myOrderDto = new OrderForm();
    if (this.wantsSandwich == false) {

      myOrderDto.noSandwich = true;
      myOrderDto.orderId = this.myOrder.orderID;
      myOrderDto.personFullName = this.myOrder.personName;
      myOrderDto.remark = this.myOrder.remark;
    } else {
      return;
    }

    console.log("What we send to API:");
    console.log(myOrderDto);

    this.orderService.handleOrder(myOrderDto).subscribe((order: Order) => {
      console.log("All is sent, we could return what's getting back")
    })

  }


}
