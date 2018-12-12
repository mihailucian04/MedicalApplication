import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleLaboratoryComponent } from './user-role-laboratory.component';

describe('UserRoleLaboratoryComponent', () => {
  let component: UserRoleLaboratoryComponent;
  let fixture: ComponentFixture<UserRoleLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
