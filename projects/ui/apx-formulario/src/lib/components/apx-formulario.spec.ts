import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ApxFormulario } from './apx-formulario';

describe('App', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [ApxFormulario],
    });
    
    const fixture = TestBed.createComponent(ApxFormulario);
    const component = fixture.componentInstance;
    
    expect(component).toBeTruthy();
  });
});