import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => this.store.dispatch(new AuthActions.Signup()))
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new AuthActions.Signin());
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          });
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
