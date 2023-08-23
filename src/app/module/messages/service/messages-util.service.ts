import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageContact } from '../model/message-contact.model';
import { Message } from 'src/app/shared/model/message.model';

import { UserStateService } from 'src/app/module/user/state';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';
import { AuthStateService } from 'src/app/auth/service';
import { MessageType } from 'src/app/shared/enum/messagetype.enum';


@Injectable()
export class MessagesUtilService {

  constructor(
    private http: HttpClient,
    private userStateService: UserStateService,
    private messagesStateService: MessageStateService,
    private authStateService: AuthStateService
  ) {}

  public getMessageContacts(): Observable<MessageContact[]> {
    return this.userStateService.getUsers().pipe(
      switchMap((users) => {
        const messageContacts: MessageContact[] = users
          .filter((user) => user.contactState === 'contact')
          .map((user) => ({
            userId: user.id,
            userName: user.name,
          }));
        return of(messageContacts);
      })
    );
  }

  public getMessagesWithUser(userId: number): Observable<Message[]> {
    return combineLatest([
      this.messagesStateService.getMessages(),
      this.authStateService
        .getAuthenticatedUser()
        .pipe(filter((authenticatedUser) => !!authenticatedUser))
      ])
      .pipe(
        map(([messages, authenticatedUser]) => {
          return messages.filter((message) =>
            (message.fromUser === userId &&
              message.toUser === authenticatedUser!.id) ||
            (message.fromUser === authenticatedUser!.id &&
              message.toUser === userId)
        );
      })
    );
  }

  public addMessage(messageText: string, toUser: number): void {
    this.authStateService.getAuthenticatedUser().pipe(
      filter(authenticatedUser => !!authenticatedUser),
      switchMap(authenticatedUser => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const newMessage = {
          type: MessageType.Message,
          fromUser: authenticatedUser!.id,
          toUser: toUser,
          message: messageText,
          timestamp: formattedDate,
        };
        this.messagesStateService.dispatchCreateMessage(newMessage);
        return of(null);
      })
    )
  }

}
