import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recoverycode',
    loadChildren: () => import('./pages/recoverycode/recoverycode.module').then( m => m.RecoverycodePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'negocio',
    loadChildren: () => import('./pages/negocio/negocio.module').then( m => m.NegocioPageModule)
  },
  {
    path: 'iniciaexito',
    loadChildren: () => import('./pages/iniciaexito/iniciaexito.module').then( m => m.IniciaexitoPageModule)
  },
  {
    path: 'funciona',
    loadChildren: () => import('./pages/funciona/funciona.module').then( m => m.FuncionaPageModule)
  },
  {
    path: 'grados',
    loadChildren: () => import('./pages/grados/grados.module').then( m => m.GradosPageModule)
  },
  {
    path: 'premios',
    loadChildren: () => import('./pages/premios/premios.module').then( m => m.PremiosPageModule)
  },
  {
    path: 'escuela',
    loadChildren: () => import('./pages/escuela/escuela.module').then( m => m.EscuelaPageModule)
  },
  {
    path: 'compromiso',
    loadChildren: () => import('./pages/compromiso/compromiso.module').then( m => m.CompromisoPageModule)
  },
  {
    path: 'oportunidades',
    loadChildren: () => import('./pages/oportunidades/oportunidades.module').then( m => m.OportunidadesPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'salud',
    loadChildren: () => import('./pages/salud/salud.module').then( m => m.SaludPageModule)
  },
  {
    path: 'glosario',
    loadChildren: () => import('./pages/glosario/glosario.module').then( m => m.GlosarioPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'detalles',
    loadChildren: () => import('./pages/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'confirmacion',
    loadChildren: () => import('./pages/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'empresaynegocio',
    loadChildren: () => import('./pages/empresaynegocio/empresaynegocio.module').then( m => m.EmpresaynegocioPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'menucatalogo',
    loadChildren: () => import('./pages/menucatalogo/menucatalogo.module').then( m => m.MenucatalogoPageModule)
  },  {
    path: 'yosoy',
    loadChildren: () => import('./pages/yosoy/yosoy.module').then( m => m.YosoyPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./pages/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'aviso',
    loadChildren: () => import('./pages/aviso/aviso.module').then( m => m.AvisoPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./pages/codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./pages/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./pages/tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'oxxo',
    loadChildren: () => import('./pages/oxxo/oxxo.module').then( m => m.OxxoPageModule)
  },
  {
    path: 'comocodigo',
    loadChildren: () => import('./pages/comocodigo/comocodigo.module').then( m => m.ComocodigoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
