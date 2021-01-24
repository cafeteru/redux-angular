import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SonComponent } from './counter/son/son.component';
import { GrandchildComponent } from './counter/grandchild/grandchild.component';

@NgModule({
  declarations: [
    AppComponent,
    SonComponent,
    GrandchildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
