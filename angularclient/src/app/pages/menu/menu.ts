import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';

@Component({
  imports: [CommonModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu implements OnInit{

  public menuItems: any [] = [];
  public lastWednesday!: Date;
  public nextSunday!: Date;
  public popupOpen: boolean = false;

  constructor(private menuService: MenuitemService,
              private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.popupOpen = true;
    
    this.menuService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data;
        console.log('Menuitems loaded: ', data);
        this.changeDetector.detectChanges();

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

     });

     this.getDays();

  }

  private getDays(): void {
    const today = new Date();
    const todayDay = today.getDay();

    const lastWedDate = new Date(today);
    const dayDiff = (todayDay >= 3) ? (todayDay - 3) : (todayDay + 4);
    lastWedDate.setDate(today.getDate() - dayDiff);
    this.lastWednesday = lastWedDate;

    const nextSunDate = new Date(today);
    const daySum = (todayDay === 0) ? 7 :(7 - todayDay);
    nextSunDate.setDate(today.getDate() + daySum);
    this.nextSunday = nextSunDate;

  }

  public closePopup(): void {
    this.popupOpen = false;
  }


}
