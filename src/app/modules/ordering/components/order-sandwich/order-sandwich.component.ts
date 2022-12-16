import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-sandwich',
  templateUrl: './order-sandwich.component.html',
  styleUrls: ['./order-sandwich.component.scss']
})
export class OrderSandwichComponent implements OnInit{
  nameForm: FormGroup;
  nameUnfilled = true;
  wantsSandwichUnfilled = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  submitName() {
    this.nameUnfilled = false;
    this.nameForm.controls['name'].disable();
    console.log('send name')
  }


}
