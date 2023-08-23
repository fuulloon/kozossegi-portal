import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/model/message.model';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  public notifications$!: Observable<Message[]>;

  constructor(private messageStateService: MessageStateService) {}

  public ngOnInit() {
    this.notifications$ = this.messageStateService.getMessages();
  }

  public close(notificationId: number): void {
    this.messageStateService.dispatchDeleteMessage(notificationId);
  }

}
