import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-admin-back',
  styleUrl: './admin-back.css',
  templateUrl: './admin-back.html',
})
export class AdminBack {
  private router = inject(Router);

  currentUrl: string = '';

  goBack(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl.includes('/admin-menu-dashboard') || this.currentUrl.includes('/admin-reviews-dashboard') || this.currentUrl.includes('/admin-reports-dashboard')) {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.currentUrl.includes('/admin-add-menuitem') || this.currentUrl.includes('/admin-update-menuitem')) {
      this.router.navigate(['/admin-menu-dashboard']);
    } else if (this.currentUrl.includes('/admin-add-review')) {
      this.router.navigate(['/admin-reviews-dashboard']);
    }
  }
  
}
