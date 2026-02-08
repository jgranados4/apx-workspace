import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatPaginatorModule,
  MatTreeModule,
  MatChipsModule,
  MatMenuModule,
  MatSortModule,
];

@NgModule({
  exports: [MATERIAL_MODULES],
})
export class MaterialModule {}
