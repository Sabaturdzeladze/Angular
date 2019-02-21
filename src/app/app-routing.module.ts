import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  // using canLoad to protect the lazy loaded route, doing this in app-router,
  // because if not component will never render if we have it in recipes module
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },   // lazy loading
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    // prealoadingStrategy preloads lazy loaded apps after loading site
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
