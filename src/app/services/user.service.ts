import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "https://localhost:7152/api";
  private tokenKey = 'auth_token';

  signup(user: any): Observable<any> {
    return this.http.post(this.url + '/register', user);
  }

  login(user: any): Observable<any> {

    return this.http.post(this.url + '/login', user)
  }

  // Save the token to local storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve the token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the token from local storage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if user ID exists in local storage
  }

  //retrieve users

  retrieveUsers(): Observable<any[]> {
    // Create headers and add the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get<any[]>(this.url + '/users', { headers: headers })
  }

  getLoggedInUser(): number {

    const decodedToken: any = jwt_decode(this.getToken()!.toString());
    const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
   // const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    // const user: { userId: number, userName: string } = {
    //   userId: id,
    //   userName: name,
    // };
    

    return +id;
  }
}
