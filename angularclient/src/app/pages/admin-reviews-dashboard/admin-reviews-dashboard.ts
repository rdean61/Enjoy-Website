import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review'

@Component({
  imports: [CommonModule],
  selector: 'app-admin-reviews-dashboard',
  styleUrl: './admin-reviews-dashboard.css',
  templateUrl: './admin-reviews-dashboard.html',
})
export class AdminReviewsDashboard implements OnInit {

  public reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {

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
