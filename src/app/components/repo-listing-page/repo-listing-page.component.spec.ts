import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RepoListingPageComponent } from './repo-listing-page.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';


describe('RepoListingPageComponent', () => {
  let component: RepoListingPageComponent;
  let fixture: ComponentFixture<RepoListingPageComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getAllRepo', 'getAllLanguage']);

   await TestBed.configureTestingModule({
      declarations: [RepoListingPageComponent],
      imports: [HttpClientTestingModule], // Add HttpClientModule to imports
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    fixture = TestBed.createComponent(RepoListingPageComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getUser on ngOnInit', () => {
    spyOn(component, 'getUser'); // Spy on getUser method
    component.ngOnInit();
    expect(component.getUser).toHaveBeenCalled();
  });
  it('should call getUser method when input is not blank', () => {
    spyOn(component, 'getUser');
    component.onSearch('searchValue'); // Call onSearch with a non-blank input
    expect(component.getUser).toHaveBeenCalledWith('searchValue');
  });
  it('should not call getUser method when input is blank', () => {
    spyOn(component, 'getUser');
    component.onSearch(''); // Call onSearch with a blank input
    expect(component.getUser).not.toHaveBeenCalled();
  });


  it('should set notFoundError property on error in getUser', () => {
    const errorResponse = { status: 404, message: 'User not found' };
    apiService.getUser.and.returnValue(throwError(errorResponse));

    component.getUser();

    expect(component.notFoundError).toBeTrue();
  });
  it('should fetch all languages for each repository and update topics property on successful getAllLanguage', () => {
    const repoData = [{ full_name: 'user/repo1' ,topics:['javascript']}, { full_name: 'user/repo2' ,topics:['javascript'] }]; 
    apiService.getAllLanguage.and.returnValue(of({ 'JavaScript': 100 })); 

    component.getAllLanguage(repoData);

    expect(apiService.getAllLanguage).toHaveBeenCalledTimes(2);
    expect(repoData[0].topics).toEqual(['JavaScript']); 
    expect(repoData[1].topics).toEqual(['JavaScript']); 
  });
  
  it('should set notFoundError property on error in getAllRepo', () => {
    const errorResponse = { status: 404, message: 'User repositories not found' };
    apiService.getAllRepo.and.returnValue(throwError(errorResponse));

    component.getAllRepo();

    expect(component.notFoundError).toBeTrue();
    expect(component.showLoading).toBeFalse();
  });
  it('should update currentRepoPage, calculate totalRepoPage, and call getAllRepo', () => {
    const page = 2;
    component.totalRepoLength = 100;
    component.repoPerPage = 10;

    spyOn(component, 'getAllRepo');

    component.onPageChange(page);

    expect(component.currentRepoPage).toEqual(page);
    expect(component.totalRepoPage).toEqual(10); // 100 / 10 = 10 pages
    expect(component.getAllRepo).toHaveBeenCalled();
  });

});
