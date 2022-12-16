import { NgModule } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";

const MaterialComponents = [MatFormFieldModule,
];

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents,
  ],
  exports: [
    MaterialComponents,
  ]
})
export class MaterialModule { }
