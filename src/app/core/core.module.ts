import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule, AppRoutingModule],
  exports: [
    AppRoutingModule,
    // using HeaderComponent in app.component.html
    HeaderComponent
  ],
  // angular will merge them together as long as core module is loaded eagerly
  // in app.module
  providers: [
    RecipeService,
    DataStorageService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // adding interceptor
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true } // adding interceptor
    // not providing in whole app because we need it only in recipes
    // AuthGuard
  ]
})
export class CoreModule {}
