import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  fecha: string;
  constructor() { }

  ngOnInit(): void {
    this.fecha = formatDate(new Date(), 'yyyy', 'es-AR');
  }

}
