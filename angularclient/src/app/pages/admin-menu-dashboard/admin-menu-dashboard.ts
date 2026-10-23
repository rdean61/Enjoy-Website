import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-admin-menu-dashboard',
  styleUrl: './admin-menu-dashboard.css',
  templateUrl: './admin-menu-dashboard.html',
})
export class AdminMenuDashboard implements OnInit{

  private router = inject(Router);

  public menuItems: any[] = [];

  public displayItems: any[] = [];

  public displayTreatType: string = 'mini';

  public searchContent: string = '';

  public deletedIds: string[] =[];

  public selectedMenuItem: any = null;

  constructor(private menuitemService: MenuitemService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.menuitemService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data;

        this.filterTreatType(this.displayTreatType);

        this.changeDetectorRef.detectChanges();

        console.log('Menuitems loaded: ', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

     });

  }

  public filterTreatType(treatTypeChoice: string): void {
    this.displayTreatType = treatTypeChoice;

    const typeHolder = treatTypeChoice;
    const searchQuery = this.searchContent.trim().toLowerCase();


    const filteredItems = this.menuItems.filter(item => {
      const type = (item.treatType || item.treatTypeChoice ||'');
      const matchType = type.includes(typeHolder);

      if (!matchType) return false;
      if(!searchQuery) return true;

      const tags = (item.itemTags || item.tags || '').toLowerCase();
      const name = (item.itemName || item.name || '').toLowerCase();

      return name.includes(searchQuery) || tags.includes(searchQuery);
  });

  this.displayItems = filteredItems.sort((x, y) => {
    const orderX = Number(x.menuOrder ?? x.order ?? 0);
    const orderY = Number(y.menuOrder ?? y.order ?? 0);

    if (orderX > 0 && orderY > 0) {
      return orderX - orderY;
    }

    if (orderX > 0 && orderY === 0) return -1;
    if (orderX === 0 && orderY > 0) return 1;

    const dateX = x.removedFromMenu ?? x.removedDate ?? x.dateRemoved ?? '';
    const dateY = y.removedFromMenu ?? y.removedDate ?? y.removedDate ?? '';

    const finalX = dateX ? new Date(dateX).getTime() : 0;
    const finalY = dateY ? new Date(dateY).getTime() : 0;

    return finalY - finalX;
  });

    this.changeDetectorRef.markForCheck();

  }
  get menuOrderPopulate(): number[] {
    const activeItems = this.displayItems
    .map(item => Number (item.menuOrder ?? item.order) || 0)
    .filter(order => order > 0);

    const menuOrderMax = activeItems.length > 0 ? Math.max(...activeItems) : 0;

    return Array.from({ length: menuOrderMax + 1 }, (_, i) => i + 1)
  }

  public onChangeMenuOrder(item: any): void {
    item.menuOrder = Number(item.menuOrder);

    this.filterTreatType(this.displayTreatType);
  }

  public onDeleteMenuItem(): void {

    const selectedMenuItem = this.displayItems.find(item => item.selected);

    if (!this.selectedMenuItem) {
      alert('No item selected.');
      return;
    }

    const deleteConfirmation = window.confirm(`You are about to delete "${this.selectedMenuItem.itemName || this.selectedMenuItem.name}". Do you wish to proceed?`);

    if (deleteConfirmation) {
      const itemId = this.selectedMenuItem.id || this.selectedMenuItem._id;

      this.menuitemService.deleteMenuItem(itemId).subscribe({
        next: () => {

            console.log('deleted from db');

          if (!this.deletedIds.includes(itemId)) {
            this.deletedIds.push(itemId);
          }

          this.menuItems = this.menuItems.filter(item => (item.id || item._id) !== itemId);

          this.filterTreatType(this.displayTreatType);
          this.changeDetectorRef.detectChanges();
          this.selectedMenuItem = null;

          console.log('Menu Item deleted on frontend.');
        }, error: (err) => {
          console.error('Error deleting from database.', err);
        }
    });
  }
  }
  
  private menuOrderChanges(): boolean {
    return true;
  }

  public async onSaveChanges(): Promise<void> {
    
    const orderChanges = this.menuOrderChanges();

    if (!orderChanges) {
      return;
    }

    try {
      const changes: Promise<any>[] = [];

      this.menuItems.forEach(item => {
        const itemId = item.id || item._id;
        const update$ = this.menuitemService.updateMenuItem(itemId, item);
        changes.push(firstValueFrom(update$));
      });

      await Promise.all(changes);

      window.alert('Changes saved successfully.');

      this.deletedIds = [];
    } catch (error) {
      console.error('Error saving database changes', error);
    }
  }

  public redirectUpdate(): void {
    if (!this.selectedMenuItem) {
      alert('A Menu Item must first be selected.');
      return;
    }

    const itemId = this.selectedMenuItem.id || this.selectedMenuItem._id;
    this.router.navigate(['/admin-update-menuitem', itemId]);
  }
}
