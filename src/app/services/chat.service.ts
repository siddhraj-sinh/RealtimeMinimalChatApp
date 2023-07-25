import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient,private user:UserService) { }
  url = "https://localhost:7152/api/messages"

  sendMessage(message:any):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.getToken()}`
    });
   return this.http.post(this.url,message,{headers: headers})
  }

  getMessages(userId: number, before?: Date, count: number = 20, sort: string = 'asc'):Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.getToken()}`
    });
    let params = new HttpParams()
    .set('userId', userId.toString())
    .set('count', count.toString())
    .set('sort', sort);

  if (before) {
    params = params.set('before', before.toISOString());
  }

  return this.http.get<any[]>(this.url, {headers:headers, params:params }).pipe(
    map((response: any) => response.messages) // Extract the 'messages' array from the response
  );;
  }

  editMessage(messageId:number,content:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.getToken()}`,
    });
    const body = { content: content };

    return this.http.put<any>(`${this.url}/${messageId}`, body, { headers: headers });
  }

   // Method to delete a message
   deleteMessage(messageId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.getToken()}`,
    });

    return this.http.delete<any>(`${this.url}/${messageId}`, { headers: headers });
  }
}
