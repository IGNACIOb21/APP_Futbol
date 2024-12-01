import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileArbitroPage } from './profile-arbitro.page';

describe('ProfileArbitroPage', () => {
  let component: ProfileArbitroPage;
  let fixture: ComponentFixture<ProfileArbitroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArbitroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
