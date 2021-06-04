import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const AUTH_API = 'http://localhost:8083/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    //console.log("chfama hne" + user.toString());
    console.log("role" + user.role);
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: {
        city : user.city,
        addressLine: user.addressLine,
        zipCode : user.zipCode,
      },
      gender: user.gender,
      role: [user.role]
    }, httpOptions);
  }
}
