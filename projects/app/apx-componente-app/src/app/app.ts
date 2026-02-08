import { Component, signal } from '@angular/core';
import {
  ApxFormulario,
  ApxTabla,
  TableAction,
  TableColumn,
  FieldConfig,
} from '@jgranados199795/apx-ui';
import { MaterialModule } from '@jgranados199795/apx-ui/apx-material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
}

@Component({
  selector: 'lib-root',
  imports: [ApxFormulario, ApxTabla, MaterialModule],
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
  columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Estado',
      useTemplate: true, // Usa el template custom
      width: '120px',
    },
    {
      key: 'role',
      label: 'Rol',
      useTemplate: true, // Usa el template custom
    },
  ];
  users = signal<User[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      status: 'active',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      status: 'active',
      role: 'User',
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      status: 'inactive',
      role: 'User',
    },
  ]);
  handleEdit(event: TableAction<User>): void {
    console.log('Editando usuario:', event.row);

    // Aquí podrías abrir un dialog de edición
    // const dialogRef = this.dialog.open(EditUserDialog, {
    //   data: event.row
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.users.update(users =>
    //       users.map(u => u.id === event.row.id ? result : u)
    //     );
    //   }
    // });
  }

  // Manejar eliminación
  handleDelete(event: TableAction<User>): void {
    console.log('Eliminando usuario:', event.row);

    // Aquí podrías mostrar un dialog de confirmación
    const confirmed = confirm(`¿Eliminar a ${event.row.name}?`);

    if (confirmed) {
      // Remover del signal
      this.users.update((users) => users.filter((u) => u.id !== event.row.id));
    }
  }
  // Acciones custom
  viewDetails(user: User): void {
    console.log('Ver detalles de:', user);
  }

  resetPassword(user: User): void {
    console.log('Resetear contraseña de:', user);
  }
}
