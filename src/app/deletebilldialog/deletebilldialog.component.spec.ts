import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebilldialogComponent } from './deletebilldialog.component';

describe('DeletebilldialogComponent', () => {
  let component: DeletebilldialogComponent;
  let fixture: ComponentFixture<DeletebilldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletebilldialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletebilldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
