import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportsDashboard } from './admin-reports-dashboard';

describe('AdminReportsDashboard', () => {
  let component: AdminReportsDashboard;
  let fixture: ComponentFixture<AdminReportsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReportsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReportsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
