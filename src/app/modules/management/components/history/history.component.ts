import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../models/order.model";
import {ManagementService} from "../../../../services/management.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  dataSource: Order[];
  startDate: Date;
  endDate: Date;
  entityForm: FormGroup;
  display:boolean;
  displayedColumns:string[];

  constructor(private managementService: ManagementService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.display = false;
    this.displayedColumns = ["personName", "sandwichName", "amount", "breadType", "options", "sessionName", "remark"];

    this.entityForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    })

  }

  findOrders(){
    this.managementService.getClosedOrdersForPeriod(this.startDate, this.endDate)
      .subscribe(orders =>{
        this.dataSource = orders;
        this.display = true;
      });
  }





}
