import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReviewsDashboard } from './admin-reviews-dashboard';

describe('AdminReviewsDashboard', () => {
  let component: AdminReviewsDashboard;
  let fixture: ComponentFixture<AdminReviewsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReviewsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReviewsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
