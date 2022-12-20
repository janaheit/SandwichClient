import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../../../../services/management.service";
import {Order} from "../../../../models/order.model";
import {Person} from "../../../../models/person.model";

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss']
})
export class OrderReportsComponent implements OnInit {
  dayOngoing: boolean;

  dataSourceOrdered: Order[];
  dataSourceNoSandwich: Order[];
  dataSourceMissingPersons: Person[];

  displayedColumnsOrdered: string[]
  displayedColumnsNoSandwich: string[];
  displayedColumnsMissingPersons: string[];

  constructor(
    private managementService: ManagementService,
  ){}

  ngOnInit(): void {
    this.dayOngoing = this.managementService.dayOngoing;
    this.displayedColumnsOrdered = ["personName", "sandwichName", "breadType", "options", "sessionName", "remark"];
    this.displayedColumnsNoSandwich = ["personName", "sessionName", "remark"];
    this.displayedColumnsMissingPersons = ["name"];

    // TODO handle errors here => if error is thrown just don't display

    if (this.dayOngoing) {
      // if day is ongoing, get all orders (missing, ordered, no sandwich)
      this.managementService.findAllFilledOrdersToday()
        .subscribe((orders) => {
          this.dataSourceOrdered = orders;
        });

      this.managementService.findAllNoSandwichOrdersToday()
        .subscribe((orders) => {
          this.dataSourceNoSandwich = orders;
        });

      this.managementService.findPersonsThatHaveNotOrdered()
        .subscribe((persons) => {
          this.dataSourceMissingPersons = persons;
        });
    } else {
      // if the day is not ongoing, get closed orders for today
      this.managementService.getAllClosedOrdersForDate(new Date());
    }
  }




}
