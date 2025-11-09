import { Component, signal } from '@angular/core';
import { FieldConfig } from '../../../../ui/apx-formulario/src/lib/interface/IField-config.ts';
import {ApxFormulario} from "apx-formulario"
@Component({
  selector: 'app-root',
  imports: [ApxFormulario],
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
      type: 'password',
      label: 'Password',
      required: true,
      validateOnBlur: true,
      min: 8,
      validators: [
        {
          name: 'pattern',
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
      hint: 'Debe tener mayúscula, minúscula, número y carácter especial.',
    },
  ];

  onSubmit(formData: any) {
    console.log('Form data:', formData);
  }
}
