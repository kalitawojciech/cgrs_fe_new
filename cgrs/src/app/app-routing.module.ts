import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/users/login/login.component';
import { AddEditCategoryComponent } from './domain/categories/add-edit-category.form/add-edit-category.form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesListComponent } from './domain/categories/categories-list/categories-list.component';
import { RegistrationComponent } from './domain/users/registration/registration.component';
import { AddEditGameComponent } from './domain/games/add-edit-game/add-edit-game.component';
import { GameDetailsComponent } from './domain/games/game-details/game-details.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { AccessForbiddenPageComponent } from './core/pages/access-forbidden-page/access-forbidden-page.component';
import { Role } from './core/constants';
import { GamesListComponent } from './domain/games/games-list/games-list.component';
import { RecommendGamesListComponent } from './domain/games/recommend-games-list/recommend-games-list.component';

const routes: Routes = [
  {
    path: '',
    component: GamesListComponent
  },
  {
    path: 'games-list',
    component: GamesListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'recommend',
    component: RecommendGamesListComponent,
  },
  {
    path: 'category',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'category/new',
    component: AddEditCategoryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'category/edit/:id',
    component: AddEditCategoryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'game/new',
    component: AddEditGameComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'game/:id',
    component: GameDetailsComponent,
  },
  {
    path: 'game/edit/:id',
    component: AddEditGameComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'access-forbidden', // 403,
    component: AccessForbiddenPageComponent,
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
