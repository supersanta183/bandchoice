import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VexNotesWrapperComponent } from './vex-notes-wrapper.component';

describe('VexNotesWrapperComponent', () => {
  let component: VexNotesWrapperComponent;
  let fixture: ComponentFixture<VexNotesWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VexNotesWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VexNotesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
