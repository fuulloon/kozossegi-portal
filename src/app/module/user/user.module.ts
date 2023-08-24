import { NgModule } from '@angular/core';
import { UserDataService } from './data';
import { UserStateService } from './state';

@NgModule({
  providers: [
    UserDataService,
    UserStateService
  ],
})
export class UserModule {}
