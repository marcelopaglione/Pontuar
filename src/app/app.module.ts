import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VotarService } from './votar.service';
import { VotarComponent } from './votar/votar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VotarComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [VotarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
