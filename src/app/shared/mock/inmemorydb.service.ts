import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { UserRole } from '../enum/user-role.enum';
import { MessageType } from '../enum/messagetype.enum';
import { Message } from '../model/message.model';
import { User } from 'src/app/module/user/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class DbMockService implements InMemoryDbService {
  private users: User[] = [];
  private messages: Message[] = [];

  createDb() {

    this.users = [
      {
        id: 1,
        name: 'Admin',
        email: 'a@a.a',
        /* password: 'TVRJeg==', */
        password: 'MTIz',
        active: true,
        about: "Én vagyok az admin :)",
        markedUsers: [2],
        contacts: [3, 5],
        role: UserRole.Admin
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user2@b.c',
        password: 'MTIz',
        about: "Helló mindenki!",
        active: true,
        markedUsers: [],
        contacts: [3, 4],
        role: UserRole.User
      },
      {
        id: 3,
        name: 'User 3',
        email: 'use3@b.c',
        password: 'MTIz',
        about: "Nem mutatkozom be...",
        active: true,
        markedUsers: [],
        contacts: [1, 2],
        role: UserRole.User
      },
      {
        id: 4,
        name: 'User 4',
        email: 'user4@b.c',
        password: 'MTIz',
        about: "Hajrá Közösségi Portál :D",
        active: true,
        markedUsers: [5, 1],
        contacts: [],
        role: UserRole.User
      },
      {
        id: 5,
        name: 'User 5',
        email: 'user5@b.c',
        password: 'MTIz',
        about: "Ennyit rólam.",
        active: true,
        markedUsers: [],
        contacts: [1],
        role: UserRole.User
      },
      {
        id: 6,
        name: 'User 6',
        email: 'user6@b.c',
        password: 'MTIz',
        about: "Újabb user vagyok.",
        active: false,
        markedUsers: [],
        contacts: [],
        role: UserRole.User
      },
    ];

    this.messages = [
      {
        id: 0,
        type: MessageType.Notification,
        toUser: 1,
        message: 'Új ismerősnek jelölés: User 4',
        timestamp: '2023-08-07T11:34:56.789Z'
      },
      {
        id: 1,
        type: MessageType.Notification,
        toUser: 1,
        message: 'Új üzenet tőle: User 3',
        timestamp: '2023-08-07T11:34:56.789Z'
      },
      {
        id: 2,
        type: MessageType.Post,
        fromUser: 2,
        timestamp: '2023-08-07T11:34:56.789Z',
        message: 'Ez az első poszt'
      },
      {
        id: 3,
        type: MessageType.Post,
        fromUser: 5,
        timestamp: '2023-08-07T12:40:12.333Z',
        message: 'Itt pedig a második' },
      {
        id: 4,
        type: MessageType.Post,
        fromUser: 6,
        timestamp: '2023-08-07T15:50:44.555Z',
        message: 'Nyilván ez a harmadik'
      },
      {
        id: 5,
        type: MessageType.Message,
        fromUser: 1,
        toUser: 2,
        timestamp: '2023-08-07T11:34:56.789Z',
        message: 'Hello User 2!'
      },
      {
        id: 6,
        type: MessageType.Message,
        fromUser: 3,
        toUser: 1,
        timestamp: '2023-08-07T12:34:56.789Z',
        message: 'Hello User 1!'
      },
      {
        id: 7,
        type: MessageType.Message,
        fromUser: 1,
        toUser: 3,
        timestamp: '2023-08-07T13:34:56.789Z',
        message: 'Hello User!'
      },
      {
        id: 8,
        type: MessageType.Message,
        fromUser: 3,
        toUser: 1,
        timestamp: '2023-08-07T14:34:56.789Z',
        message: 'Mi a helyzet?'
      },
      {
        id: 9,
        type: MessageType.Message,
        fromUser: 1,
        toUser: 3,
        timestamp: '2023-08-07T15:34:56.789Z',
        message: 'Áh, semmi.'
      },
      {
        id: 10,
        type: MessageType.Message,
        fromUser: 5,
        toUser: 1,
        timestamp: '2023-08-07T16:34:56.789Z',
        message: 'Hello from User 5 to User 1'
      },
    ];

    return { users: this.users, messages: this.messages };
  }
}
