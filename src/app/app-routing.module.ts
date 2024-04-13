import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RepoListingPageComponent } from './components/repo-listing-page/repo-listing-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/remp-listing', pathMatch: 'full' },
  { path: 'remp-listing', component: RepoListingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
