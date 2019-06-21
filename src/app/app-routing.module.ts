import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BugReportTableComponent } from './modules/bug-report-table/bug-report-table/bug-report-table.component';
import { AddNewBugComponent } from './modules/add-new-bug/add-new-bug/add-new-bug.component';
import { EditBugComponent } from './modules/edit-bug/edit-bug/edit-bug.component';



const routes: Routes = [
  { path: "", component: BugReportTableComponent },
  { path:'add-new-bug', component: AddNewBugComponent },
  { path: 'edit-bug/:id', component: EditBugComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
