import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class SearchService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(startAt): FirebaseListObservable<any> {
    return this.db.list('/test', {
      query: {
        //orderByChild: 'name'
        limitToFirst: 10,
        startAt: startAt
      }
    })
  }

}
