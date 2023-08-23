import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesUtilService } from '../../service/messages-util.service';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent {
  @Input() selectedContactId: number | null = null;

  constructor(private messagesUtilService: MessagesUtilService) {}

  public send(form: NgForm): void {
    if (form.value.newMessage && this.selectedContactId !== null) {
      this.messagesUtilService.addMessage(
        form.value.newMessage,
        this.selectedContactId
      );
      form.resetForm();
    }
  }

}
