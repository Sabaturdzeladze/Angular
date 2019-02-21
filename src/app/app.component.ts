import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // firebase sdk
    firebase.initializeApp({
      apiKey: "AIzaSyAbCk8V_KBhMrZvth2qcUbmjuLk-Z0-Puw",
      authDomain: "ng-recipe-book-6bb5e.firebaseapp.com"
    });
  }
}
