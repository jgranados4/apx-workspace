import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApxFormulario } from './apx-formulario';

describe('ApxFormulario', () => {
  let component: ApxFormulario;
  let fixture: ComponentFixture<ApxFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApxFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApxFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
