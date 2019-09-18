import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { count, delay } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

describe('Async Testing Example', () => {
  it('Async test example with Jasmine done()', (done: DoneFn) => {

    let test = false;

    setTimeout(() => {

      test = true;

      expect(test).toBeTruthy();

      done();

    }, 1000);
  });

  it('Async test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {
    });

    setTimeout(() => {

      test = true;

    }, 1000);

    // move the clock forward for 1000 milliseconds
    // tick(1000);

    // execute all the timer that are pending
    flush();

    expect(test).toBeTruthy();

  }));

  it('Async test example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {

      return Promise.resolve();
    })
      .then(() => {

        test = true;

        console.log('Second Promise executed');

      });

    // wait for the full promise chain to be executed
    flushMicrotasks();

    expect(test).toBeTruthy();

  }));

  it('Async test example - Promises + setTimeout()', fakeAsync(() => {

    let counter = 0;

    Promise.resolve().then(() => {

      counter += 10;

      setTimeout(() => {

        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);


  }));

  it('Async test example - Observable', fakeAsync(() => {

    let test = false;

    console.log('Creating Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    });

    tick(1000);

    expect(test).toBe(true);

  }));

});
