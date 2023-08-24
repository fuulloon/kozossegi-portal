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
import { StoreModule } from '@ngrx/store';
import { userReducer } from './module/user/ngrx/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './module/user/ngrx/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    InMemoryWebApiModule.forRoot(DbMockService, { delay: 0 }),
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [
    MessageDataService,
    MessageStateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
