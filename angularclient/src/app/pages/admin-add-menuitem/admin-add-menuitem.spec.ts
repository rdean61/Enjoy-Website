import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddMenuitem } from './admin-add-menuitem';

describe('AdminAddMenuitem', () => {
  let component: AdminAddMenuitem;
  let fixture: ComponentFixture<AdminAddMenuitem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddMenuitem],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddMenuitem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
