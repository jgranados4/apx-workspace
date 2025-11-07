import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApxFormulario } from 'apx-formulario';
import { FieldConfig } from '../../../apx-formulario/src/lib/IField-config.ts';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApxFormulario],
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
      validators: [
        {
          name: 'pattern',
          message:
            '⚠️ La contraseña no es válida. Debe contener mayúsculas, minúsculas, números y caracteres especiales',
          args: {
            pattern:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          },
        },
      ],
    },
  ];

  onSubmit(formData: any) {
    console.log('Form data:', formData);
  }
}
