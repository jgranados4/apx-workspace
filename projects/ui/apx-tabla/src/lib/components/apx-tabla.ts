import {
  Component,
  effect,
  input,
  viewChild,
} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'lib-apx-tabla',
  imports: [MaterialModule],
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource">
        @for (column of displayedColumns(); track $index) {
        <ng-container [matColumnDef]="column">
          <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
          <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
        </ng-container>
        }
        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
      </table>
      <mat-paginator
        [pageSize]="pageSize()"
        [pageSizeOptions]="pageSizeOptions()"
        showFirstLastButtons
        [attr.aria-label]="ariaLabel()"
      >
      </mat-paginator>
    </div>
  `,
  styles: ``,
})
export class ApxTabla<T> {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();
  pageSize = input<number>(5);
  pageSizeOptions = input<number[]>([5, 10, 20]);
  paginator = viewChild.required<MatPaginator>(MatPaginator);
  ariaLabel = input<string>('Seleccionar página de elementos');
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      console.log('sincronizacion de los datos ');
      const paginatorInstance = this.paginator();
      if (this.dataSource.paginator !== paginatorInstance) {
        this.dataSource.paginator = paginatorInstance;
        console.log('AfterRenderEffect paginacion');
      }
    });
  }
}
