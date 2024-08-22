import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss',
})
export class AddcategoryComponent {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<any>
  ) {}

  categoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  addCategory() {
    this.dashboardService
      .addCategory(this.categoryForm.value)
      .subscribe((data: any) => {
        this.dialogRef.close();
      });
  }
}
