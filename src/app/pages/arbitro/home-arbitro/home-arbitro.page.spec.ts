import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeArbitroPage } from './home-arbitro.page';

describe('HomeArbitroPage', () => {
  let component: HomeArbitroPage;
  let fixture: ComponentFixture<HomeArbitroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeArbitroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
