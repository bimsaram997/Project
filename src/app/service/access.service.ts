import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  myUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
 public register(email: string, uName: string, works: string, nic: string, mobile: string, password: string): Observable<any> {
    return this.http.post(this.myUrl + 'accessRoute/signUp', {
      email,
      uName,
      works,
      nic,
      mobile,
      password,
    });
 }
  public getAllUsers(): Observable<any> {
    return this.http.get( this.myUrl + 'accessRoute/getAllUsers');
  }
  public login(email: string, password: string): Observable<any>{
    return this.http.get(this.myUrl + 'accessRoute/loginUser', {headers: {email, password}});
  }
  findOne(id: string): Observable<any> {
    return this.http.get('accessRoute/getUser/: id', {headers: {id}});
  }

}
