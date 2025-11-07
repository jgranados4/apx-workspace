import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { FieldConfig, StandardValidatorName, ValidatorConfig } from './IField-config.ts';

@Component({
  selector: 'lib-apx-formulario',
  imports: [ReactiveFormsModule, AngularMaterialModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="generic-form">
      <div class="form-grid" [class]="gridClass()">
        @for (field of visibleFields(); track field.key) {
        <div
          class="form-field-wrapper"
          [class]="getFieldClass(field)"
          [attr.data-field-type]="field.type"
        >
          @switch (field.type) {

          <!-- CHECKBOX -->
          @case ('checkbox') {
          <mat-checkbox
            [formControlName]="field.key"
            [attr.aria-label]="field.label"
          >
            {{ field.label }}
            @if (field.required) {
            <span class="required-asterisk" aria-hidden="true">*</span>
            }
          </mat-checkbox>
          @if (hasError(field.key)) {
          <mat-error class="checkbox-error">
            {{ getErrorMessage(field) }}
          </mat-error>
          } }

          <!-- SELECT -->
          @case ('select') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </mat-label>
            <mat-select
              [formControlName]="field.key"
              [multiple]="field.multiple"
            >
              @for (opt of field.options ?? []; track opt.value) {
              <mat-option [value]="opt.value">
                {{ opt.label }}
              </mat-option>
              }
            </mat-select>
            @if (field.hint) {
            <mat-hint>{{ field.hint }}</mat-hint>
            } @if (hasError(field.key)) {
            <mat-error>{{ getErrorMessage(field) }}</mat-error>
            }
          </mat-form-field>
          }

          <!-- DATE PICKER -->
          @case ('date') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              [formControlName]="field.key"
              [placeholder]="field.placeholder || ''"
              [min]="field.minDate"
              [max]="field.maxDate"
            />
            <mat-datepicker-toggle matIconSuffix [for]="picker">
            </mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            @if (field.hint) {
            <mat-hint>{{ field.hint }}</mat-hint>
            } @if (hasError(field.key)) {
            <mat-error>{{ getErrorMessage(field) }}</mat-error>
            }
          </mat-form-field>
          }

          <!-- TEXTAREA -->
          @case ('textarea') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </mat-label>
            <textarea
              matInput
              [formControlName]="field.key"
              [placeholder]="field.placeholder || ''"
              [rows]="field.rows || 3"
              [maxlength]="field.maxLength!"
              cdkTextareaAutosize
              [cdkAutosizeMinRows]="field.rows || 3"
              [cdkAutosizeMaxRows]="field.maxRows || 10"
            >
            </textarea>
            @if (field.hint) {
            <mat-hint>{{ field.hint }}</mat-hint>
            } @if (field.maxLength) {
            <mat-hint align="end">
              {{ getCharacterCount(field.key) }} / {{ field.maxLength }}
            </mat-hint>
            } @if (hasError(field.key)) {
            <mat-error>{{ getErrorMessage(field) }}</mat-error>
            }
          </mat-form-field>
          }

          <!-- RADIO GROUP -->
          @case ('radio') {
          <div class="radio-group-wrapper">
            <label class="radio-group-label">
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </label>
            <mat-radio-group [formControlName]="field.key">
              @for (opt of field.options ?? []; track opt.value) {
              <mat-radio-button [value]="opt.value">
                {{ opt.label }}
              </mat-radio-button>
              }
            </mat-radio-group>
            @if (field.hint) {
            <mat-hint class="radio-hint">{{ field.hint }}</mat-hint>
            } @if (hasError(field.key)) {
            <mat-error class="radio-error">
              {{ getErrorMessage(field) }}
            </mat-error>
            }
          </div>
          }

          <!-- SLIDER -->
          @case ('slider') {
          <div class="slider-wrapper">
            <label class="slider-label">
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </label>
            <mat-slider
              [min]="field.min || 0"
              [max]="field.max || 100"
              [step]="field.step || 1"
              [disabled]="field.disabled"
              class="full-width"
            >
              <input matSliderThumb [formControlName]="field.key" />
            </mat-slider>
            <div class="slider-value">
              Valor: {{ form.controls[field.key].value }}
            </div>
            @if (field.hint) {
            <mat-hint class="slider-hint">{{ field.hint }}</mat-hint>
            }
          </div>
          }

          <!-- AUTOCOMPLETE -->
          @case ('autocomplete') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </mat-label>
            <input
              type="text"
              matInput
              [formControlName]="field.key"
              [matAutocomplete]="auto"
              [placeholder]="field.placeholder || ''"
            />
            <mat-autocomplete #auto="matAutocomplete">
              @for (opt of field.options ?? []; track opt.value) {
              <mat-option [value]="opt.value">
                {{ opt.label }}
              </mat-option>
              }
            </mat-autocomplete>
            @if (field.prefix) {
            <mat-icon matIconPrefix>{{ field.prefix }}</mat-icon>
            } @if (field.hint) {
            <mat-hint>{{ field.hint }}</mat-hint>
            } @if (hasError(field.key)) {
            <mat-error>{{ getErrorMessage(field) }}</mat-error>
            }
          </mat-form-field>
          }

          <!-- INPUT DEFAULT (text, number, email, password, tel, url) -->
          @default {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>
              {{ field.label }}
              @if (field.required) {
              <span class="required-asterisk">*</span>
              }
            </mat-label>
            @if (field.prefix) {
            <mat-icon matIconPrefix>{{ field.prefix }}</mat-icon>
            }
            <input
              matInput
              [type]="field.type"
              [formControlName]="field.key"
              [placeholder]="field.placeholder || ''"
              [min]="field.min"
              [max]="field.max"
              [step]="field.step"
              [maxlength]="field.maxLength!"
            />
            @if (field.suffix) {
            <mat-icon matIconSuffix>{{ field.suffix }}</mat-icon>
            } @if (field.hint) {
            <mat-hint>{{ field.hint }}</mat-hint>
            } @if (hasError(field.key)) {
            <mat-error>{{ getErrorMessage(field) }}</mat-error>
            }
          </mat-form-field>
          } }
        </div>
        }
      </div>

      <!-- Estado del formulario -->
      @if (showFormStatus()) {
      <div class="form-status" [class.invalid]="form.invalid">
        @if (form.invalid) {
        <mat-icon>error_outline</mat-icon>
        <span>Por favor, corrige los errores antes de continuar</span>
        } @else {
        <mat-icon>check_circle</mat-icon>
        <span>Formulario válido</span>
        }
      </div>
      }

      <!-- Botones de acción -->
      <div class="form-actions" [class]="actionsAlign()">
        @if (showResetButton()) {
        <button
          mat-button
          type="button"
          (click)="onReset()"
          [disabled]="isSubmitting() || form.pristine"
        >
          <mat-icon>refresh</mat-icon>
          {{ resetButtonText() }}
        </button>
        } @if (showCancelButton()) {
        <button
          mat-stroked-button
          type="button"
          (click)="onCancel()"
          [disabled]="isSubmitting()"
        >
          <mat-icon>close</mat-icon>
          {{ cancelButtonText() }}
        </button>
        }

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="(form.invalid && !allowInvalidSubmit()) || isSubmitting()"
        >
          @if (isSubmitting()) {
          <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
          } @else {
          <mat-icon>send</mat-icon>
          }
          {{ submitButtonText() }}
        </button>
      </div>
    </form>
  `,
  styles: `
  .generic-form {
      width: 100%;
      max-width: 100%;
      container-type: inline-size;
    }

    .form-grid {
      display: grid;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    /* Layouts responsivos con Container Queries */
    .grid-1 { grid-template-columns: 1fr; }
    
    .grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    }
    
    .grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
    }
    
    .grid-4 {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
    }

    .grid-auto {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    }

    /* Breakpoints con Container Queries (más moderno) */
    @container (max-width: 600px) {
      .form-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem;
      }
    }

    @container (min-width: 900px) {
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .grid-4 { grid-template-columns: repeat(4, 1fr); }
    }

    .form-field-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 0; /* Previene overflow en grid */
    }

    /* Clases de tamaño de campo */
    .field-small { grid-column: span 1; }
    .field-medium { grid-column: span 2; }
    .field-large { grid-column: span 3; }
    .field-full { grid-column: 1 / -1; }

    @container (max-width: 600px) {
      .field-small,
      .field-medium,
      .field-large {
        grid-column: span 1 !important;
      }
    }

    .full-width {
      width: 100%;
    }

    /* Required asterisk */
    .required-asterisk {
      color: #f44336;
      margin-left: 4px;
      font-weight: bold;
    }

    /* Checkbox improvements */
    mat-checkbox {
      margin-top: 8px;
    }

    .checkbox-error {
      color: #f44336;
      font-size: 0.75rem;
      margin-top: 4px;
      margin-left: 32px;
      display: block;
    }

    /* Radio Group */
    .radio-group-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .radio-group-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    mat-radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .radio-hint,
    .radio-error {
      font-size: 0.75rem;
      margin-top: 4px;
    }

    .radio-error {
      color: #f44336;
    }

    /* Slider */
    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .slider-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .slider-value {
      font-size: 0.875rem;
      text-align: center;
      color: rgba(0, 0, 0, 0.6);
    }

    .slider-hint {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.6);
    }

    /* Form status */
    .form-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background-color: #e8f5e9;
      color: #2e7d32;
      font-size: 0.875rem;
    }

    .form-status.invalid {
      background-color: #ffebee;
      color: #c62828;
    }

    .form-status mat-icon {
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Form actions */
    .form-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .form-actions.align-left { justify-content: flex-start; }
    .form-actions.align-center { justify-content: center; }
    .form-actions.align-right { justify-content: flex-end; }
    .form-actions.align-space-between { justify-content: space-between; }

    .form-actions button {
      min-width: 100px;
    }

    .inline-spinner {
      display: inline-block;
      margin-right: 8px;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .radio-group-label,
      .slider-label {
        color: black;
      }

      .form-status {
        background-color: rgba(46, 125, 50, 0.2);
        color: #81c784;
      }

      .form-status.invalid {
        background-color: rgba(198, 40, 40, 0.2);
        color: #ef5350;
      }
    }

    /* Animaciones sutiles */
    .form-field-wrapper {
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Accessibility improvements */
    mat-error {
      font-size: 0.75rem;
      line-height: 1.2;
    }

    /* Print styles */
    @media print {
      .form-actions {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ApxFormulario {
  // Inputs
  fields = input<FieldConfig[]>([]);
  columns = input<1 | 2 | 3 | 4 | 'auto'>(2);

  // Configuración de botones
  submitButtonText = input('Enviar');
  cancelButtonText = input('Cancelar');
  resetButtonText = input('Restablecer');
  showCancelButton = input(false);
  showResetButton = input(false);
  allowInvalidSubmit = input(false);
  showFormStatus = input(false);

  actionsAlign = input<'left' | 'center' | 'right' | 'space-between'>('right');
  isSubmitting = input(false);

  // Valores iniciales del formulario
  initialValues = input<Record<string, any>>({});

  // Outputs
  formSubmit = output<any>();
  formCancel = output<void>();
  formReset = output<void>();
  formChange = output<any>();
  formValid = output<boolean>();

  // Estado interno
  form!: FormGroup;
  private fb = inject(FormBuilder);

  // Computed signals
  visibleFields = computed(() => {
    return this.fields().filter((field) => {
      if (field.hidden) return false;
      if (field.showWhen) {
        return field.showWhen(this.form?.value || {});
      }
      return true;
    });
  });

  gridClass = computed(() => {
    const cols = this.columns();
    return `grid-${cols}`;
  });

  ngOnInit() {
    this.buildForm();
    this.setupFormListeners();
  }

  buildForm() {
    const group: any = {};
    const initialVals = this.initialValues();

    this.fields().forEach((field) => {
      const validators = this.getValidators(field.validators || []);
      const initialValue =
        initialVals[field.key] ?? field.value ?? this.getDefaultValue(field);

      group[field.key] = [
        { value: initialValue, disabled: field.disabled ?? false },
        validators,
      ];
    });

    this.form = this.fb.group(group);
  }

  setupFormListeners() {
    // Emitir cambios del formulario
    this.form.valueChanges.subscribe((value) => {
      this.formChange.emit(value);
    });

    // Emitir estado de validez
    this.form.statusChanges.subscribe(() => {
      this.formValid.emit(this.form.valid);
    });
  }

  getDefaultValue(field: FieldConfig): any {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
        return 0;
      case 'slider':
        return field.min || 0;
      case 'select':
        return field.multiple ? [] : null;
      default:
        return null;
    }
  }

  private readonly STANDARD_VALIDATORS: Record<
    Lowercase<StandardValidatorName>,
    (args?: ValidatorConfig['args']) => ValidatorFn | null
  > = {
    required: () => Validators.required,
    email: () => Validators.email,
    requiredtrue: () => Validators.requiredTrue,
    minlength: (args) =>
      args?.min !== undefined ? Validators.minLength(args.min) : null,
    maxlength: (args) =>
      args?.max !== undefined ? Validators.maxLength(args.max) : null,
    min: (args) => (args?.min !== undefined ? Validators.min(args.min) : null),
    max: (args) => (args?.max !== undefined ? Validators.max(args.max) : null),
    pattern: (args) =>
      args?.pattern ? Validators.pattern(args.pattern) : null,
  };
  getValidators(validatorConfigs: ValidatorConfig[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    validatorConfigs.forEach((config) => {
      // 1️⃣ Validador personalizado
      if (config.validatorFn) {
        validators.push(config.validatorFn);
        return;
      }
      const name =
        config.name.toLowerCase() as Lowercase<StandardValidatorName>;
      const validatorFactory = this.STANDARD_VALIDATORS[name];

      // 2️⃣ Validador estándar
      if (validatorFactory) {
        const validator = validatorFactory(config.args);
        if (validator) {
          validators.push(validator);
        }
      } else {
        console.warn(`⚠️ Validador "${config.name}" no reconocido.`);
      }
    });

    return validators;
  }

  getFieldClass(field: FieldConfig): string {
    const classes: string[] = [];

    if (field.fieldSize) {
      classes.push(`field-${field.fieldSize}`);
    }

    if (field.customClass) {
      classes.push(field.customClass);
    }

    return classes.join(' ');
  }

  hasError(fieldKey: string): boolean {
    const control = this.form.controls[fieldKey];
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(field: FieldConfig): string {
    const control = this.form.controls[field.key];
    if (!control) return '';

    // Buscar mensaje personalizado
    const validatorConfig = field.validators?.find((v) => {
      const errorKey = this.getErrorKey(v.name);
      return control.errors?.[errorKey] && v.message;
    });

    if (validatorConfig?.message) {
      return validatorConfig.message;
    }

    // Mensajes por defecto
    if (control.errors?.['required']) {
      return `${field.label} es requerido`;
    }
    if (control.errors?.['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Mínimo ${required} caracteres`;
    }
    if (control.errors?.['maxlength']) {
      const required = control.errors['maxlength'].requiredLength;
      return `Máximo ${required} caracteres`;
    }
    if (control.errors?.['email']) {
      return 'Email inválido';
    }
    if (control.errors?.['min']) {
      return `Valor mínimo: ${control.errors['min'].min}`;
    }
    if (control.errors?.['max']) {
      return `Valor máximo: ${control.errors['max'].max}`;
    }
    if (control.errors?.['pattern']) {
      return 'Formato inválido';
    }

    return 'Campo inválido';
  }

  getCharacterCount(fieldKey: string): number {
    const value = this.form.controls[fieldKey]?.value;
    return value ? String(value).length : 0;
  }

  private getErrorKey(validatorName: string): string {
    const errorKeyMap: Record<string, string> = {
      required: 'required',
      email: 'email',
      minlength: 'minlength',
      maxlength: 'maxlength',
      min: 'min',
      max: 'max',
      pattern: 'pattern',
      requiredtrue: 'required',
    };
    return (
      errorKeyMap[validatorName.toLowerCase()] || validatorName.toLowerCase()
    );
  }

  onSubmit() {
    if (this.form.valid || this.allowInvalidSubmit()) {
      this.formSubmit.emit(this.form.getRawValue());
    } else {
      // Marcar todos como tocados
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsTouched();
      });
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  onReset() {
    this.form.reset(this.initialValues());
    this.formReset.emit();
  }

  // Métodos públicos para control externo
  resetForm() {
    this.form.reset(this.initialValues());
  }

  patchValue(values: Record<string, any>) {
    this.form.patchValue(values);
  }

  setValue(values: Record<string, any>) {
    this.form.setValue(values);
  }

  getFormValue() {
    return this.form.getRawValue();
  }

  markAsTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].markAsTouched();
    });
  }
}
