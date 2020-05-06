import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component'
import { GaleryComponent } from './pages/galery/galery.component'
import { ComprasComponent } from './pages/compras/compras.component'
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// Nota: Las rutas deben ser protegidas por guardas para evitar los accesos no autorizados
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'galery', component: GaleryComponent },
  { path: 'compras', component: ComprasComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
