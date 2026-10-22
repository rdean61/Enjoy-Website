import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-admin-menu-dashboard',
  styleUrl: './admin-menu-dashboard.css',
  templateUrl: './admin-menu-dashboard.html',
})
export class AdminMenuDashboard implements OnInit{

  public menuItems: any[] = [];

  public displayItems: any[] = [];

  public displayTreatType: string = 'mini';

  public searchContent: string = '';

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
    const activeItems = this.displayItems.filter(item => (item.menuOrder ?? item.order) > 0).length;
    return Array.from({ length: activeItems }, (_, i) => i + 1)
  }

  public onChangeMenuOrder(item: any): void {
    item.menuOrder = Number(item.menuOrder);

    this.filterTreatType(this.displayTreatType);
  }

}
