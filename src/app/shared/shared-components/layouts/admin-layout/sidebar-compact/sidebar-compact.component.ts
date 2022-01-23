import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Utils} from '../../../../utils';
import {IMenuItem, NavigationService} from '../../../../shared-services/navigation.service';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-sidebar-compact',
  templateUrl: './sidebar-compact.component.html',
  styleUrls: ['./sidebar-compact.component.scss']
})
export class SidebarCompactComponent implements OnInit {
  selectedItem: IMenuItem;
  // defaultLanguage = 'en';
  translationArray: any;

  nav: IMenuItem[];
  @ViewChild(PerfectScrollbarDirective) perfectScrollbar: PerfectScrollbarDirective;

  constructor(public router: Router,
              public navService: NavigationService) {
  }

  ngOnInit(): void {
    this.updateSidebar();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((routeChange: any) => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });

    this.navService.menuItems$.subscribe((items: any) => {
      this.nav = items;
      this.setActiveFlag();
    });
  }

  selectItem(item: any): void {
    this.navService.sidebarState.childnavOpen = true;
    this.selectedItem = item;
    this.setActiveMainItem(item);
  }

  closeChildNav(): void {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item: any): void {
    this.setActiveMainItem(item);
  }

  setActiveMainItem(item: any): void {
    this.nav.forEach((data: any) => {
      data.active = false;
    });
    item.active = true;
  }

  setActiveFlag(): void {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav.forEach((item: any) => {
        item.active = false;
        item.is_hide = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach((subItem: any) => {
            subItem.active = false;
            subItem.is_hide = false;
            item.is_hide = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach((subChildItem: any) => {
                subChildItem.is_hide = false;
                subItem.is_hide = false;
                item.is_hide = false;
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  updateSidebar(): void {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } else {
      this.navService.sidebarState.sidenavOpen = true;
    }
  }

  toggleSidebar(): void {
    const state = this.navService.sidebarState;
    state.sidenavOpen = !state.sidenavOpen;
    state.childnavOpen = !state.childnavOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateSidebar();
  }
}
