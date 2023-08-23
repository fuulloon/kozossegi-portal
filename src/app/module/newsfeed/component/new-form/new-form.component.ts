import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent {
  @ViewChild('postForm') postForm!: NgForm;
  /* @ViewChild('postsComponentRef', { static: false })
    postsComponent!: PostsComponent; */

  constructor(private messageStateService: MessageStateService) {}

  public send(form: NgForm): void {
    if (form.value.newPost) {
      this.messageStateService.dispatchCreateMessage(form.value.newPost);
      form.resetForm();
    }
  }
}
