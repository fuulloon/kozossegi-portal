import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsComponent } from './posts/posts.component';
import { MessageStateService } from 'src/app/shared/service/state/message-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-newsfeed',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent {
  @ViewChild('postForm') postForm!: NgForm;
  @ViewChild('postsComponentRef', { static: false })
  postsComponent!: PostsComponent;

  constructor(private messageStateService: MessageStateService) {}

  public send(form: NgForm): void {
    if (form.value.newPost) {
      this.messageStateService.dispatchCreateMessage(form.value.newPost);
      form.resetForm();
    }
  }
}
