import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  selector: 'app-messages-screen',
  templateUrl: './messages-screen.component.html',
  styleUrls: ['./messages-screen.component.scss']
})
export class MessagesScreenComponent implements OnInit {
  selectedContactId: number | null = null;

  constructor(private messageStateService: MessageStateService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.selectedContactId = +params['id'];
      }
    });
    this.messageStateService.dispatchGetMessages();
  }

  onContactSeleted(contactId: number) {
    this.selectedContactId = contactId;
  }

}
