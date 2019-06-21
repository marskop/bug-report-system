import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBugComponent } from './edit-bug/edit-bug.component';

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NavbarModule } from '../navbar/navbar.module';
import { AlertModule } from '../alert/alert.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsPipe } from 'src/app/shared/pipes/comments.pipe';



@NgModule({
  declarations: [EditBugComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarModule,
    AlertModule,
    SharedModule
  ],
  exports: [
    EditBugComponent
  ]

})
export class EditBugModule { }
