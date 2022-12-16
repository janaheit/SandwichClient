import { Component } from '@angular/core';
import {ManagementService} from "../../../../services/management.service";

@Component({
  selector: 'app-manage-day',
  templateUrl: './manage-day.component.html',
  styleUrls: ['./manage-day.component.scss']
})
export class ManageDayComponent {

  constructor(private managementService:ManagementService) {
  }

  startDay(){
    this.managementService.startDay()
      .subscribe(()=>{
        console.log("day started");
      })
  }

  endDay(){
    this.managementService.closeOrdersOfDay()
      .subscribe(()=>{
        console.log("day ended");
      })
  }
}
