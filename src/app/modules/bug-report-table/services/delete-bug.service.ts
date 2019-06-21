import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bug } from '../bug.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteBugService {

  constructor( private http: HttpClient ) { }

  deleteBug(id) {

    let baseUrl = "https://bug-report-system-server.herokuapp.com/bugs";

    if (id != null) {
      baseUrl = baseUrl + '/' + id;
      return this.http.delete<Bug>(baseUrl);
    }

  }

}
