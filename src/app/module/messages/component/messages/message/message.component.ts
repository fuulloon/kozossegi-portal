import { Component, Input } from '@angular/core';
import { Message } from 'src/app/shared/model/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: Message | null = null;
  @Input() contactId: number | null = null;
}
