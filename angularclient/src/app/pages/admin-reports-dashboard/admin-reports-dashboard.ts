import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemService } from '../../services/menuitem'
import { ReviewService } from '../../services/review'

@Component({
  imports: [CommonModule],
  selector: 'app-admin-reports-dashboard',
  styleUrl: './admin-reports-dashboard.css',
  templateUrl: './admin-reports-dashboard.html',
})
export class AdminReportsDashboard implements OnInit{

  public menuItems: any [] = [];
  public reviews: any [] = [];

  constructor(private menuitemService: MenuitemService, 
              private reviewService: ReviewService) {}

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

         this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;
        console.log('Reviews loaded:', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    })
  }


}




