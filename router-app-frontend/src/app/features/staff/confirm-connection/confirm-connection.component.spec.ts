import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmConnectionComponent } from './confirm-connection.component';

describe('ConfirmConnectionComponent', () => {
  let component: ConfirmConnectionComponent;
  let fixture: ComponentFixture<ConfirmConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmConnectionComponent]
    });
    fixture = TestBed.createComponent(ConfirmConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
