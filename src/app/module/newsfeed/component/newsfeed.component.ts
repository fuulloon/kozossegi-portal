import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent {

  constructor(private messageStateService: MessageStateService) {}

  ngOnInit(): void {
    this.messageStateService.dispatchGetMessages();
  }

}
