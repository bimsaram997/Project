import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from '../../environments/environment';
import UserDTO from "../dto/UserDTO";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  myUrl = environment.baseUrl;
  private  currntUserSubject :BehaviorSubject<any>;
  public currentUser:Observable<any>;

  constructor(private http: HttpClient) {
      //this.currntUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
     // this.currentUser = this.currntUserSubject.asObservable()


  }

 public register(email: string, uName: string, works: string, nic: string, mobile: string, role: string, password: string): Observable<any> {
    return this.http.post(this.myUrl + 'accessRoute/signUp', {
      email,
      uName,
      works,
      nic,
      mobile,
      role,
      password,
    });
 }
 public sendEmail(email: string, receive: string, subject: string, text: string): Observable<any> {
    return this.http.post(this.myUrl + 'accessRoute/sendMails', {
      email,
      receive,
      subject,
      text
    });
 }

 public requestPassword(body): Observable<any>{
    return this.http.post(this.myUrl + 'accessRoute/requestPassword' , body)
 }

  // public get currentUsrValue() {
  //   return this.currntUserSubject.value;
  // }
  public getAllUsers(): Observable<any> {
    return this.http.get( this.myUrl + 'accessRoute/getAllUsers');
  }
  public login(email: string, password: string): Observable<any>{
    return this.http.get<any>(this.myUrl + 'accessRoute/loginUser', {headers: {email, password}}).pipe(
      map(user => {
        if(user && user.token){
          localStorage.setItem('currentUser' ,user);
       // this.currntUserSubject.next(user);
        }


        return  user;
      })
    );
  }
  findOne(id: string): Observable<any> {
    return this.http.get('accessRoute/getUser/: id', {headers: {id}});
  }

}
