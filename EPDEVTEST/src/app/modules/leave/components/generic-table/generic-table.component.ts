
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements AfterViewInit  {
  displayedColumns: string[] = ['avathar', 'leaveType', 'fromDate', 'toDate','strNumber_of_Days','leaveStatusDesc','action'];
  exampleDatabase: any[] | null;
  data: any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @Input() tableDate:any =[];

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  }

  ngOnChanges(){

    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.resultsLength = this.tableDate.length;
    console.log("cccc =======>", this.tableDate.length);
    this.data = this.tableDate;
  }
  
}

// export interface GithubApi {
//   items: GithubIssue[];
//   total_count: number;
// }

// export interface GithubIssue {
//   created_at: string;
//   number: string;
//   state: string;
//   title: string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDatabase  {
//   constructor(private _httpClient: HttpClient) {}

//   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
//     const href = 'https://api.github.com/search/issues';
//     const requestUrl =
//         `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

//     return this._httpClient.get<GithubApi>(requestUrl);
//   }
// }