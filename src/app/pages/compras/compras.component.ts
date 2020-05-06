import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import  compras from '../../../assets/compras/compras.json';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;

  previous: any = [];
  headElements = ['number', 'name', 'date', 'sku', 'weight', 'height', 'width', 'origin', 'minimum', 'delay'];
  elements: any = []
  
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.elements = compras.compras;
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {

    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  trackByFn(index: number) {
    return index;
  }

}
