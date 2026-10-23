import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddReview } from './admin-add-review';

describe('AdminAddReview', () => {
  let component: AdminAddReview;
  let fixture: ComponentFixture<AdminAddReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddReview],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
