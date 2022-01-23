import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface IMenuItem {
  id?: string;
  type: string;       // Possible values: link/dropDown/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  active?: boolean;
  outlets?: any;
  initialRoute?: string;
  is_hide: boolean;
  role?: number;
}

export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
  outlets?: any;
  initialRoute?: string;
  is_hide: boolean;
  role?: number;
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false
  };
  private activeTabIndex = 0;

  constructor() {
  }

  defaultMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      state: '/dashboard',
      icon: 'i-Bar-Chart',
      initialRoute: '/',
      is_hide: false,
    }
  ];


  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // You can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string, permissions: Array<number> = []): void {
    function childHasPermission(menu: IMenuItem | IChildItem): boolean {
      return permissions.indexOf(menu.role) > -1;
    }

    function hasChild(menu: IMenuItem | IChildItem): boolean {
      return menu.sub.length > 0;
    }

    let defaultMenu: IMenuItem[] = this.defaultMenu;
    defaultMenu = defaultMenu.filter((mainMenu: IMenuItem) => {
      if (mainMenu.type == 'dropDown') {
        mainMenu.sub = mainMenu.sub.filter((childMenu: IChildItem) => {
          if (childMenu.type == 'link') {
            return childHasPermission(childMenu);
          } else {
            childMenu.sub = childMenu.sub.filter((child: IChildItem) => childHasPermission(child));
            return hasChild(childMenu);
          }
        });
        return hasChild(mainMenu);
      } else {
        return childHasPermission(mainMenu);
      }
    });
    this.menuItems.next(defaultMenu);
  }

}
