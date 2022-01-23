import {Component} from '@angular/core';
import {NavigationService} from '../../../../shared-services/navigation.service';
import {SearchService} from '../../../../shared-services/search.service';
import {LocalStoreService} from '../../../../shared-services/local-store.service';

@Component({
  selector: 'app-header-sidebar-compact',
  templateUrl: './header-sidebar-compact.component.html',
  styleUrls: ['./header-sidebar-compact.component.scss']
})
export class HeaderSidebarCompactComponent {
  notifications: any[];
  user = {
    name: '',
    username: '',
    avatar: '',
    email: ''
  };

  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private ls: LocalStoreService
  ) {
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat'
      },
      {
        icon: 'i-Receipt-3',
        title: 'New order received',
        badge: '$4036',
        text: '1 Headphone, 3 iPhone x',
        time: new Date('11/11/2018'),
        status: 'success',
        link: '/tables/full'
      },
      {
        icon: 'i-Empty-Box',
        title: 'Product out of stock',
        text: 'Headphone E67, R98, XL90, Q77',
        time: new Date('11/10/2018'),
        status: 'danger',
        link: '/tables/list'
      },
      {
        icon: 'i-Data-Power',
        title: 'Server up!',
        text: 'Server rebooted successfully',
        time: new Date('11/08/2018'),
        status: 'success',
        link: '/dashboard/v2'
      },
      {
        icon: 'i-Data-Block',
        title: 'Server down!',
        badge: 'Resolved',
        text: 'Region 1: Server crashed!',
        time: new Date('11/06/2018'),
        status: 'danger',
        link: '/dashboard/v3'
      }
    ];
    this.user = {
      name: this.ls.getItem('name'),
      username: this.ls.getItem('username'),
      avatar: this.ls.getItem('avatar'),
      email: this.ls.getItem('email')
    };
  }

  toggleSidebar(): void {
    const state = this.navService.sidebarState;
    state.sidenavOpen = !state.sidenavOpen;
    state.childnavOpen = !state.childnavOpen;
  }

  signOut(): void {
    // this.auth.signout();
  }
}
