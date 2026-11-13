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
import { Holidays } from './pages/holidays/holidays'
import { authGuard } from './auth-guard';

export const routes: Routes = [

    { path:'', redirectTo: 'home', pathMatch: 'full'},

    { path:'home', component: Home, title: 'Home | Enjoy Cheesecakes & Treats' },
    { path: 'menu', component: Menu, title: 'Menu | Enjoy Cheesecakes & Treats' },
    { path:'gallery', component: Gallery, title: 'Gallery | Enjoy Cheesecakes & Treats' },
    { path: 'about', component: About, title: 'About | Enjoy Cheesecakes & Treats' },
    { path: 'holidays', component: Holidays, title: 'Holiday Menu | Enjoy Cheesecakes & Treats' },
    { path: 'admin-login', component: AdminLogin, title: 'Admin Login | Enjoy Cheesecakes & Treats' },
    { path:'admin-dashboard', component: AdminDashboard, title: 'Admin Dashboard | Enjoy Cheesecakes & Treats', canActivate: [authGuard] },
    { path: 'admin-menu-dashboard', component: AdminMenuDashboard, title: 'Menu Dashboard | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },
    { path: 'admin-add-menuitem', component: AdminAddMenuitem, title: 'Add Menu Item | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },
    { path:'admin-update-menuitem/:id', component: AdminUpdateMenuitem, title: 'Update Menu Item | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },
    { path: 'admin-reports-dashboard', component: AdminReportsDashboard, title: 'Reports Dashboard | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },
    { path: 'admin-reviews-dashboard', component: AdminReviewsDashboard, title: 'Reviews Dashboard | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },
    { path: 'admin-add-review', component: AdminAddReview, title: 'Add Review | Enjoy Cheesecakes & Treats', canActivate: [authGuard]  },

    { path: '**', redirectTo: 'home'}
];
 