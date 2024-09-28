import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Router } from "@angular/router";
import { User } from "../models/user";
@Injectable({
  providedIn: "root",
})
export class UserService {
  private Users: any = [];
  private Users$ = new Subject<User[]>();
  readonly url = SERVER_API_URL + "/api/user";
  readonly user = SERVER_API_URL + "/api/user/user";

  constructor(private http: HttpClient, private route: Router) { }

  getUser() {
    this.http
      .get<{ profiles: any }>(this.user)
      .pipe(
        map((UserData) => {
          return UserData;
        })
      )
      .subscribe((Users) => {
        this.Users = Users;
        this.Users$.next(this.Users);
      });
  }

  getUserStream() {
    return this.Users$.asObservable();
  }


  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<User[]>(this.user, { params: options, observe: 'response' });
  }

}
