import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bug } from "../modules/bug-report-table/bug.model";

@Injectable({
  providedIn: "root"
})
export class GetBugsService {
  constructor(private http: HttpClient) { }

  getBugsMeta() {
    return new Promise((resolve, reject) => {

      let baseUrl = "https://bug-report-system-server.herokuapp.com/bugs?size=1";

      this.http.get<any>(baseUrl, { observe: 'response' })
        .subscribe(resp => {
          resolve(resp.headers.get('totalRecords'));
          // console.log(resp);
        });
    });
  }

  getBugs(sort, page, size, title, priority, reporter, status): Observable<Bug[]> {

    let connector = "?";
    let baseUrl = "https://bug-report-system-server.herokuapp.com/bugs";

    if (sort) {
      baseUrl += connector + "sort=" + sort;
      connector = "&";
    }

    if (page) {
      baseUrl += connector + "page=" + page;
      connector = "&";
    }

    if (size) {
      baseUrl += connector + "size=" + size;
      connector = "&";
    }

    if (title) {
      baseUrl += connector + "title=" + title;
      connector = "&";
    }

    if (priority) {
      baseUrl += connector + "priority=" + priority;
      connector = "&";
    }

    if (reporter) {
      baseUrl += connector + "reporter=" + reporter;
      connector = "&";
    }

    if (status) {
      baseUrl += connector + "status=" + status;
      connector = "&";
    }

    return this.http.get<Bug[]>(baseUrl);
  }
}
