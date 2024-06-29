import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"",component:HyperlinkComponent},
  {path:"hyperlinks",component:HyperlinkComponent},
  {path:"search",component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
