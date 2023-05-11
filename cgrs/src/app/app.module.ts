import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './domain/users/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { API_BASE_URL } from './core/services/api.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddEditCategoryComponent } from './domain/categories/add-edit-category.form/add-edit-category.form.component';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { CategoriesListComponent } from './domain/categories/categories-list/categories-list.component';
import { RegistrationComponent } from './domain/users/registration/registration.component';
import { AddEditGameComponent } from './domain/games/add-edit-game/add-edit-game.component';
import { GameDetailsComponent } from './domain/games/game-details/game-details.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { AccessForbidenPageComponent } from './core/pages/access-forbiden-page/access-forbiden-page.component';
import { AddEditGameMarkModalComponent } from './domain/games/add-edit-game-mark-modal/add-edit-game-mark-modal.component';
import { GameCardComponent } from './domain/games/game-card/game-card.component';
import { ErrorInterceptor } from './core/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AddEditCategoryComponent,
    CategoriesListComponent,
    RegistrationComponent,
    AddEditGameComponent,
    GameDetailsComponent,
    PageNotFoundComponent,
    AccessForbidenPageComponent,
    AddEditGameMarkModalComponent,
    GameCardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
