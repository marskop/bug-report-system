import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bug } from '../bug-report-table/bug.model';
import { CommentStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EditBugService {

  constructor( private http: HttpClient ) { }


  getBugByID(id): Observable<Bug[]> {

    let baseUrl = "https://bug-report-system-server.herokuapp.com/bugs";

    if (id !== null) {
      baseUrl = baseUrl + '/' + id;
    }
    return this.http.get<Bug[]>(baseUrl);
  }

 

  updateBug(bug: Bug, id): Observable<Bug[]>  {

    let baseUrl = "https://bug-report-system-server.herokuapp.com/bugs";
    let data = bug;

    if (id !== null) {
      baseUrl = baseUrl + '/' + id;
    }

    return this.http.put<Bug[]>(baseUrl, data);
  }


}
