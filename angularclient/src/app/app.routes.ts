import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Gallery } from './pages/gallery/gallery';
import { About } from './pages/about/about';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminMenuDashboard } from './pages/admin-menu-dashboard/admin-menu-dashboard';
import { AdminAddMenuitem } from './pages/admin-add-menuitem/admin-add-menuitem';
import { AdminUpdateMenuitem } from './pages/admin-update-menuitem/admin-update-menuitem';
import { AdminReportsDashboard } from './pages/admin-reports-dashboard/admin-reports-dashboard';
import { AdminReviewsDashboard } from './pages/admin-reviews-dashboard/admin-reviews-dashboard';
import { AdminAddReview } from './pages/admin-add-review/admin-add-review';
import { authGuard } from './auth-guard';

export const routes: Routes = [

    { path:'', redirectTo: 'home', pathMatch: 'full'},

    { path:'home', component: Home },
    { path: 'menu', component: Menu },
    { path:'gallery', component: Gallery },
    { path: 'about', component: About },
    { path: 'admin-login', component: AdminLogin },
    { path:'admin-dashboard', component: AdminDashboard, canActivate: [authGuard] },
    { path: 'admin-menu-dashboard', component: AdminMenuDashboard, canActivate: [authGuard]  },
    { path: 'admin-add-menuitem', component: AdminAddMenuitem, canActivate: [authGuard]  },
    { path:'admin-update-menuitem/:id', component: AdminUpdateMenuitem, canActivate: [authGuard]  },
    { path: 'admin-reports-dashboard', component: AdminReportsDashboard, canActivate: [authGuard]  },
    { path: 'admin-reviews-dashboard', component: AdminReviewsDashboard, canActivate: [authGuard]  },
    { path: 'admin-add-review', component: AdminAddReview, canActivate: [authGuard]  }, 

    { path: '**', redirectTo: 'home'}
];
 