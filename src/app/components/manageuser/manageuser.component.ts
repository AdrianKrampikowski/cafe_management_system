import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface PeriodicElement {
  name: string;
  email: string;
  contactNumber: string;
}
@Component({
  selector: 'app-manageuser',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
  templateUrl: './manageuser.component.html',
  styleUrl: './manageuser.component.scss',
})
export class ManageuserComponent {
  constructor() {}
  value = '';

  ELEMENT_DATA: PeriodicElement[] = [
    { name: '1', email: 'Hydrogen', contactNumber: '1.0079' },
    // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'action'];
  dataSource = this.ELEMENT_DATA;

  isOn = false;

  onToggle(event: any): void {
    this.isOn = event.checked;
    console.log('Toggle state:', this.isOn ? 'On' : 'Off');
  }
}
