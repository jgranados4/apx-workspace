# 🧩 ApxFormulario - Formulario Dinámico para Angular

Un **componente de formulario dinámico** para Angular totalmente configurable, moderno y con soporte para **Angular Material**, **Reactive Forms**, y **validaciones personalizadas**.  
Ideal para generar formularios complejos a partir de configuraciones JSON o estructuras dinámicas en tiempo de ejecución.

---

## 🚀 Características

✅ Compatible con **Angular 17+** y **Material Design 3**  
✅ Soporte completo para **Reactive Forms**  
✅ Estructura **grid responsiva con container queries**  
✅ Tipos de campo: `input`, `select`, `checkbox`, `radio`, `textarea`, `slider`, `autocomplete`, `date`  
✅ Validaciones dinámicas con mensajes personalizados  
✅ Emisión de eventos: `submit`, `cancel`, `reset`, `change`, `valid`  
✅ Totalmente **accesible (A11Y)**  
✅ Preparado para **modo oscuro** y **animaciones suaves**

---

## 📦 Instalación

```bash
npm install apx-formulario
```
```typescript
import { ApxFormulario } from 'apx-formulario';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ApxFormulario],
  template: `<lib-apx-formulario [fields]="fields" (formSubmit)="onSubmit($event)" />`,
})
export class DemoComponent {
  fields = [
    { key: 'nombre', type: 'text', label: 'Nombre', validators: [{ name: 'required' }] },
  ];

  onSubmit(data: any) {
    console.log('Datos del formulario:', data);
  }
}
