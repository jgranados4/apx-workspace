
---

# 🎨 Apx UI – Componentes dinámicos para Angular

Una librería modular de componentes para Angular, construida con **standalone components**, **Angular Material**, y soporte completo para **secondary entry points**.
Diseñada para aplicaciones modernas que requieren componentes reutilizables, configurables y listos para producción.

---

## ✨ Características

* 🔹 Compatible con **Angular 17+**
* 🔹 Arquitectura modular mediante **secondary entry points**
* 🔹 Componentes incluidos:

  * `apx-formulario` → Formularios dinámicos
  * `apx-tabla` → Tablas dinámicas
* 🔹 100% standalone
* 🔹 Validaciones dinámicas, eventos y bindings reactivos
* 🔹 Accesible (A11Y)
* 🔹 Preparado para dark mode y estilos personalizables
* 🔹 Fácil de ampliar (core compartido)

---

## 📦 Instalación

```bash
npm install apx-ui
```

> Si estás usando Angular Standalone o Angular Material, la librería es totalmente compatible.

---

## 🚀 Uso Rápido

### 1️⃣ Importar el formulario dinámico

```ts
import { Component } from '@angular/core';
import { ApxFormulario } from 'apx-ui/apx-formulario';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ApxFormulario],
  template: `
    <apx-formulario
      [fields]="fields"
      (formSubmit)="onSubmit($event)">
    </apx-formulario>
  `,
})
export class DemoComponent {
  fields = [
    { key: 'nombre', type: 'text', label: 'Nombre', validators: [{ name: 'required' }] }
  ];

  onSubmit(data: any) {
    console.log('Datos del formulario:', data);
  }
}
```

---

### 2️⃣ Importar la tabla dinámica

```ts
import { Component } from '@angular/core';
import { ApxTabla } from 'apx-ui/apx-tabla';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ApxTabla],
  template: `
    <apx-tabla
      [data]="users"
      [columns]="columns"
      (rowClick)="onRowClick($event)">
    </apx-tabla>
  `,
})
export class UsersComponent {
  columns = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email' }
  ];

  users = [
    { nombre: 'Jon', email: 'jon@mail.com' },
  ];

  onRowClick(row: any) {
    console.log('Fila seleccionada:', row);
  }
}
```

---

## 📚 Entry Points Disponibles

| Entry Point             | Descripción                   |
| ----------------------- | ----------------------------- |
| `apx-ui`                | Core y utilidades compartidas |
| `apx-ui/apx-formulario` | Formulario dinámico           |
| `apx-ui/apx-tabla`      | Tabla dinámica                |

Cada módulo es independiente y se puede importar según necesidad.

---

## 📁 Estructura del Paquete (publicado)

```
dist/
└── apx-ui/
    ├── apx-formulario/
    ├── apx-tabla/
    ├── esm2022/
    ├── fesm2022/
    ├── package.json
    └── README.md
```

---

## 🔧 Scripts de Desarrollo

### Build

```bash
ng build ui --configuration production
```

### Publicar en npm

```bash
cd dist/apx-ui
npm publish --access public
```

---

## 🧪 Compatibilidad

* Angular **17+**
* Angular Material opcional
* Standalone Components
* RxJS 7+

---

## 🗺️ Roadmap

* `apx-dialog` (en progreso)
* `apx-wizard`
* `apx-charts`
* `apx-layout`

---

## 📄 Licencia

MIT © 2024 – Apx UI

---

Si quieres, puedo generarte también:

✔ El badge de versión de npm
✔ El package.json final listo para publish
✔ El README para cada entry point (formulario y tabla)
✔ Una demo mínima que puedes subir a StackBlitz o GitHub Pages

¿Quieres agregar algo más al README?
