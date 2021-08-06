import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardReaderRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CardReaderService {

  constructor() { }

  readCard = (request: CardReaderRequest): Observable<boolean> => {
    //  mock api call to validate
    return of(request).pipe(
      switchMap((request) => {
        if(request.securityCode === '333') {
          throw new Error();
        }
        return of(true);
      })
    )
  }

}
