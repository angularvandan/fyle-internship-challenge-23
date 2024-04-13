import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoListingPageComponent } from './repo-listing-page.component';

describe('RepoListingPageComponent', () => {
  let component: RepoListingPageComponent;
  let fixture: ComponentFixture<RepoListingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoListingPageComponent]
    });
    fixture = TestBed.createComponent(RepoListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
