import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    const token = this.authService.getToken();
    return this.httpClient.put(
      'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    // this.httpClient
    //   .get(
    //     'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json?auth=' + token, {
    //       observe: 'response',
    //       responseType: 'text' //'json' (default), 'blob', 'arraybuffer'
    //     }
    //   )
    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-6bb5e.firebaseio.com/recipes.json?auth=' + token
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
