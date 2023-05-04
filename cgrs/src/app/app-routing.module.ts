import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/users/login/login.component';
import { AddEditCategoryComponent } from './domain/categories/add-edit-category.form/add-edit-category.form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesListComponent } from './domain/categories/categories-list/categories-list.component';
import { RegistrationComponent } from './domain/users/registration/registration.component';
import { AddEditGameComponent } from './domain/games/add-edit-game/add-edit-game.component';
import { GameDetailsComponent } from './domain/games/game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'category',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
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
  {
    path: 'game/:id',
    component: GameDetailsComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
  },
  {
    path: 'game/new',
    component: AddEditGameComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
  },
  {
    path: 'game/edit/:id',
    component: AddEditGameComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
