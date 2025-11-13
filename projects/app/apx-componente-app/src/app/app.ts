import { Component, signal } from '@angular/core';
import { FieldConfig } from '../../../../ui/apx-formulario/src/lib/interface/IField-config.ts';
import {ApxFormulario,ApxTabla} from '@tu-org/ui'
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
@Component({
  selector: 'lib-root',
  imports: [ApxFormulario, ApxTabla],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('apx-componente-app');
  fields: FieldConfig[] = [
    {
      key: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      validators: [{ name: 'required' }],
    },
    {
      key: 'firstName',
      type: 'text',
      label: 'Nombre',
      required: true,
      fieldSize: 'small', // Ocupa 1 columna
      validators: [{ name: 'required' }],
    },
    {
      key: 'lastName',
      type: 'text',
      label: 'Apellido',
      required: true,
      fieldSize: 'small',
      validators: [{ name: 'required' }],
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      fieldSize: 'small', // Ocupa 2 columnas
      validators: [{ name: 'required' }, { name: 'email' }],
    },
    {
      key: 'phone',
      type: 'tel',
      label: 'Teléfono',
      fieldSize: 'small',
    },
    {
      key: 'city',
      type: 'text',
      label: 'Ciudad',
      fieldSize: 'small',
    },
    {
      key: 'description',
      type: 'textarea',
      label: 'Descripción',
      rows: 4,
      fieldSize: 'full', // Ocupa todo el ancho
      maxLength: 500,
    },
    {
      key: 'category',
      type: 'select',
      label: 'Categoría',
      fieldSize: 'small',
      options: [
        { value: 'tech', label: 'Tecnología' },
        { value: 'business', label: 'Negocios' },
        { value: 'education', label: 'Educación' },
      ],
    },
    {
      key: 'priority',
      type: 'radio',
      label: 'Prioridad',
      value: 'medium',
      options: [
        { value: 'low', label: 'Baja' },
        { value: 'medium', label: 'Media' },
        { value: 'high', label: 'Alta' },
      ],
    },
    {
      key: 'active',
      type: 'checkbox',
      label: 'Activo',
      value: true,
    },
    {
      key: 'featured',
      type: 'checkbox',
      label: 'Destacado',
      value: false,
    },
    {
      key: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      autocomplete: 'current-password',
      required: true,
      validateOnBlur: true,
      min: 8,
      validators: [
        {
          name: 'pattern',
          message: 'error en el patther',
          args: {
            pattern:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          },
        },
        {
          name: 'required',
        },
        { name: 'minlength', args: { min: 8 } },
      ],
    },
  ];

  onSubmit(formData: unknown) {
    console.log('Form data:', formData);
  }
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  data = ELEMENT_DATA;
}
