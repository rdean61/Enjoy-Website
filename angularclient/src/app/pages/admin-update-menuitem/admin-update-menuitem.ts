import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-update-menuitem',
  styleUrl: './admin-update-menuitem.css',
  templateUrl: './admin-update-menuitem.html',
})
export class AdminUpdateMenuitem implements OnInit{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private menuItemService = inject(MenuitemService);

  public menuItem: any = {
    itemName: '',
    treatType: '',
    itemTags: ''
  };

  public itemId: string | null = null;

  public menuItems: any [] = [];

  ngOnInit(): void {

    this.itemId = this.route.snapshot.paramMap.get('id');
    
    if (this.itemId) {

      this.menuItemService.getMenuItems().subscribe({

        next: (data) => {
          const retrieved = data.find(i => String(i.id || i._id) === String(this.itemId));
          if (retrieved){
            this.menuItem = {...retrieved};
          }
        },
        error: (err) => {
          console.error('Integration Error', err);
        }

      });
    }
  }

  public onSubmitUpdate(): void {
    if (!this.itemId) return;

    this.menuItemService.updateMenuItem(this.itemId, this.menuItem).subscribe({

      next: () => {
        this.router.navigate(['/admin-menu-dashboard']);
      }, 
      error: (err) =>
        console.error('Error updating item', err)

    });
  }

}
