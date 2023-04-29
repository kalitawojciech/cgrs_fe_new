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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AddEditCategoryComponent,
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
    { provide: API_BASE_URL, useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
