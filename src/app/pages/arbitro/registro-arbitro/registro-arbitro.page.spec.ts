import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroArbitroPage } from './registro-arbitro.page';

describe('RegistroArbitroPage', () => {
  let component: RegistroArbitroPage;
  let fixture: ComponentFixture<RegistroArbitroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroArbitroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
