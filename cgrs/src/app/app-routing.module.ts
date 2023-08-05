import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/users/login/login.component';
import { AddEditCategoryComponent } from './domain/categories/add-edit-category/add-edit-category.component';
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
import { UserListComponent } from './domain/users/user-list/user-list.component';
import { AddEditTagComponent } from './domain/tags/add-edit-tag/add-edit-tag.component';
import { TagsListComponent } from './domain/tags/tags-list/tags-list.component';
import { ResetPasswordComponent } from './domain/users/reset-password/reset-password.component';
import { ChangePasswordComponent } from './domain/users/change-password/change-password.component';
import { UserProfileComponent } from './domain/users/user-profile/user-profile.component';

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
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'recommend',
    component: RecommendGamesListComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
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
    path: 'tag',
    component: TagsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'tag/new',
    component: AddEditTagComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'tag/edit/:id',
    component: AddEditTagComponent,
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
