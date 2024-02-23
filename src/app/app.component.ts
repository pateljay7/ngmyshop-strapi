import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { concat, first, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-my-shop';
  updateFound: boolean = false;
  isUpdating: boolean = false;
  isOnline: boolean = false;
  tost: ActiveToast<any> | null = null;
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
  ngOnInit(): void {
    this.updateOnlineStatus();
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }
  async updateAPP() {
    this.isUpdating = true;
    await this.updates.activateUpdate();
    this.isUpdating = false;
    document.location.reload();
  }
  updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
    if (!this.isOnline)
      this.tost = this.tosterService.error('Seems like you are offline', '', {
        disableTimeOut: true,
        closeButton: false,
        timeOut: 0,
        extendedTimeOut: 0,
        tapToDismiss: false,
      });
    else if (this.tost) this.tosterService.clear(this.tost.toastId);
  }
}
