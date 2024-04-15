import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  YOUR_ACCESS_TOKEN='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';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(gitHubUserName: string) {
    
    return this.httpClient.get(`https://api.github.com/users/${gitHubUserName}`);
  }
  getAllRepo(gituser:string,currentRepoPage:number,repoPerPage:number) {
    
    const params = {
      page: currentRepoPage,
      per_page:repoPerPage
    };
    return this.httpClient.get(`https://api.github.com/users/${gituser}/repos`,{params });
  }
  getAllLanguage(fullname:string){
    
    return this.httpClient.get(`https://api.github.com/repos/${fullname}/languages`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
