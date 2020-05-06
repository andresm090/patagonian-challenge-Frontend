import { Component, OnInit } from '@angular/core';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';
import { ImagenItem } from 'src/app/models/imagen-item/imagen-item';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  constructor(private imagenItemService: ImagenItemService) { }

  imagenItems = []
  
  ngOnInit(): void {
    this.imagenItemService.getImagenes().subscribe(item => {
      this.imagenItems = item.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as ImagenItem;
      });
    });
  }

}
