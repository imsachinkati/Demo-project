import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIstComponent } from './modules/user/user-ist/user-ist.component';

const routes: Routes = [
  { path: '', component: UserIstComponent }, // Default route to the UserListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
