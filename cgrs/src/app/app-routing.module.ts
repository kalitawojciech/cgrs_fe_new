import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/users/login/login.component';
import { AddEditCategoryComponent } from './domain/categories/add-edit-category.form/add-edit-category.form.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'category/edit/:id',
    component: AddEditCategoryComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
  },
  {
    path: 'category/new',
    component: AddEditCategoryComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
