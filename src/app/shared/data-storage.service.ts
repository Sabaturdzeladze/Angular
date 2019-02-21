import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afsoenlfas');
    // return this.httpClient.put(
    //   'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers
    //   }
    // );
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      // { reportProgress: true, params: new HttpParams().set('auth', token) }    // good for uploading or downloading things
      { reportProgress: true }
    );

    return this.httpClient.request(req);
  }

  fetchRecipes() {
    // this.httpClient
    //   .get(
    //     'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json?auth=' + token, {
    //       observe: 'response',
    //       responseType: 'text' //'json' (default), 'blob', 'arraybuffer'
    //     }
    //   )
    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json',
        // { params: new HttpParams().set('auth', token) }
        { observe: 'body', responseType: 'json' }
      )
      .pipe(
        map(recipes => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
