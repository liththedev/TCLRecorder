import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { ImageContainerComponent } from './image-container/image-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageLoaderComponent,
    ImageContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
