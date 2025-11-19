import {
  afterRenderEffect,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgTemplateOutlet } from '@angular/common';
import {MaterialModule} from '@jgranados199795/apx-ui/apx-material'
export interface TableColumn<T> {
  /** Identificador único de la columna (debe coincidir con propiedad del objeto) */
  key: Extract<keyof T,string> | 'actions';

  /** Etiqueta a mostrar en el header */
  label: string;

  /** Ancho de la columna (ej: '100px', '20%') */
  width?: string;

  /** Si es true, usa template custom proyectado */
  useTemplate?: boolean;

  /** Clase CSS adicional para la columna */
  cssClass?: string;
}
export interface TableAction<T> {
  action: 'edit' | 'delete' | 'custom';
  row: T;
  index: number;
}
@Component({
  selector: 'lib-apx-tabla',
  imports: [MaterialModule, NgTemplateOutlet],
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource">
        <!-- Columnas de datos -->
        @for (column of columns(); track column.key) { @if (column.key !==
        'actions') {
        <ng-container [matColumnDef]="column.key">
          <th
            mat-header-cell
            *matHeaderCellDef
            [style.width]="column.width"
            [class]="column.cssClass"
          >
            {{ column.label }}
          </th>
          <td
            mat-cell
            *matCellDef="let element; let i = index"
            [class]="column.cssClass"
          >
            <!-- Template custom proyectado -->
            @if (column.useTemplate && cellTemplate()) {
            <ng-container
              *ngTemplateOutlet="
                cellTemplate()!;
                context: {
                  column: column.key,
                  row: element,
                  index: i
                }
              "
            >
            </ng-container>
            } @else {
            <!-- Renderizado por defecto -->
            {{ element[column.key] }}
            }
          </td>
        </ng-container>
        } }

        <!-- Columna de acciones -->
        @if (showActions()) {
        <ng-container matColumnDef="actions">
          <th
            mat-header-cell
            *matHeaderCellDef
            [style.width]="actionsColumnWidth()"
          >
            {{ actionsLabel() }}
          </th>
          <td mat-cell *matCellDef="let element; let i = index">
            <div class="action-buttons">
              @if (showEditButton()) {
              <button
                mat-icon-button
                color="primary"
                [attr.aria-label]="'Editar ' + element"
                (click)="handleEdit(element, i)"
              >
                <mat-icon>edit</mat-icon>
              </button>
              } @if (showDeleteButton()) {
              <button
                mat-icon-button
                color="warn"
                [attr.aria-label]="'Eliminar ' + element"
                (click)="handleDelete(element, i)"
              >
                <mat-icon>delete</mat-icon>
              </button>
              }

              <!-- Template custom para acciones adicionales -->
              @if (actionsTemplate()) {
              <ng-container
                *ngTemplateOutlet="
                  actionsTemplate()!;
                  context: {
                    row: element,
                    index: i
                  }
                "
              >
              </ng-container>
              }
            </div>
          </td>
        </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        <!-- Fila cuando no hay datos -->
        @if (dataSource.data.length === 0) {
        <tr class="mat-row no-data-row">
          <td
            [attr.colspan]="displayedColumns.length"
            class="mat-cell no-data-cell"
          >
            {{ noDataMessage() }}
          </td>
        </tr>
        }
      </table>
      <ng-content></ng-content>
      <mat-paginator
        [pageSize]="pageSize()"
        [pageSizeOptions]="pageSizeOptions()"
        [showFirstLastButtons]="showFirstLastButtons()"
        [attr.aria-label]="ariaLabel()"
      >
      </mat-paginator>
    </div>
  `,
  styles: ` .action-buttons {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    
    .no-data-row {
      height: 100px;
    }
    
    .no-data-cell {
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
      font-style: italic;
    }`,
})
export class ApxTabla<T> {
  columns = input.required<TableColumn<T>[]>();
  data = input.required<T[]>();

  pageSize = input<number>(5);
  pageSizeOptions = input<number[]>([5, 10, 20]);
  ariaLabel = input<string>('Seleccionar página de elementos');
  showFirstLastButtons = input<boolean>(true);
  noDataMessage = input<string>('No hay datos disponibles');
  // ============================================
  // INPUTS - Configuración de acciones
  // ============================================
  /** Mostrar columna de acciones */
  showActions = input<boolean>(false);
  /** Mostrar botón de editar */
  showEditButton = input<boolean>(true);
  /** Mostrar botón de eliminar */
  showDeleteButton = input<boolean>(true);
  /** Label del header de acciones */
  actionsLabel = input<string>('Acciones');
  /** Ancho de la columna de acciones */
  actionsColumnWidth = input<string>('150px');
  // ============================================
  // OUTPUTS - Eventos de acciones
  // ============================================

  /** Emitido cuando se hace click en editar */
  Edit = output<TableAction<T>>();

  /** Emitido cuando se hace click en eliminar */
  Delete = output<TableAction<T>>();

  /** Emitido para acciones custom */
  Action = output<TableAction<T>>();

  // ============================================
  // CONTENT PROJECTION - Templates custom
  // ============================================

  /** Template custom para renderizar celdas */
  cellTemplate = contentChild<TemplateRef<unknown>>('cellTemplate');

  /** Template custom para acciones adicionales */
  actionsTemplate = contentChild<TemplateRef<unknown>>('actionsTemplate');
  dataSource = new MatTableDataSource<T>();
  paginator = viewChild.required<MatPaginator>(MatPaginator);
  get displayedColumns(): string[] {
    const cols = this.columns().map((c) => String(c.key));
    return this.showActions() ? [...cols, 'actions'] : cols;
  }
  constructor() {
     afterRenderEffect({
       write: () => {
         this.dataSource.data = this.data();

         const paginatorInstance = this.paginator();
         if (this.dataSource.paginator !== paginatorInstance) {
           this.dataSource.paginator = paginatorInstance;
         }
       },
     });
  }
  /**
   * Maneja el evento de editar una fila
   */
  handleEdit(row: T, index: number): void {
    this.Edit.emit({
      action: 'edit',
      row,
      index,
    });
  }

  /**
   * Maneja el evento de eliminar una fila
   */
  handleDelete(row: T, index: number): void {
    this.Delete.emit({
      action: 'delete',
      row,
      index,
    });
  }
  /**
   * Método público para obtener la página actual
   */
  getCurrentPage(): number {
    return this.paginator().pageIndex;
  }

  /**
   * Método público para ir a una página específica
   */
  goToPage(pageIndex: number): void {
    this.paginator().pageIndex = pageIndex;
  }
}
