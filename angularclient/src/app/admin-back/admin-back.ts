import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-admin-back',
  styleUrl: './admin-back.css',
  templateUrl: './admin-back.html',
})
export class AdminBack {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
  
}
