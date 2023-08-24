import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MessageType } from 'src/app/shared/enum/messagetype.enum';
import { Message } from 'src/app/shared/model/message.model';
import { MessageStateService } from "src/app/shared/service/state/message-state.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts$!: Observable<Message[]>;

  constructor(private messageStateService: MessageStateService) {}

  public ngOnInit(): void {
    this.posts$ = this.messageStateService
      .getMessages(MessageType.Post)
      .pipe(map((posts) => posts.sort((a, b) => b.id - a.id)));
  }
}
