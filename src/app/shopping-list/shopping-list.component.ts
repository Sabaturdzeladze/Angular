import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import * as fromShoppingList from "./store/shopping-list.reducers";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private slService: ShoppingListService,
    // giving Generic store the object we gave to forroot in app.module
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.shoppingListState = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
