import { NgModule } from '@angular/core';
import { UserDataService } from './data';
import { UserStateService } from './state';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    UserDataService,
    UserStateService
  ],
})
export class UserModule {}
