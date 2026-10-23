import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-add-review',
  styleUrl: './admin-add-review.css',
  templateUrl: './admin-add-review.html',
})
export class AdminAddReview implements OnInit {

  public newReview = {
    displayStatus: false,
    name: '',
    reviewContent: '',
    rating: null,
    email: ''
  };

  public reviews: any [] = [];

  constructor(private reviewService: ReviewService,
              private router: Router
  ) {}

  ngOnInit(): void {
    
    this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;
        console.log('Reviews loaded: ', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    });

  }

  public onSubmit(): void {
    this.reviewService.createReview(this.newReview).subscribe({
      next: (response) => {
        console.log('New review created.', response);

        this.newReview = { displayStatus: false, name: '', reviewContent: '', rating: null, email: ''};

        this.router.navigate(['/admin-reviews-dashboard']);
      }, error: (err) => {
        console.error('Could not create review.', err);
      }

    })
  }
  
}
