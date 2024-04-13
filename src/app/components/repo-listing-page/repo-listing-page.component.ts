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

  pageSizes: number[] = [10, 20, 30, 40, 50, 80, 100];

  allUserRepo: any;
  currentRepoPage: number = 1;
  repoPerPage: number = 10;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getUser();
  }
  onSearch(input: string) {

    // console.log(input);
    this.getUser(input);
  }
  getUser(input: string = 'johnpapa') {
    this.showLoading = true;

    this.apiService.getUser(input).subscribe((data: any) => {
      console.log(data);
      this.user = data;
      this.notFoundError = false;

      this.apiService.getAllRepo(this.user.login).subscribe((data: any) => {
        console.log(data);
        this.allUserRepo = data;
        this.notFoundError = false;
        this.showLoading = false;

      }, error => {
        this.notFoundError = true;
        this.showLoading = false;

      });

    }, error => {
      this.notFoundError = true;
      this.showLoading = false;

    });
  }
  pageChanged(page: any) {
    this.currentRepoPage = page;
  }
}
