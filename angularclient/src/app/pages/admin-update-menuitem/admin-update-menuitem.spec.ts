import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUpdateMenuitem } from './admin-update-menuitem';

describe('AdminUpdateMenuitem', () => {
  let component: AdminUpdateMenuitem;
  let fixture: ComponentFixture<AdminUpdateMenuitem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateMenuitem],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUpdateMenuitem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
