import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AddNewBugComponent } from './add-new-bug/add-new-bug.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { AlertModule } from '../alert/alert.module';


@NgModule({
  declarations: [AddNewBugComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NavbarModule,
    AlertModule
  ],
  exports: [
    AddNewBugComponent
  ]
})
export class AddNewBugModule { }
