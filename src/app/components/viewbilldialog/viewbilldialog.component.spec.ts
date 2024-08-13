import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbilldialogComponent } from './viewbilldialog.component';

describe('ViewbilldialogComponent', () => {
  let component: ViewbilldialogComponent;
  let fixture: ComponentFixture<ViewbilldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbilldialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewbilldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
