
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
//import 
import { registerLocaleData, APP_BASE_HREF } from '@angular/common';
import localeArg from '@angular/common/locales/es-AR';

//Layaout
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './material/material.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { GaleryFormComponent } from './pages/galery/galery-form/galery-form.component';
import { ImagenItemComponent } from './pages/galery/imagen-item/imagen-item.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'


registerLocaleData(localeArg, 'es-AR');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    GaleryComponent,
    GaleryFormComponent,
    ImagenItemComponent,
    ComprasComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
