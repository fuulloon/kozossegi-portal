import { Injectable, OnDestroy } from '@angular/core';
import { Message, MessageAdd } from '../../model/message.model';
import { Store } from '../../store';
import { AuthStateService } from 'src/app/auth/service';
import { MessageDataService } from '../data/message-data.service';
import { Observable, combineLatest, map, takeUntil, tap } from 'rxjs';
import { UserStateService } from 'src/app/module/user/state';
import { MessageType } from '../../enum/messagetype.enum';

export interface MessageState {
  messages: Message[];
}
export const initialState: MessageState = {
  messages: [],
};

@Injectable()
export class MessageStateService extends Store<MessageState> implements OnDestroy {

  public constructor(
    private authStateService: AuthStateService,
    private messageDataService: MessageDataService,
    private userStateService: UserStateService
  ) {
    super(initialState);
  }

  public dispatchGetMessages(): void {
    //this.destroy$$.next();
    this.messageDataService
      .getMessages()
      .pipe(
        tap((messages) => this.setState({ ...this.getState$(), messages })),
        takeUntil(this.destroy$$)
      )
      .subscribe();
  }

  public dispatchCreateMessage(message: MessageAdd): void {
    this.messageDataService
      .createMessage(message)
      .pipe(
        tap(() => this.dispatchGetMessages()),
        takeUntil(this.destroy$$)
      )
      .subscribe();
  }

  public dispatchDeleteMessage(messageId: number): void {
    this.messageDataService
      .deleteMessage(messageId)
      .pipe(
        tap(() => this.dispatchGetMessages()),
        takeUntil(this.destroy$$)
      )
      .subscribe();
  }

  public getMessages(): Observable<Message[]> {
    return combineLatest([
      this.userStateService.getUsers(),
      this.getState$(),
    ]).pipe(
      map(([users, state]) => {
        return state.messages.map((message, _, messages) => {
          switch (message.type) {
            case MessageType.Notification:
              break;
            case MessageType.Post:
              message.fromUserName =
                users.find(user => user.id == message.fromUser)?.name;
              break;
            case MessageType.Message:
              message.fromUserName =
                users.find(user => user.id == message.fromUser)?.name;
              message.toUserName =
                users.find(user => user.id == message.toUser)?.name;
              break;
          }
          return message;
        });
      })
    );
  }

  public ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

}
