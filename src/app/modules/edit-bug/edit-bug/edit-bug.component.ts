import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EditBugService } from "../edit-bug.service";
import { Bug } from "../../bug-report-table/bug.model";
import { Comment } from "../../bug-report-table/comment.model";
import { environment } from "../../../../environments/environment";
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: "app-edit-bug",
  templateUrl: "./edit-bug.component.html",
  styleUrls: ["./edit-bug.component.scss"]
})
export class EditBugComponent implements OnInit {
  priorities = [{ key: 1, value: "Minor" }, { key: 2, value: "Major" }, { key: 3, value: "Critical" }];

  reporters = ["QA", "PO", "DEV"];
  statuses = ["Done", "Rejected", "Ready for test"];

  editBugForm: FormGroup;
  commentBugForm: FormGroup;

  Submitted: boolean = false;
  CommentSubmitted: boolean = false;

  bugId: any;

  myBug: Bug = {
    title: null,
    description: null,
    priority: null,
    reporter: null,
    status: null,
    dateUpdated: null,
    dateCreated: null,
    comments: []
  };

  // myPrevBug: Bug = {
  //   title: null,
  //   description: null,
  //   priority: null,
  //   reporter: null,
  //   status: null,
  //   dateUpdated: null,
  //   dateCreated: null,
  //   comments: []
  // };


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private editBugService: EditBugService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.bugId = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.editBugForm = this.formBuilder.group({
      title: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      priority: ["", Validators.compose([Validators.required])],
      reporter: ["", Validators.compose([Validators.required])],
      status: ["", Validators.compose([Validators.required])]
    });

    this.commentBugForm = this.formBuilder.group({
      description: ["", Validators.compose([Validators.required])],
      reporter: ["", Validators.compose([Validators.required])]
    });

    // this.Submitted = false;

    this.editBugService.getBugByID(this.bugId).subscribe(data => {
      this.editBugForm.patchValue({
        title: data["title"],
        description: data["description"],
        priority: data["priority"],
        reporter: data["reporter"],
        status: data["status"]
      });

      console.error(this.myBug)

      this.myBug.title = data["title"];
      this.myBug.description = data["description"];
      this.myBug.priority = data["priority"];
      this.myBug.reporter = data["reporter"];
      this.myBug.status = data["status"];
      this.myBug.comments = data["comments"];

      // this.myPrevBug.title = data["title"];
      // this.myPrevBug.description = data["description"];
      // this.myPrevBug.priority = data["priority"];
      // this.myPrevBug.reporter = data["reporter"];
      // this.myPrevBug.status = data["status"];
      // this.myPrevBug.comments = data["comments"];

    });
  }

  get title() {
    return this.editBugForm.get("title");
  }

  get description() {
    return this.editBugForm.get("description");
  }

  get priority() {
    return this.editBugForm.get("priority");
  }

  get reporter() {
    return this.editBugForm.get("reporter");
  }

  get status() {
    return this.editBugForm.get("status");
  }

  get commentdescription() {
    return this.commentBugForm.get("description");
  }

  get commentreporter() {
    return this.commentBugForm.get("reporter");
  }

  goToBugsTable() {
    this.router.navigate([""]);
  }

  updateBug() {
    if (this.editBugForm.invalid) {
      this.Submitted = true;
      return;
    }

    this.myBug.title = this.editBugForm.value.title;
    this.myBug.description = this.editBugForm.value.description;
    this.myBug.priority = this.editBugForm.value.priority;
    this.myBug.reporter = this.editBugForm.value.reporter;
    this.myBug.status = this.editBugForm.value.status;

    this.Submitted = false;

    this.editBugService.updateBug(this.myBug, this.bugId).subscribe(data => {
      this.myBug.comments = data["comments"];
      this.alertService.success('Bug updated successfully');
    });
  }

  addComment() {

    if (this.commentBugForm.invalid) {
      this.CommentSubmitted = true;
      return;
    }

    if (this.myBug.comments == null) {
      this.myBug.comments = [];
    }

    this.myBug.comments.push(this.commentBugForm.value);
    this.CommentSubmitted = false;

    this.editBugService.updateBug(this.myBug, this.bugId).subscribe(data => {
      this.myBug.comments = data["comments"];
      this.alertService.success('Comment added successfully');
    });
  }

  // Na mpei se Helpers .. 
  removeFromArrayByID(array, id) {
    return array.filter(item => item._id !== id);
  }

  deleteComment(id) {

    console.error('Deleting Comment -> ' + id)
    this.myBug.comments = this.removeFromArrayByID(this.myBug.comments, id)
    this.editBugService.updateBug(this.myBug, this.bugId).subscribe(data => {
      this.myBug.comments = data["comments"];
      this.alertService.success('Comment removed successfully');
    });
  }

  clearInput() {
    this.Submitted = false;
    this.CommentSubmitted = false;
    this.commentBugForm.reset();
  }
}
