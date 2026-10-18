import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';

@Component({
  imports: [CommonModule],
  selector: 'app-admin-update-menuitem',
  styleUrl: './admin-update-menuitem.css',
  templateUrl: './admin-update-menuitem.html',
})
export class AdminUpdateMenuitem implements OnInit{

  public menuItems: any [] = [];

  constructor(private MenuitemService: MenuitemService) {}

  ngOnInit(): void {
    
    this.MenuitemService.getMenuItems().subscribe({

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
