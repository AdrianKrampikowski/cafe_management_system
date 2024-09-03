import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecategorydialogComponent } from './deletecategorydialog.component';

describe('DeletecategorydialogComponent', () => {
  let component: DeletecategorydialogComponent;
  let fixture: ComponentFixture<DeletecategorydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletecategorydialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletecategorydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
