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
  private counter: any;

  constructor(private reviewService: ReviewService,
              private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;
        console.log('Reviews loaded:', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    });

    this.startGallery();
  }

  startGallery(): void{
    this.counter = setInterval(() => {
      this.galleryCounter = (this.galleryCounter % this.galleryTotal) + 1;

      this.changeDetector.detectChanges();

    }, 5000);
  }

  ngOnDestroy(): void {
    if(this.counter) {
      clearInterval(this.counter);
    }
  }

}
