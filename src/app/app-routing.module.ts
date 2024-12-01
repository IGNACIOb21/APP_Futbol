import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
    //canActivate:[NoAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    // canActivate: [AuthGuard]  // Comenta esta línea para probar la redirección sin el guardia
  },
  {
    path: 'arbitro',
    loadChildren: () => import('./pages/arbitro/loginArbitro/arbitro.module').then( m => m.ArbitroPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'estadistica-arbitro',
    loadChildren: () => import('./pages/arbitro/estadistica-arbitro/estadistica-arbitro.module').then( m => m.EstadisticaArbitroPageModule)
  },
  {
    path: 'tabs-arbitro',
    loadChildren: () =>
      import('./pages/arbitro/tabs-arbitro/tabs-arbitro.module').then(
        (m) => m.TabsArbitroPageModule
      ),
  },
  {
    path: 'tabs-buton' ,
    loadChildren: () => import('./pages/main/tabs-buton/tabs-buton.module').then( m => m.TabsButonPageModule)
  },
  {
    path: 'configuracion-arbitro',
    loadChildren: () => import('./pages/arbitro/configuracion-arbitro/configuracion-arbitro.module').then( m => m.ConfiguracionArbitroPageModule)
  },  {
    path: 'profile-arbitro',
    loadChildren: () => import('./pages/arbitro/profile-arbitro/profile-arbitro.module').then( m => m.ProfileArbitroPageModule)
  },
  {
    path: 'home-arbitro',
    loadChildren: () => import('./pages/arbitro/home-arbitro/home-arbitro.module').then( m => m.HomeArbitroPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./main/agendar/agendar.module').then( m => m.AgendarPageModule)
  }



  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
