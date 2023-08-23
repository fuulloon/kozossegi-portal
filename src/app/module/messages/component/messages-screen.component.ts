import { Component, OnInit } from '@angular/core';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  selector: 'app-messages-screen',
  templateUrl: './messages-screen.component.html',
  styleUrls: ['./messages-screen.component.scss']
})
export class MessagesScreenComponent implements OnInit {
  selectedContactId: number | null = null;

  constructor(private messageStateService: MessageStateService) {}

  ngOnInit(): void {
    this.messageStateService.dispatchGetMessages();
  }

  onContactSeleted(contactId: number) {
    this.selectedContactId = contactId;
  }

}
