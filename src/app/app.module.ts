import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { AppRoutingModule } from './app-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { RecorderComponent } from './recorder/recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ImageContainerComponent,
    AnalysisComponent,
    RecorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
