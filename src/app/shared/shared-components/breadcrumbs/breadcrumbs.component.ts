import {Component, Input} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export interface BreadCrumb {
    label: string;
    icon: string;
    status: boolean;
    initialRoute?: string;
    outlets?: any;
    url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
    @Input() separatorClass = '';
    breadcrumbs: Array<BreadCrumb>;
    subscription: Subscription;

    constructor(private router: Router, public route: ActivatedRoute) {
        this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((next) => {
                this.breadcrumbs = [];
                let currentRoute = this.route.root,
                    url = '';
                do {
                    const childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    childrenRoutes.forEach(routes => {
                        if (routes.outlet === 'primary') {
                            const routeSnapshot = routes.snapshot;
                            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                            if (routes.snapshot.data.breadcrumb !== undefined) {
                                let status = true;
                                if (routes.snapshot.data.status !== undefined) {
                                    status = routes.snapshot.data.status;
                                }
                                this.breadcrumbs.push({
                                    label: routes.snapshot.data.breadcrumb,
                                    icon: routes.snapshot.data.icon,
                                    status,
                                    url
                                });
                            }
                            currentRoute = routes;
                        }
                    });
                } while (currentRoute);
            });
    }
}
