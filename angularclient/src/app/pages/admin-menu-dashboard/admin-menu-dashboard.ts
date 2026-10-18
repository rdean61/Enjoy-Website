import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';

@Component({
  imports: [CommonModule],
  selector: 'app-admin-menu-dashboard',
  styleUrl: './admin-menu-dashboard.css',
  templateUrl: './admin-menu-dashboard.html',
})
export class AdminMenuDashboard implements OnInit{

  public menuItems: any[] = [];

  constructor(private menuitemService: MenuitemService) {}

  ngOnInit(): void {
    
    this.menuitemService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data;
        console.log('Menuitems loaded: ', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

     });

  }


}
