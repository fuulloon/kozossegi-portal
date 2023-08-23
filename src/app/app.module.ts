import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DbMockService } from './shared/mock/inmemorydb.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user/user.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MessageDataService } from './shared/service/data/message-data.service';
import { MessageStateService } from './shared/service/state/message-state.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    UserModule,
    InMemoryWebApiModule.forRoot(DbMockService, { delay: 0 })
  ],
  providers: [
    MessageDataService,
    MessageStateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
