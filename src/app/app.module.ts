import './rxjs.operators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NewsService } from './services/news.service';

import { SpinnerComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
