import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Review } from './pages/review/review';
import { Gallery } from './pages/gallery/gallery';
import { About } from './pages/about/about';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminMenuDashboard } from './pages/admin-menu-dashboard/admin-menu-dashboard';
import { AdminAddMenuitem } from './pages/admin-add-menuitem/admin-add-menuitem';
import { AdminUpdateMenuitem } from './pages/admin-update-menuitem/admin-update-menuitem';
import { AdminReportsDashboard } from './pages/admin-reports-dashboard/admin-reports-dashboard';
import { AdminReviewsDashboard } from './pages/admin-reviews-dashboard/admin-reviews-dashboard';

export const routes: Routes = [

    { path:'', redirectTo: 'home', pathMatch: 'full'},

    { path:'home', component: Home },
    { path: 'menu', component: Menu },
    { path: 'review', component: Review },
    { path:'gallery', component: Gallery },
    { path: 'about', component: About },
    { path: 'admin-login', component: AdminLogin },
    { path:'admin-dashboard', component: AdminDashboard },
    { path: 'admin-menu-dashboard', component: AdminMenuDashboard },
    { path: 'admin-add-menuitem', component: AdminAddMenuitem },
    { path:'admin-update-menuitem/:id', component: AdminUpdateMenuitem },
    { path: 'admin-reports-dashboard', component: AdminReportsDashboard },
    { path: 'admin-reviews-dashboard', component: AdminReviewsDashboard }, 

    { path: '**', redirectTo: 'home'}
];
 