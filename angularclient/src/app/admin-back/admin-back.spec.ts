import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBack } from './admin-back';

describe('AdminBack', () => {
  let component: AdminBack;
  let fixture: ComponentFixture<AdminBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBack],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
