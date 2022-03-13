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
      type: 'dropDown',
      tooltip: 'Dashboard',
      state: '/dashboard',
      icon: 'i-Bar-Chart',
      initialRoute: '/',
      is_hide: false,
      sub: [
        {icon: 'i-Administrator', name: 'INVOICES', initialRoute: '/dashboard', state: '/dashboard/invoices', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: 'SALES', initialRoute: '/dashboard', state: '/dashboard/sales', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: 'EXPENSES', initialRoute: '/dashboard', state: '/dashboard/expenses', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: 'PAYMENTS', initialRoute: '/dashboard', state: '/dashboard/payments', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: 'PROJECTS', initialRoute: '/dashboard', state: '/dashboard/projects', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: 'TICKETS', initialRoute: '/dashboard', state: '/dashboard/tickets', type: 'link', is_hide: false}
      ]
    },
    {
      name: 'CLIENTS',
      type: 'dropDown',
      tooltip: 'Clients',
      icon: 'i-Business-ManWoman',
      is_hide: false,
      sub: [
        {icon: 'i-Business-ManWoman', name: 'CUSTOMER', initialRoute: '/customer', state: '/customer', type: 'link', is_hide: false}
      ]
    },
    {
      name: 'SALES',
      type: 'dropDown',
      tooltip: 'SALES',
      icon: 'i-Big-Data',
      is_hide: false,
      sub: [
        {icon: 'i-Big-Data', name: 'INVOICES', initialRoute: '/sales', state: '/sales/invoices', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'ESTIMATES', initialRoute: '/sales', state: '/sales/estimates', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'CREDIT-NOTES', initialRoute: '/sales', state: '/sales/credit-notes', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'EXPENSES', initialRoute: '/sales', state: '/sales/expenses', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'PAYMENTS', initialRoute: '/sales', state: '/sales/payments', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'ITEMS', initialRoute: '/sales', state: '/sales/items', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: 'TAX-RATES', initialRoute: '/sales', state: '/sales/tax-rates', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-File', name: 'CONTRACTS', state: '/hrms', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-File', name: 'CONTRACTS', initialRoute: '/contracts', state: '/contracts', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-Clock-4', name: 'PROJECTS', state: '/projects', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Clock-4', name: 'PROJECTS', initialRoute: '/projects', state: '/projects', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Check', name: 'TASKS', state: '/tasks', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Check', name: 'TASKS', initialRoute: '/tasks', state: '/tasks', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Ticket', name: 'TICKETS', state: '/tickets', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Ticket', name: 'TICKETS', initialRoute: '/tickets', state: '/tickets', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Checked-User', name: 'USERS', state: '/users', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Checked-User', name: 'USERS', initialRoute: '/users', state: '/users', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-File-Horizontal-Text', name: 'NOTES', state: '/notes', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-File-Horizontal-Text', name: 'NOTES', initialRoute: '/notes', state: '/notes', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Statistic', name: 'REPORTS', state: '/reports', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-Statistic', name: 'INVOICING', initialRoute: '/reports', state: '/reports/invoice', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'SALES', initialRoute: '/reports', state: '/reports/sales', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'EXPENSES', initialRoute: '/reports', state: '/reports/expenses', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'PAYMENTS', initialRoute: '/reports', state: '/reports/payments', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'PROJECTS', initialRoute: '/reports', state: '/reports/projects', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'TASKS', initialRoute: '/reports', state: '/reports/tasks', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'TIMESHEETS', initialRoute: '/reports', state: '/reports/timesheets', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: 'TICKETS', initialRoute: '/reports', state: '/reports/tickets', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-Gear', name: 'SETTINGS', state: '/settings', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-Gear', name: 'SYSTEM', initialRoute: '/settings', state: '/settings/system', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'PAYMENT', initialRoute: '/settings', state: '/settings/payment', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'INVOICE', initialRoute: '/settings', state: '/settings/invoice', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'ESTIMATE', initialRoute: '/settings', state: '/settings/estimate', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'THEME', initialRoute: '/settings', state: '/settings/theme', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'TICKET', initialRoute: '/settings', state: '/settings/ticket', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'MENU', initialRoute: '/settings', state: '/settings/menu', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'CUSTOM-FIELDS', initialRoute: '/settings', state: '/settings/custom-fields', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'TRANSLATIONS', initialRoute: '/settings', state: '/settings/translations', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: 'SYSTEM-INFO', initialRoute: '/settings', state: '/settings/system-info', type: 'link', is_hide: false}
      ]
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
