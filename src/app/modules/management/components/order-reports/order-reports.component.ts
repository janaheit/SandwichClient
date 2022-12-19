import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../../../../services/management.service";
import {Order} from "../../../../models/order.model";

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss']
})
export class OrderReportsComponent implements OnInit {

  dataSourceOrdered: Order[];
  dataSourceNoSandwich: Order[];
  dataSourceMissing: Order[];

  displayedColumns: string[]

  constructor(
    private managementService: ManagementService,
  ){}

  ngOnInit(): void {
    this.displayedColumns = ["personName", "sandwichName", "breadType", "options", "sessionName"];
    this.managementService.findAllFilledOrdersToday()
      .subscribe((orders)=> {
        this.dataSourceOrdered = orders;
      });

    this.managementService.findAllNoSandwichOrdersToday()
      .subscribe((orders)=> {
        this.dataSourceNoSandwich= orders;
      });

    this.managementService.findAllMissingOrdersToday()
      .subscribe((orders)=> {
        this.dataSourceMissing = orders;
      });
  }




}
