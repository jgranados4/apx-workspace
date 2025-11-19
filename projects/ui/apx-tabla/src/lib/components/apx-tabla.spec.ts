import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ApxTabla } from './apx-tabla';


describe('ApxTablaComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [ApxTabla],
    });

    const fixture = TestBed.createComponent(ApxTabla);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
