import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { RandomizerComponent } from './components/randomizer/randomizer.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { authGuard } from './guards/auth.guard';
import { LogInComponent } from './components/auth/log-in/log-in.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {
    path: 'randomize',
    component: RandomizerComponent,
  },
  {
    path: 'addStudent',
    component: NewStudentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login', 
    component: LogInComponent
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        c => c.RegisterComponent
      )
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },

];
