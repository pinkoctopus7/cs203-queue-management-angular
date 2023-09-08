import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventInfoComponent } from './view-event-info.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('ViewEventInfoComponent', () => {
  let component: ViewEventInfoComponent;
  let fixture: ComponentFixture<ViewEventInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEventInfoComponent, TextButtonComponent]
    });
    fixture = TestBed.createComponent(ViewEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});