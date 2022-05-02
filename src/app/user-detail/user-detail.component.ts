import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../core/interfaces/user.interface';
//step 3
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
//step 6
import { first, takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { getUsers } from '../store/app.actions';
import { selectCurrentUser, selectSimilarUsers, selectUsers } from '../store/app.selectors';
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
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.isComponentAlive = true;
    this.route.paramMap.pipe(
      takeWhile(() => !!this.isComponentAlive)
    )
      .subscribe(params => {
        const uuid = params.get('uuid');
        this.user$ = this.store.select(selectCurrentUser(uuid))
        this.similarUsers$ = this.store.select(selectSimilarUsers(uuid))
      });
  }

  ngOnDestroy() {
    this.isComponentAlive = false;
    this.getUsersIfNecessary();
  }
  //step 8
  getUsersIfNecessary() {
    this.store.select(selectUsers)
      .pipe(
        first()
      )
      .subscribe((users) => {
        if (users === null) {
          this.store.dispatch(getUsers())
        }
      })
  }
}
