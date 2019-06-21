import { Component, OnInit, Input } from "@angular/core";
import { Bug } from "../bug.model";
import { Router } from "@angular/router";
import { GetBugsService } from "../../../shared/get-bugs.service";
import { ConfirmDialogService } from "src/app/modules/confirm-dialog/confirm-dialog.service";
import { DeleteBugService } from "../services/delete-bug.service";
import { AlertService } from "src/app/shared/services/alert.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EditBugService } from '../../edit-bug/edit-bug.service';

@Component({
  selector: "app-bug-report-table",
  templateUrl: "./bug-report-table.component.html",
  styleUrls: ["./bug-report-table.component.scss"]
})
export class BugReportTableComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private getBugsService: GetBugsService, private editBugService: EditBugService, private router: Router, private confirmDialogService: ConfirmDialogService, private deleteBugService: DeleteBugService, private alertService: AlertService) { }

  checkNewBugsInterval: any = null;
  commentBugForm: FormGroup;
  CommentSubmitted: boolean = false;

  loadingData: boolean = false;
  totalRecords: any = null;
  pagesSum: any = 0;

  priorities = [{ key: 1, value: "Minor" }, { key: 2, value: "Major" }, { key: 3, value: "Critical" }];
  searchInput: String = "";
  // pages = [1, 2, 3];
  sortBy: string = null;
  sortOrder: string = "asc";
  page = 0;
  size = 10;
  priority: number = null;
  reporter: string = null;
  status: string = null;

  bugs: Bug[];

  addNewComment: boolean = false;
  viewComments: boolean = false;
  fromViewComments: boolean = false;
  selectedBugID: any = null;


  myBug: Bug = {
    title: null,
    description: null,
    priority: null,
    reporter: null,
    status: null,
    dateUpdated: null,
    dateCreated: null,
    comments: [],
  };

  patchBugByID(id, data) {

    this.bugs.forEach((element, index) => {
      if (element["id"] === id) {
        this.bugs[index] = data;
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.checkNewBugsInterval);
  }

  ngOnInit() {
    this.checkNewEntries(false);
    this.loadData();
    this.checkNewBugsInterval = setInterval(() => {
      this.checkNewEntries(true);
    }, 5000);

    this.commentBugForm = this.formBuilder.group({
      description: ["", Validators.compose([Validators.required])],
      reporter: ["", Validators.compose([Validators.required])]
    });
  }

  get commentdescription() {
    return this.commentBugForm.get("description");
  }

  get commentreporter() {
    return this.commentBugForm.get("reporter");
  }

  checkNewEntries(update) {
    this.getBugsService.getBugsMeta().then(res => {
      if (update && this.totalRecords != null && this.totalRecords != res) {
        this.alertService.success("There Might Be Some Changes At The Bugs List.. Please Refresh!!");
        // if (this.page == 0) {
        //   this.loadData();
        // }
      }
      this.totalRecords = res;
      this.pagesSum = Math.ceil(this.totalRecords / this.size);
      console.log("Total Records -> " + this.totalRecords);
    });
  }

  loadData() {
    this.loadingData = true;
    this.getBugsService.getBugs(this.sortBy + "," + this.sortOrder, this.page, this.size, this.searchInput, this.priority, this.reporter, this.status).subscribe(data => {
      this.bugs = data.map(bug => {
        return bug;
      });
      console.error(this.bugs);
      this.loadingData = false;
    });
  }

  setPages() { }

  getBugsPerPriority(event: any) {
    if (event === "Minor") {
      this.priority = 1;
    }
    if (event === "Major") {
      this.priority = 2;
    }
    if (event === "Critical") {
      this.priority = 3;
    }
    if (event === "All") {
      this.priority = null;
    }
    this.loadData();
  }

  getBugsPerStatus(event: any) {
    if (event === "All") {
      this.status = null;
    } else {
      this.status = event;
    }
    this.loadData();
  }

  getBugsPerReporter(event: any) {
    if (event === "All") {
      this.reporter = null;
    } else {
      this.reporter = event;
    }
    this.loadData();
  }

  clearAllFilters() {
    this.searchInput = null;
    this.reporter = null;
    this.status = null;
    this.priority = null;
    this.loadData();
  }

  getBugByID(id) {
    return this.bugs.filter(bug => bug["id"] == id)[0];
  }

  get runOutOfNextData() {
    // if (!this.bugs) {
    //   return true;
    // }
    // return this.bugs.length != this.size;
    return this.page * this.size + this.size >= this.totalRecords;
  }

  get runOutOfPreviousData() {
    return this.page == 0;
  }

  pageIsEmpty() {
    if (!this.bugs) {
      return true;
    }
    return this.bugs.length == 0;
  }

  searchInputChanged() {
    console.error("Input Changed -> " + this.searchInput);
    this.loadData();
  }

  clearSearchInput() {
    this.searchInput = "";
  }

  setSortBy(value) {
    if (this.sortBy !== value) {
      // if previous sorting was != value
      this.sortOrder = "asc"; // set order ascending
      this.sortBy = value; // and sort items according to user's selection
    } else {
      if (this.sortOrder == "asc") {
        // if previous sorting was == value
        this.sortOrder = "desc"; // change only the sorting order (asc or desc)
      } else {
        this.sortOrder = "asc";
      }
    }

    this.page = 0;
    // this.pages = [0, 1, 2, 3];
    this.loadData(); // call get and give sorted results according to user's selection
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  goToEditBug(id) {
    this.router.navigate(["edit-bug", id]);
  }

  setPage(value) {
    this.page = value;
    console.log("o xritis mou leei na paw sti selida: " + this.page);
    this.loadData();
  }

  setNextPage() {
    // if (this.bugs.length == this.size + 1) {
    if (this.bugs.length == this.size) {
      this.page += 1;
      // this.pages = this.pages.map(a => a + 1);
      // this.pages = [this.page, this.page + 1, this.page + 2, this.page + 3];
      console.log(" eimai sti next kai exxw auta" + this.bugs.length);
      this.loadData();
    } else {
      return;
    }
    console.log("(next) page number is:" + this.page);
  }

  setPreviousPage() {
    if (this.page > 0) {
      this.page -= 1;
      // this.pages = this.pages.map(a => a - 1);
      // this.pages = [this.page, this.page + 1, this.page + 2, this.page + 3];
    } else {
      this.page = 0;
      // this.pages = [0, 1, 2, 3];
      return;
    }
    console.log(" (previous) page number is:" + this.page);
    this.loadData();
  }

  addNewCommentFromViewComments() {
    this.viewComments = false;
    this.addNewComment = true;
    this.fromViewComments = true;
  }

  viewCommentsFromAddNewComment() {
    this.addNewComment = false;
    this.viewComments = true;
    this.fromViewComments = false;
  }

  openAddNewCommentModal(id) {

    // console.error("Open Add Comments Modal => " + id)

    this.addNewComment = true;
    this.selectedBugID = id;

    this.editBugService.getBugByID(this.selectedBugID).subscribe(data => {

      this.myBug.title = data["title"];
      this.myBug.description = data["description"];
      this.myBug.reporter = data["reporter"];
      this.myBug.status = data["status"];
      this.myBug.priority = data["priority"];
      this.myBug.comments = data["comments"];
    });
  }

  closeAddNewCommentModal() {

    // console.error("Close Add Comments Modal")

    this.addNewComment = false;
    this.selectedBugID = null;

    this.myBug = {
      title: null,
      description: null,
      priority: null,
      reporter: null,
      status: null,
      dateUpdated: null,
      dateCreated: null,
      comments: [],
    };
  }

  openViewCommentsModal(id) {

    // console.error("Open View Comments Modal => " + id)

    this.viewComments = true;
    this.selectedBugID = id;

    this.editBugService.getBugByID(this.selectedBugID).subscribe(data => {

      this.myBug.title = data["title"];
      this.myBug.description = data["description"];
      this.myBug.reporter = data["reporter"];
      this.myBug.status = data["status"];
      this.myBug.priority = data["priority"];
      this.myBug.comments = data["comments"];
    });
  }

  closeViewCommentsModal() {

    // console.error("Close View Comments Modal")

    this.viewComments = false;
    this.selectedBugID = null;

    this.myBug = {
      title: null,
      description: null,
      priority: null,
      reporter: null,
      status: null,
      dateUpdated: null,
      dateCreated: null,
      comments: [],
    };
  }

  deleteBug(id) {
    this.deleteBugService.deleteBug(id).subscribe(() => {
      this.alertService.success("Bug deleted successfully");
      this.checkNewEntries(false);
      this.loadData();
    });
  }

  deleteBugConfirmation(id) {
    console.log(id);
    let _this = this;
    this.confirmDialogService.confirmThis(
      "Are you sure you want to delete bug?",
      function () {
        _this.deleteBug(id);
      },
      function () { }
    );
  }



  // Na mpei se Helpers .. 
  //krataei ta idia comments ektos apo auto pou thekoume  na diagra4oumme
  removeFromArrayByID(array, id) {
    return array.filter(item => item._id !== id);
  }


  deleteComment(id) {

    console.error('Deleting Comment -> ' + id)
    this.myBug.comments = this.removeFromArrayByID(this.myBug.comments, id)
    this.editBugService.updateBug(this.myBug, this.selectedBugID).subscribe(data => {
      this.myBug.comments = data["comments"];
      this.patchBugByID(this.selectedBugID, this.myBug)
      this.alertService.success('Comment removed successfully');
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

    this.CommentSubmitted = false;

    this.myBug.comments.push(this.commentBugForm.value);

    this.editBugService.updateBug(this.myBug, this.selectedBugID).subscribe(data => {

      this.patchBugByID(this.selectedBugID, this.myBug)
      this.commentBugForm.reset();
      this.alertService.success("Comment added successfully");
      this.addNewComment = false;
      this.selectedBugID = null;
    })
  }
}
