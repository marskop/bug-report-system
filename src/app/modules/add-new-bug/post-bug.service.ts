import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostBugService {
  constructor(private http: HttpClient) {}

  addNewBug(title, description, priority, reporter, status): Observable<any> {
    let data = { title: title, description: description, priority: priority, reporter: reporter, status: status };
    return this.http.post("https://bug-report-system-server.herokuapp.com/bugs", data);
  }
}
