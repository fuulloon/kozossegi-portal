import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/model/message.model';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public notifications$!: Observable<Message[]>;

  constructor(private messageStateService: MessageStateService) {}

  public close(notificationId: number): void {
    this.messageStateService.dispatchDeleteMessage(notificationId);
  }

  public ngOnDestroy(): void {
  }

  public ngOnInit() {
  }

  private getNotifications(): void {
    this.notifications$ = this.messageStateService.getMessages();
  }

}
