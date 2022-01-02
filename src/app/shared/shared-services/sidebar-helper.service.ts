import {Injectable} from '@angular/core';
import {SidebarDirective} from '../shared-directives/sidebar.directive';

@Injectable({
  providedIn: 'root'
})
export class SidebarHelperService {

  sidenavInstances: SidebarDirective[];

  constructor() {
    this.sidenavInstances = [];
  }

  /**
   * Set sidenav
   *
   */
  setSidenav(id, instance): void {
    this.sidenavInstances[id] = instance;
  }

  /**
   * Get sidenav
   *
   */
  getSidenav(id): SidebarDirective {
    console.log(this.sidenavInstances);
    return this.sidenavInstances[id];
  }
}
