import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './component/newsfeed.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { PostsComponent } from './component/posts/posts.component';
import { FormsModule } from '@angular/forms';
import { NewFormComponent } from './component/new-form/new-form.component';

const routes: Routes = [
  {
    path: '',
    component: NewsfeedComponent,
  }
];

@NgModule({
  declarations: [
    NewsfeedComponent,
    NotificationsComponent,
    PostsComponent,
    NewFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: []
})
export class NewsfeedModule { }
