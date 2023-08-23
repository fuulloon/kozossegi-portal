import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
];

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class UserRoutingModule {}
