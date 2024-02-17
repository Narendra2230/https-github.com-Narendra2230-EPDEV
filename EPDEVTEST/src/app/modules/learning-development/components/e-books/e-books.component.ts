import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { iconRenderer } from './iconRenderer';

@Component({
  selector: 'app-e-books',
  templateUrl: './e-books.component.html',
  styleUrls: ['./e-books.component.css']
})
export class EBooksComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  displayedColumnDefs = [
    {
      field: "name",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Book Name",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:533
    },
    {
      field: "author",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Author",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:300
    },
    {
      field: "category",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Category",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "path",
      cellRenderer: "iconRenderer",
      // cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "View/Download Books",
      cellStyle: { textAlign: "center" }
    }
  ];
  displayedRowData :any = [];
  frameworkComponents = {
    iconRenderer: iconRenderer
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  gridApi;
  defaultColDef : ColDef = {
    sortable:true,filter:true
  }

  filteredBooks;
  authors = [];
  category = [];
  errorMessage=null;
  filterCriteria = {
    author : null,
    category : null
  }

  ngOnInit() {
    this._http.get('assets/json/eBooks.json').subscribe(res => {
      this.displayedRowData = res;
      this.filteredBooks = res
    }).add(()=>{
    for(let i in this.displayedRowData){
      if(!this.authors.includes(this.displayedRowData[i].author)){
        this.authors.push(this.displayedRowData[i].author)
      }
      if(!this.category.includes(this.displayedRowData[i].category)){
        this.category.push(this.displayedRowData[i].category)
      }
    }
  })
  }

  onGridReady(event:any){
    this.gridApi = event.api;
  }

  filterAuthor(data :any){
    if(data == ''){
      this.filterCriteria.author = null
    }
    else this.filterCriteria.author = data
    this.filter()
  }

  filterCategory(data :any){
    if(data == ''){
      this.filterCriteria.category = null
    }
    else this.filterCriteria.category = data;
    this.filter()
  }

  filter(){
    this.filteredBooks = this.displayedRowData.filter((i) => {
      if(this.filterCriteria.author && this.filterCriteria.category){
      if(i.category.toLowerCase() == this.filterCriteria.category.toLowerCase() && i.author.toLowerCase() == this.filterCriteria.author.toLowerCase()){
        return true
      }
      else return false
      }
      else if(this.filterCriteria.author){
        if(i.author.toLowerCase() == this.filterCriteria.author.toLowerCase()){
          return true
        }
        else return false
      }
      else if(this.filterCriteria.category){
        if(i.category.toLowerCase() == this.filterCriteria.category.toLowerCase()){
          return true
        }
        else return false
      }
      else if(!this.filterCriteria.author && !this.filterCriteria.category){
        return true
      }
    });
    if(this.filteredBooks.length == 0){
      this.errorMessage = "No books available based on filter!"
    }
    else{
      this.errorMessage = null
    }
  }

}
