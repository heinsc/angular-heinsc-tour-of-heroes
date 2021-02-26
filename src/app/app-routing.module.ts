import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule {
  const routes: Routes = [
    { path: 'heroes', component: HeroesComponent }
  ];
}
