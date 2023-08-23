import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Message, MessageAdd } from '../../model/message.model';

@Injectable()
export class MessageDataService {
  //private apiUrl = 'http://localhost:3000/messages';
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  public createMessage(message: MessageAdd): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  public deleteMessage(messageId: number): Observable<Message> {
    return this.http.delete<Message>(`${this.apiUrl}/${messageId}`);
  }
}
