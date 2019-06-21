import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostBugService } from "../post-bug.service";
import { Router } from '@angular/router';

import { environment } from "../../../../environments/environment";
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: "app-add-new-bug",
  templateUrl: "./add-new-bug.component.html",
  styleUrls: ["./add-new-bug.component.scss"]
})

export class AddNewBugComponent implements OnInit {

  priorities = [
    { key: 1, value: "Minor" },
    { key: 2, value: "Major" },
    { key: 3, value: "Critical" },
  ];

  Submitted: boolean = false;

  addBugForm: FormGroup;

  reporters = ["QA", "PO", "DEV"];
  statuses = ["Done", "Rejected", "Ready for test"];

  titleMinLength = environment.titleminlength;
  titleMaxLength = environment.titlemaxlength;

  constructor(private formBuilder: FormBuilder, private postBugService: PostBugService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {

    this.addBugForm = this.formBuilder.group({
      title: ["", Validators.compose([Validators.required, Validators.minLength(environment.titleminlength), Validators.maxLength(environment.titlemaxlength)])],
      description: ["", Validators.compose([Validators.required])],
      priority: ["", Validators.compose([Validators.required])],
      reporter: ["", Validators.compose([Validators.required])],
      status: ["", Validators.compose([Validators.required])]
    });
  }



  get title() {
    return this.addBugForm.get("title");
  }

  get description() {
    return this.addBugForm.get("description");
  }

  get priority() {
    return this.addBugForm.get("priority");
  }

  get reporter() {
    return this.addBugForm.get("reporter");
  }

  get status() {
    return this.addBugForm.get("status");
  }

  goToBugsTable() {
    this.router.navigate(['']);
  }

  addNewBug() {

    console.error(this.addBugForm)

    if (this.addBugForm.invalid) {
      this.Submitted = true;
      console.log("exw errors")
      return;
    }

    console.error(this.addBugForm)

    this.postBugService.addNewBug(this.addBugForm.value.title, this.addBugForm.value.description, this.addBugForm.value.priority, this.addBugForm.value.reporter, this.addBugForm.value.status).subscribe(data => {
      this.alertService.success('Bug added successfully');
      this.addBugForm.reset();
      // this.goToBugsTable();
    });
  }
}
