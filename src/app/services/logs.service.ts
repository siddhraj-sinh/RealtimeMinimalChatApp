import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient,private user:UserService) {}
  url = "https://localhost:7152/api/Log";

  getLogs(startTime?: string, endTime?: string): Observable<any[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.getToken()}`
    });
    let params = new HttpParams();

    if (startTime) {
      params = params.set('startTime', startTime.toString());
    }

    if (endTime) {
      params = params.set('endTime', endTime.toString());
    }
  
    return this.http.get<any[]>(this.url,{headers:headers,params:params}).pipe(
      map((response: any) => response.logs) // Extract the 'messages' array from the response
    );;;
  }
}
