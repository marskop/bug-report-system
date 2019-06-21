import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {

  @Output() bugPriority: EventEmitter<string> = new EventEmitter();
  @Output() bugStatus: EventEmitter<string> = new EventEmitter();
  @Output() bugReporter: EventEmitter<string> = new EventEmitter();
  @Output() clearFilters: EventEmitter<boolean> = new EventEmitter();

  PriorityButtonFocused = false;
  StatusButtonFocused = false;
  ReporterButtonFocused = false;
  BugPriority: string = "";
  BugStatus: string = "";
  BugReporter: string = "";
  

  constructor() { }

  ngOnInit() { }

  onSearchBlur() {
    setTimeout(() => {
      this.PriorityButtonFocused = false;
      this.StatusButtonFocused = false;
      this.ReporterButtonFocused = false;
    }, 250);
  }

  onSearchFocus() {
    this.PriorityButtonFocused = true;
    this.StatusButtonFocused = true;
    this.ReporterButtonFocused = true;
  }

  SelectBugPriority(value) {
    this.BugPriority = value;
    this.bugPriority.emit(this.BugPriority);
  }

  SelectBugStatus(value) {
    this.BugStatus = value;
    this.bugStatus.emit(this.BugStatus);
  }

  SelectBugReporter(value) {
    this.BugReporter = value;
    this.bugReporter.emit(this.BugReporter);
  }

  clearAllFilters() {
    this.BugPriority = 'All';
    this.BugStatus = 'All';
    this.BugReporter = 'All';
    this.clearFilters.emit(true);
  }
 
}
