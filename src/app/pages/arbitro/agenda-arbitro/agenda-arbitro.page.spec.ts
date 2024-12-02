import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaArbitroPage } from './agenda-arbitro.page';

describe('AgendaArbitroPage', () => {
  let component: AgendaArbitroPage;
  let fixture: ComponentFixture<AgendaArbitroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaArbitroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
