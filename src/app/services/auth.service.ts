import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";



@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly resourceUrl = SERVER_API_URL + "/api/user/login";
  readonly registerUrl = SERVER_API_URL + "/api/user/register";

  constructor(private http: HttpClient) { }

  register(register: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, register, { observe: 'response' });
  }
  create(login: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl, login, { observe: 'response' });
  }

}
