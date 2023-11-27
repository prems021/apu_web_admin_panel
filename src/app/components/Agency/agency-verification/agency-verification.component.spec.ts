import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyVerificationComponent } from './agency-verification.component';

describe('AgencyVerificationComponent', () => {
  let component: AgencyVerificationComponent;
  let fixture: ComponentFixture<AgencyVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyVerificationComponent]
    });
    fixture = TestBed.createComponent(AgencyVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
