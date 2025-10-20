// field-config.ts
export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'date'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'slider'
  | 'autocomplete';

export interface ValidatorConfig {
  name: string; // ej: 'required', 'minLength', etc.
  args?: {
    min?: number;
    max?: number;
    pattern?: string | RegExp;
  };
  message?: string;
}

export interface FieldOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
}
export type FieldSize = 'small' | 'medium' | 'large' | 'full';
export interface FieldConfig {
  // ============ CONFIGURACIÓN BÁSICA ============

  /** Identificador único del campo (name del form control) */
  key: string;

  /** Tipo de campo a renderizar */
  type: FieldType;

  /** Etiqueta visible del campo */
  label: string;

  /** Valor inicial del campo */
  value?: any;

  /** Placeholder para el input */
  placeholder?: string;

  /** Texto de ayuda debajo del campo */
  hint?: string;

  // ============ VALIDACIÓN ============

  /** Validadores del campo */
  validators?: ValidatorConfig[];

  /** Campo es requerido (visual, debe incluirse en validators también) */
  required?: boolean;

  // ============ ESTADO Y COMPORTAMIENTO ============

  /** Deshabilitar el campo */
  disabled?: boolean;

  /** Ocultar el campo completamente */
  hidden?: boolean;

  /** Mostrar campo condicionalmente basado en otros valores del formulario */
  showWhen?: (formValue: Record<string, any>) => boolean;

  // ============ LAYOUT Y DISEÑO ============

  /** Tamaño del campo en el grid */
  fieldSize?: FieldSize;

  /** Clase CSS personalizada */
  customClass?: string;

  /** Icono prefijo (Material Icon name) */
  prefix?: string;

  /** Icono sufijo (Material Icon name) */
  suffix?: string;

  // ============ CONFIGURACIÓN POR TIPO ============

  // Para SELECT, RADIO, AUTOCOMPLETE
  /** Opciones disponibles */
  options?: FieldOption[];

  /** Permitir selección múltiple (solo para select) */
  multiple?: boolean;

  // Para TEXTAREA
  /** Número de filas iniciales */
  rows?: number;

  /** Número máximo de filas (con autosize) */
  maxRows?: number;

  /** Longitud máxima de caracteres */
  maxLength?: number;

  // Para NUMBER y SLIDER
  /** Valor mínimo */
  min?: number;

  /** Valor máximo */
  max?: number;

  /** Incremento/decremento */
  step?: number;

  // Para DATE
  /** Fecha mínima permitida */
  minDate?: Date;

  /** Fecha máxima permitida */
  maxDate?: Date;
}
