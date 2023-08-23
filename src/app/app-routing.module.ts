import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

import { SigninComponent } from './auth/component/signin/signin.component';
import { SignupComponent } from './auth/component/signup/signup.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/newsfeed',
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./module/user/user-routing.module')
        .then(m => m.UserRoutingModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'newsfeed',
    loadChildren: () =>
      import('./module/newsfeed/newsfeed.module')
        .then((m) => m.NewsfeedModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./module/messages/messages-routing.module')
        .then((m) => m.MessagesRoutingModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/newsfeed',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
