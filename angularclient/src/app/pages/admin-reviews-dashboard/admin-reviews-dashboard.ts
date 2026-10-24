import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review'
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-admin-reviews-dashboard',
  styleUrl: './admin-reviews-dashboard.css',
  templateUrl: './admin-reviews-dashboard.html',
})
export class AdminReviewsDashboard implements OnInit {

  private router = inject(Router);

  public reviews: any[] = [];

  public ogReviews: Map<string | number, boolean> =new Map();

  public deletedIds: string[] = [];

  public selectedReview: any = null;

  constructor(private reviewService: ReviewService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;

        this.ogReviews.clear();
        data.forEach(item => {
          const id = item.id || item._id;
          this.ogReviews.set(id, item.displayStatus);
        });

        this.changeDetectorRef.detectChanges();

        console.log('Reviews loaded:', data);

      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    });
  }

  public onDeleteReview(): void {

    const selectedReview = this.reviews.find( item => item.selected);

    if(!this.selectedReview) {
      alert('No review selected.');
      return;
    }

    const deleteConfirmation = window.confirm(`You are about to delete a review by "${this.selectedReview.name || this.selectedReview.name}" Do you wish to proceed?`);

    if (deleteConfirmation) {
      const itemId = this.selectedReview.id || this.selectedReview._id;

      this.reviewService.deleteReview(itemId).subscribe({
        next: () => {

          console.log('Deleted form db');

          if(!this.deletedIds.includes(itemId)) {
            this.deletedIds.push(itemId);
          }

          this.reviews = this.reviews.filter(item => (item.id || item._id) !== itemId);

          this.changeDetectorRef.detectChanges();
          this.selectedReview = null;

          console.log('Review deleted on frontend.');
        }, error: (err) => {
          console.error('Error deleting fromd database.', err);
        }
      });
    }
  }

  private getDisplayStatusChanges(): any[] {
    return this.reviews.filter(item => {
      const id = item.id || item._id;
      const ogStatus = this.ogReviews.get(id);
      return ogStatus !== item.displayStatus;
    });
  }

  public async onSaveChanges(): Promise<void> {
    const changedStatuses = this.getDisplayStatusChanges();

    if (changedStatuses.length === 0 ) {
      return;
    }

    try {
      const changes: Promise<any>[] = [];

      changedStatuses.forEach(item => {
        const itemId = item.id || item._id;
        const update$ = this.reviewService.updateReview(itemId, item);
        changes.push(firstValueFrom(update$));
      });

      await Promise.all(changes);

      changedStatuses.forEach(item => {
        const id = item.id || item._id;
        this.ogReviews.set(id, item.displayStatus);
      });

      window.alert('Changes saved successfully.');

      this.deletedIds = [];
    } catch (error) {
      console.error('Error saving database changes', error);
    }
  }
}
