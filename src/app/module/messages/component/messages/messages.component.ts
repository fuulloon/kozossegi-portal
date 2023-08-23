import { Message } from 'src/app/shared/model/message.model';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MessagesUtilService } from '../../service/messages-util.service';
import { Observable, map, of } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnChanges {
  @Input() public selectedContactId: number | null = null;
  public messages$: Observable<Message[]> = of([]);

  constructor(private messagesUtilService: MessagesUtilService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedContactId']) {
      if (this.selectedContactId) {
        this.messages$ =
          this.messagesUtilService.getMessagesWithUser(this.selectedContactId)
          .pipe(map(messages => messages = messages.sort((a, b) => b.id - a.id)))
      }
    }
  }

}
