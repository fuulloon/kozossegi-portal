import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesScreenComponent } from './component/messages-screen.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { MessagesComponent } from './component/messages/messages.component';
import { MessageComponent } from './component/messages/message/message.component';
import { SendFormComponent } from './component/send-form/send-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesUtilService } from './service/messages-util.service';

const routes: Routes = [
  {
    path: '',
    component: MessagesScreenComponent,
  },
  {
    path: ':id',
    component: MessagesScreenComponent
  }
];

@NgModule({
  declarations: [
    MessagesScreenComponent,
    ContactListComponent,
    MessagesComponent,
    MessageComponent,
    SendFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessagesUtilService
  ]
})
export class MessagesRoutingModule {}
