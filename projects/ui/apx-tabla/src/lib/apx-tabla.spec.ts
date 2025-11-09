import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApxTabla } from './apx-tabla';

describe('ApxTabla', () => {
  let component: ApxTabla;
  let fixture: ComponentFixture<ApxTabla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApxTabla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApxTabla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
