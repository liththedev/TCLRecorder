import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { RecorderComponent } from './recorder/recorder.component';

const routes: Routes = [
  { path: 'recorder', component: RecorderComponent},
  { path: 'analysis', component: AnalysisComponent},
  { path: '**', redirectTo: '/recorder'},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
