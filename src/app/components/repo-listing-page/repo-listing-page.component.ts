import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repo-listing-page',
  templateUrl: './repo-listing-page.component.html',
  styleUrls: ['./repo-listing-page.component.scss']
})
export class RepoListingPageComponent implements OnInit {

  notFoundError: boolean = false;
  showLoading: boolean = false;

  user: any;
  gitRepoLanguages:any[]=[];

  pageSizes: number[] = [10, 20, 30, 40, 50, 80, 100];

  allUserRepo: any;
  currentRepoPage: number = 1;
  repoPerPage: number = 10;
  totalRepoLength:number=0;
  totalRepoPage:number=0;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getUser();
  }
  onSearch(input: string) {

    // console.log(input);
    if(input){
      this.getUser(input);
    }
    else{
      return;
    }
  }
  getUser(input: string = 'johnpapa') {
    this.showLoading = true;

    this.apiService.getUser(input).subscribe((data: any) => {
      console.log(data);
      if(!data.name){
        this.notFoundError = true;
        this.showLoading = false;
      }
      this.user = data;
      this.totalRepoLength=data?.public_repos;
      this.totalRepoPage=Math.ceil(this.totalRepoLength/this.repoPerPage);
      // console.log(this.totalRepoLength);
      this.notFoundError = false;

    }, error => {
      this.notFoundError = true;
      this.showLoading = false;

    },()=>{
      this.getAllRepo();
    });
  }
  getAllRepo(){
    this.apiService.getAllRepo(this.user?.login,this.currentRepoPage,this.repoPerPage).subscribe((data: any) => {
      console.log(data);
      // console.log( (data.headers));
      
      this.allUserRepo = data;
      this.notFoundError = false;
      this.showLoading = false;
      this.getAllLanguage(data);

    }, error => {
      this.notFoundError = true;
      this.showLoading = false;

    });
  }
  getAllLanguage(data:any[]){
    console.log(data);
    //here i bind the all language into topics;
    let languages=data.map((repo:any)=>{
      this.apiService.getAllLanguage(repo.full_name).subscribe((data:any)=>{
        let key=Object.keys(data);
        repo.topics=[...key];
        
      });
      return repo;
    });
    // console.log(languages);
  }
  onPageChange(page:any){
    this.currentRepoPage = page;
    //below code for show number of page after change the itemp of per page;
    this.totalRepoPage=Math.ceil(this.totalRepoLength/this.repoPerPage);

    this.getAllRepo();
  }
}
