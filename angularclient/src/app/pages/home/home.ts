import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review';

@Component({
  imports: [CommonModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})

export class Home implements OnInit, OnDestroy {

  public reviews: any[] = [];
  public galleryCounter: number = 1;
  public galleryTotal: number = 10;
  private timerGallery: any;
  private timerReviews: any;
  public reviewCounter: number = 0;

  public getRatingStars(rating: number): string {
    const maxStars =5;
    const ratedStar = "★".repeat(rating);
    const unratedStar = "☆".repeat(maxStars - rating);
    return ratedStar + unratedStar;
  }

  constructor(private reviewService: ReviewService,
              private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;
        console.log('Reviews loaded:', data);
        this.changeDetector.detectChanges();

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    });

    this.startGallery();
    this.startReviewDisplay();
  }

  startGallery(): void{
    this.timerGallery = setInterval(() => {
      this.galleryCounter = (this.galleryCounter % this.galleryTotal) + 1;

      if(this.reviews && this.reviews.length > 0) {
        this.reviewCounter = (this.reviewCounter + 1) % this.reviews.length;
      }

      this.changeDetector.detectChanges();

    }, 5000);}


    startReviewDisplay(): void{
    this.timerReviews = setInterval(() => {

      if(this.reviews && this.reviews.length > 0) {
        this.reviewCounter = (this.reviewCounter + 1) % this.reviews.length;
      }

      this.changeDetector.detectChanges();

    }, 10000);}

  ngOnDestroy(): void {
    if(this.timerGallery) {
      clearInterval(this.timerGallery);
    }

    if(this.timerReviews) {
      clearInterval(this.timerReviews);
    }
  }

}
