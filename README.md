# 🎨 Apx UI - Librería de Componentes Angular

[![npm version](https://img.shields.io/npm/v/@jgranados199795/apx-ui.svg)](https://www.npmjs.com/package/@jgranados199795/apx-ui)
[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Librería de componentes Angular modernos y reutilizables construida con **Angular 20+**, **Standalone Components** y **Angular Material**.

## 📦 Instalación

```bash
npm install @jgranados199795/apx-ui @angular/material @angular/cdk
```

## 🚀 Componentes Disponibles

### 1. ApxFormulario - Formularios Dinámicos

Crea formularios complejos con validaciones avanzadas y múltiples tipos de campos.

#### Uso Básico

```typescript
import { Component } from "@angular/core";
import { ApxFormulario } from "@jgranados199795/apx-ui/apx-formulario";

@Component({
  standalone: true,
  imports: [ApxFormulario],
  template: ` <apx-formulario [fields]="campos" (formSubmit)="onSubmit($event)" submitButtonText="Guardar" [showFormStatus]="true"> </apx-formulario> `,
})
export class MiComponente {
  campos = [
    {
      key: "nombre",
      type: "text",
      label: "Nombre completo",
      required: true,
      placeholder: "Ingresa tu nombre",
    },
    {
      key: "email",
      type: "email",
      label: "Correo electrónico",
      required: true,
      validators: [{ name: "email", message: "Email inválido" }],
    },
    {
      key: "edad",
      type: "number",
      label: "Edad",
      min: 18,
      max: 100,
    },
    {
      key: "pais",
      type: "select",
      label: "País",
      options: [
        { value: "cr", label: "Costa Rica" },
        { value: "mx", label: "México" },
        { value: "es", label: "España" },
      ],
    },
    {
      key: "terminos",
      type: "checkbox",
      label: "Acepto los términos y condiciones",
      required: true,
    },
  ];

  onSubmit(datos: any) {
    console.log("Datos del formulario:", datos);
    // Enviar a tu API aquí
  }
}
```

#### Tipos de Campos Disponibles

| Tipo           | Descripción          | Ejemplo                                            |
| -------------- | -------------------- | -------------------------------------------------- |
| `text`         | Campo de texto       | `{ type: 'text', label: 'Nombre' }`                |
| `email`        | Email con validación | `{ type: 'email', validators: [{name: 'email'}] }` |
| `number`       | Números              | `{ type: 'number', min: 0, max: 100 }`             |
| `select`       | Dropdown             | `{ type: 'select', options: [...] }`               |
| `checkbox`     | Casilla              | `{ type: 'checkbox', label: 'Acepto' }`            |
| `textarea`     | Texto multilínea     | `{ type: 'textarea', rows: 4 }`                    |
| `date`         | Selector de fecha    | `{ type: 'date', minDate: new Date() }`            |
| `radio`        | Botones de opción    | `{ type: 'radio', options: [...] }`                |
| `slider`       | Control deslizante   | `{ type: 'slider', min: 0, max: 100 }`             |
| `autocomplete` | Autocompletado       | `{ type: 'autocomplete', options: [...] }`         |

#### API de ApxFormulario

**Inputs:**

- `fields: FieldConfig[]` - Configuración de campos
- `columns: 1 | 2 | 3 | 4 | 'auto'` - Columnas del grid (default: 2)
- `submitButtonText: string` - Texto del botón enviar (default: 'Enviar')
- `showFormStatus: boolean` - Mostrar estado del formulario
- `initialValues: Record<string, unknown>` - Valores iniciales

**Outputs:**

- `formSubmit: Record<string, unknown>` - Se emite al enviar el formulario
- `formChange: Record<string, unknown>` - Se emite en cada cambio
- `formValid: boolean` - Estado de validación

---

### 2. ApxTabla - Tablas Dinámicas

Tablas con paginación, sorting, acciones y templates personalizables.

#### Uso Básico

```typescript
import { Component } from "@angular/core";
import { ApxTabla } from "@jgranados199795/apx-ui/apx-tabla";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Component({
  standalone: true,
  imports: [ApxTabla],
  template: ` <apx-tabla [data]="usuarios" [columns]="columnas" [showActions]="true" [showEditButton]="true" [showDeleteButton]="true" (Edit)="editarUsuario($event)" (Delete)="eliminarUsuario($event)" [pageSize]="10"> </apx-tabla> `,
})
export class ListaUsuariosComponent {
  columnas = [
    { key: "id", label: "ID", width: "80px" },
    { key: "nombre", label: "Nombre", sortable: true },
    { key: "email", label: "Email" },
    { key: "rol", label: "Rol" },
  ];

  usuarios: Usuario[] = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", rol: "Admin" },
    { id: 2, nombre: "Luis Martínez", email: "luis@ejemplo.com", rol: "User" },
    { id: 3, nombre: "María López", email: "maria@ejemplo.com", rol: "User" },
  ];

  editarUsuario(accion: any) {
    console.log("Editar usuario:", accion.row);
    // Abrir diálogo de edición
  }

  eliminarUsuario(accion: any) {
    console.log("Eliminar usuario:", accion.row);
    // Mostrar confirmación y eliminar
  }
}
```

#### Templates Personalizados

```typescript
@Component({
  standalone: true,
  imports: [ApxTabla],
  template: `
    <apx-tabla
      [data]="productos"
      [columns]="columnas"
      [showActions]="true"
    >
      <!-- Template para celdas personalizadas -->
      <ng-template #cellTemplate let-column="column" let-row="row" let-index="index">
        @if (column === 'precio') {
          <span [class]="'precio ' + (row.precio > 100 ? 'alto' : 'bajo')">
            ${{ row.precio }}
          </span>
        }
        @if (column === 'stock') {
          <span [class]="'stock ' + (row.stock > 10 ? 'disponible' : 'agotado')">
            {{ row.stock }} unidades
          </span>
        }
      </ng-template>

      <!-- Template para acciones adicionales -->
      <ng-template #actionsTemplate let-row="row" let-index="index">
        <button mat-icon-button color="accent" (click)="verDetalles(row)">
          <mat-icon>visibility</mat-icon>
        </button>
        <button mat-icon-button color="primary" (click)="descargar(row)">
          <mat-icon>download</mat-icon>
        </button>
      </ng-template>
    </apx-tabla>
  `,
  styles: [`
    .precio.alto { color: green; font-weight: bold; }
    .precio.bajo { color: orange; }
    .stock.disponible { color: blue; }
    .stock.agotado { color: red; }
  `]
})
export class TablaAvanzadaComponent {
  columnas = [
    { key: 'nombre', label: 'Producto' },
    { key: 'precio', label: 'Precio', useTemplate: true },
    { key: 'stock', label: 'Stock', useTemplate: true }
  ];

  productos = [
    { nombre: 'Laptop', precio: 1200, stock: 5 },
    { nombre: 'Mouse', precio: 25, stock: 15 }
  ];

  verDetalles(producto: any) {
    console.log('Ver detalles:', producto);
  }

  descargar(producto: any) {
    console.log('Descargar:', producto);
  }
}
```

#### API de ApxTabla

**Inputs:**

- `data: T[]` - Datos a mostrar
- `columns: TableColumn<T>[]` - Configuración de columnas
- `showActions: boolean` - Mostrar columna de acciones
- `showEditButton: boolean` - Mostrar botón editar
- `showDeleteButton: boolean` - Mostrar botón eliminar
- `pageSize: number` - Elementos por página (default: 5)

**Outputs:**

- `Edit: TableAction<T>` - Se emite al hacer click en editar
- `Delete: TableAction<T>` - Se emite al hacer click en eliminar
- `Action: TableAction<T>` - Para acciones custom

---

## 🎨 Personalización y Configuración

### Layout Responsivo

```typescript
campos = [
  {
    key: "nombre",
    type: "text",
    label: "Nombre",
    fieldSize: "medium", // 'small' | 'medium' | 'large' | 'full'
  },
  {
    key: "descripcion",
    type: "textarea",
    label: "Descripción",
    fieldSize: "full", // Ocupa todo el ancho
  },
];
```

### Validaciones Avanzadas

```typescript
campos = [
  {
    key: "password",
    type: "password",
    label: "Contraseña",
    validators: [
      { name: "required", message: "La contraseña es obligatoria" },
      { name: "minlength", args: { min: 6 }, message: "Mínimo 6 caracteres" },
      {
        name: "pattern",
        args: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$" },
        message: "Debe contener mayúsculas, minúsculas y números",
      },
    ],
  },
];
```

### Campos Condicionales

```typescript
campos = [
  {
    key: "tipoUsuario",
    type: "select",
    label: "Tipo de Usuario",
    options: [
      { value: "regular", label: "Usuario Regular" },
      { value: "premium", label: "Usuario Premium" },
    ],
  },
  {
    key: "codigoPremium",
    type: "text",
    label: "Código Premium",
    showWhen: (values) => values.tipoUsuario === "premium",
  },
];
```

## 📚 Entry Points

Importa solo lo que necesites:

```typescript
// Solo formularios
import { ApxFormulario } from "@jgranados199795/apx-ui/apx-formulario";

// Solo tablas
import { ApxTabla } from "@jgranados199795/apx-ui/apx-tabla";

// Angular Material centralizado
import { MaterialModule } from "@jgranados199795/apx-ui/apx-material";
```

## 🔧 Métodos Públicos

### ApxFormulario

```typescript
// Obtener valores actuales
const valores = formulario.getFormValue();

// Establecer valores
formulario.setValue({ nombre: "Juan", email: "juan@ejemplo.com" });

// Resetear formulario
formulario.resetForm();

// Marcar todos como tocados (para mostrar errores)
formulario.markAsTouched();
```

### ApxTabla

```typescript
// Obtener página actual
const paginaActual = tabla.getCurrentPage();

// Ir a página específica
tabla.goToPage(2);
```

## 🐛 Solución de Problemas

### Error: "Material components not found"

Asegúrate de tener instalado Angular Material:

```bash
npm install @angular/material @angular/cdk
```

### Los estilos no se aplican

Importa los temas de Angular Material en tu `styles.css`:

```css
@import "@angular/material/prebuilt-themes/indigo-pink.css";
```

## 🤝 Contribuir

¿Encontraste un bug o tienes una idea para mejorar? ¡Nos encantaría escucharte!

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**jgranados4**

- GitHub: [@jgranados4](https://github.com/jgranados4)
- npm: [@jgranados199795](https://www.npmjs.com/~jgranados199795)

---
