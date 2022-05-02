import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../core/interfaces/user.interface';
//step 3
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
//step 6
import { takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { selectCurrentUser, selectSimilarUsers } from '../store/app.selectors';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  // user: IUser = null;
  // similarUsers: IUser[] = [];
  // isComponentAlive: boolean;

  //step 3
  user$: Observable<IUser> = null;
  similarUsers$: Observable<IUser[]> = null;
  isComponentAlive: boolean;


  constructor() {
  }

  ngOnInit() {
    this.isComponentAlive = true;
  }

  ngOnDestroy() {
    this.isComponentAlive = false;
  }
}
