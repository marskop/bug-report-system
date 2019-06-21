import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { AddNewBugModule } from './modules/add-new-bug/add-new-bug.module';
import { BugReportTableModule } from './modules/bug-report-table/bug-report-table.module';
import { EditBugModule } from './modules/edit-bug/edit-bug.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { SharedModule } from './shared/shared.module';
import { SearchBarModule } from './modules/search-bar/search-bar.module';
import { AlertModule } from './modules/alert/alert.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';

import { Interceptor } from './shared/helpers/interceptor.service'



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ConfirmDialogModule,
    NavbarModule,
    AddNewBugModule,
    BugReportTableModule,
    EditBugModule,
    SharedModule,
    SearchBarModule,
    AlertModule,
    ConfirmDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
