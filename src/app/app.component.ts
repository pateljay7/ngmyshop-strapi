import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { concat, first, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-my-shop';
  updateFound: boolean = false;
  isUpdating: boolean = false;
  constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private tosterService: ToastrService
  ) {
    (async () => {
      this.updateFound = await updates.checkForUpdate();
      if (this.updateFound)
        this.tosterService.success('Updated Found', '', {
          timeOut: undefined,
        });
      console.log('updateFound', this.updateFound);
    })();

    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    // const appIsStable$ = appRef.isStable.pipe(
    //   first((isStable) => isStable === true)
    // );
    // const everySixHours$ = interval(6 * 60 * 60 * 1000);
    // const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    //   appIsStable$.subscribe(()=>{

    //   })
    // everySixHoursOnceAppIsStable$.subscribe(async () => {
    //   try {
    //     const updateFound = await updates.checkForUpdate();
    //     console.log(
    //       updateFound
    //         ? 'A new version is available.'
    //         : 'Already on the latest version.'
    //     );
    //   } catch (err) {
    //     console.error('Failed to check for updates:', err);
    //   }
    // });
  }
  async updateAPP() {
    this.isUpdating = true;
    await this.updates.activateUpdate();
    this.isUpdating = false;
    document.location.reload();
  }
}
