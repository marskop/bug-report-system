import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugReportTableComponent } from './bug-report-table/bug-report-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarModule } from '../navbar/navbar.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { PrioritiesPipe } from './priorities.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlertModule } from '../alert/alert.module';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [BugReportTableComponent, PrioritiesPipe],
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule,
    SearchBarModule,
    SharedModule,
    AlertModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BugReportTableComponent
  ]
})
export class BugReportTableModule { }
