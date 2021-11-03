import { Component, OnInit, VERSION } from '@angular/core';
import { of, Subject, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry, retryWhen, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  public sub$: Subject<null> = new Subject();

  ngOnInit() {
    this.sub$
      .pipe(
        switchMap(() => this.getValue()),
        tap((v) => console.log('tap ', v)),
        // catchError((err) => {
        //   console.log(err);
        //   return of(err);
        // }),
        retryWhen((err) => {
          return err.pipe(tap((c) => console.log('tap2', c)));
        })

        // retry()
      )
      .subscribe();

    this.sub$.next(null);
  }

  private getValue(): Observable<any> {
    console.log('fetch');
    return throwError('sd');
    // return of(22)
  }

  public emit(): void {
    this.sub$.next(null);
  }
}
