import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch user data from GitHub API', () => {
    const username = 'testuser';
    const dummyUserData = { login: 'testuser', name: 'Test User' };

    service.getUser(username).subscribe(data => {
      expect(data).toEqual(dummyUserData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserData);
  });
  it('should fetch repositories for a user from GitHub API', () => {
    const username = 'testuser';
    const page = 1;
    const perPage = 10;
    const dummyRepoData = [{ name: 'repo1' }, { name: 'repo2' }];

    service.getAllRepo(username, page, perPage).subscribe(data => {
      expect(data).toEqual(dummyRepoData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepoData);
  });
  it('should fetch languages for a repository from GitHub API', () => {
    const repoFullName = 'testuser/repo1';
    const dummyLanguageData = { TypeScript: 100, JavaScript: 200 };

    service.getAllLanguage(repoFullName).subscribe(data => {
      expect(data).toEqual(dummyLanguageData);
    });

    const req = httpMock.expectOne(`https://api.github.com/repos/${repoFullName}/languages`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLanguageData);
  });


});
