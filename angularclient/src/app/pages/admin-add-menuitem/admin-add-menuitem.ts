import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-add-menuitem',
  styleUrl: './admin-add-menuitem.css',
  templateUrl: './admin-add-menuitem.html',
})
export class AdminAddMenuitem implements OnInit{

  public newMenuItem = {
    itemName: '',
    treatType: '',
    itemTags: ''
  };

  public menuItems: any [] = [];

  constructor(private menuitemService: MenuitemService,
              private router: Router
  ) {}

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

  public onSubmit(): void {
    this.menuitemService.createMenuItem(this.newMenuItem).subscribe({
      next: (response) => {
        console.log('New Menu Item created.', response);

        this.newMenuItem = { itemName: '', treatType: '', itemTags:''};

        this.router.navigate(['/admin-menu-dashboard']);
      }, error: (err) => {
        console.error('Could not create menu item.', err);
      }
    })
  }

}
