import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem';

@Component({
  imports: [CommonModule],
  selector: 'app-holidays',
  styleUrl: './holidays.css',
  templateUrl: './holidays.html',
})
export class Holidays implements OnInit{

  public menuItems: any [] = [];

  constructor(private menuService: MenuitemService,
              private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.menuService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data;
        console.log('Menuitems loaded.');
        this.changeDetector.detectChanges();

      },
      error: (err) => {
        console.error('Integration Error.', err);
      }
    });
  }
}
