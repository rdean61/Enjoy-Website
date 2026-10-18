import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMenuDashboard } from './admin-menu-dashboard';

describe('AdminMenuDashboard', () => {
  let component: AdminMenuDashboard;
  let fixture: ComponentFixture<AdminMenuDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
