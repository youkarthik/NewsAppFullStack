import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { CardComponent } from './card/card.component';
import { ContainerComponent } from './container/container.component';
import { NewsService } from './services/newsservice';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    ContainerComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule, RoutingModule, MaterialModule, BrowserAnimationsModule, HttpModule, HttpClientModule, FormsModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
