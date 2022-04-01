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
      name: $localize`:@@app.menu.dashboard:`,
      type: 'dropDown',
      tooltip: 'Dashboard',
      state: '/dashboard',
      icon: 'i-Bar-Chart',
      initialRoute: '/',
      is_hide: false,
      sub: [
        {icon: 'i-Administrator', name: $localize`:@@app.menu.invoices:`, initialRoute: '/dashboard', state: '/dashboard/invoices', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: $localize`:@@app.menu.sales:`, initialRoute: '/dashboard', state: '/dashboard/sales', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: $localize`:@@app.menu.expenses:`, initialRoute: '/dashboard', state: '/dashboard/expenses', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: $localize`:@@app.menu.payments:`, initialRoute: '/dashboard', state: '/dashboard/payments', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: $localize`:@@app.menu.projects:`, initialRoute: '/dashboard', state: '/dashboard/projects', type: 'link', is_hide: false},
        {icon: 'i-Administrator', name: $localize`:@@app.menu.tickets:`, initialRoute: '/dashboard', state: '/dashboard/tickets', type: 'link', is_hide: false}
      ]
    },
    {
      name: $localize`:@@app.menu.clients:`,
      type: 'dropDown',
      tooltip: 'Clients',
      icon: 'i-Business-ManWoman',
      is_hide: false,
      sub: [
        {icon: 'i-Business-ManWoman', name: $localize`:@@app.menu.customers:`, initialRoute: '/customers', state: '/customers', type: 'link', is_hide: false}
      ]
    },
    {
      name: $localize`:@@app.menu.sales:`,
      type: 'dropDown',
      tooltip: 'SALES',
      icon: 'i-Big-Data',
      is_hide: false,
      sub: [
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.invoices:`, initialRoute: '/sales', state: '/sales/invoices', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.estimates:`, initialRoute: '/sales', state: '/sales/estimates', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.expenses:`, initialRoute: '/sales', state: '/sales/expenses', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.payments:`, initialRoute: '/sales', state: '/sales/payments', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.items:`, initialRoute: '/sales', state: '/sales/items', type: 'link', is_hide: false},
        {icon: 'i-Big-Data', name: $localize`:@@app.menu.tax-rates:`, initialRoute: '/sales', state: '/sales/tax-rates', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-File', name:  $localize`:@@app.menu.contracts:`, state: '/hrms', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-File', name: $localize`:@@app.menu.contracts:`, initialRoute: '/contracts', state: '/contracts', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-Clock-4', name: $localize`:@@app.menu.projects:`, state: '/projects', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Clock-4', name: $localize`:@@app.menu.projects:`, initialRoute: '/projects', state: '/projects', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Check', name: $localize`:@@app.menu.tasks:`, state: '/tasks', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Check', name: $localize`:@@app.menu.tasks:`, initialRoute: '/tasks', state: '/tasks', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Ticket', name: $localize`:@@app.menu.tickets:`, state: '/tickets', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Ticket', name: $localize`:@@app.menu.tickets:`, initialRoute: '/tickets', state: '/tickets', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Checked-User', name: $localize`:@@app.menu.users:`, state: '/users', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-Checked-User', name: $localize`:@@app.menu.users:`, initialRoute: '/users', state: '/users', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-File-Horizontal-Text', name: $localize`:@@app.menu.notes:`, state: '/notes', type: 'dropDown', is_hide: false,
      sub: [{icon: 'i-File-Horizontal-Text', name: $localize`:@@app.menu.notes:`, initialRoute: '/notes', state: '/notes', type: 'link', is_hide: false}]
    },
    {
      icon: 'i-Statistic', name: $localize`:@@app.menu.reports:`, state: '/reports', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-Statistic', name: $localize`:@@app.menu.invoices:`, initialRoute: '/reports', state: '/reports/invoice', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.sales:`, initialRoute: '/reports', state: '/reports/sales', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.expenses:`, initialRoute: '/reports', state: '/reports/expenses', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.payments:`, initialRoute: '/reports', state: '/reports/payments', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.projects:`, initialRoute: '/reports', state: '/reports/projects', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.tickets:`, initialRoute: '/reports', state: '/reports/tasks', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.timesheets:`, initialRoute: '/reports', state: '/reports/timesheets', type: 'link', is_hide: false},
        {icon: 'i-Statistic', name: $localize`:@@app.menu.tickets:`, initialRoute: '/reports', state: '/reports/tickets', type: 'link', is_hide: false}
      ]
    },
    {
      icon: 'i-Gear', name: $localize`:@@app.menu.settings:`, state: '/settings', type: 'dropDown', is_hide: false,
      sub: [
        {icon: 'i-Gear', name: $localize`:@@app.menu.system:`, initialRoute: '/settings', state: '/settings/system', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.tickets:` , initialRoute: '/settings', state: '/settings/payment', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.invoices:` , initialRoute: '/settings', state: '/settings/invoice', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.estimates:`, initialRoute: '/settings', state: '/settings/estimate', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.themes:`, initialRoute: '/settings', state: '/settings/theme', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.tickets:`, initialRoute: '/settings', state: '/settings/ticket', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.menu:` , initialRoute: '/settings', state: '/settings/menu', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.custom-fields:`, initialRoute: '/settings', state: '/settings/custom-fields', type: 'link', is_hide: false},
        {icon: 'i-Gear', name: $localize`:@@app.menu.system-info:`, initialRoute: '/settings', state: '/settings/system-info', type: 'link', is_hide: false}
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
