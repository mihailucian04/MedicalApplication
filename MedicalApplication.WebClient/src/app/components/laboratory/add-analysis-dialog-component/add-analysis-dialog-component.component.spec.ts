import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalysisDialogComponentComponent } from './add-analysis-dialog-component.component';

describe('AddAnalysisDialogComponentComponent', () => {
  let component: AddAnalysisDialogComponentComponent;
  let fixture: ComponentFixture<AddAnalysisDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnalysisDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnalysisDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
