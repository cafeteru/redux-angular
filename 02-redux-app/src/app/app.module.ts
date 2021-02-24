import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SonComponent } from './counter/son/son.component';
import { GrandchildComponent } from './counter/grandchild/grandchild.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/counter.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SonComponent,
    GrandchildComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
