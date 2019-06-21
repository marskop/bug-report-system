import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportTableComponent } from './bug-report-table.component';

describe('BugReportTableComponent', () => {
  let component: BugReportTableComponent;
  let fixture: ComponentFixture<BugReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
