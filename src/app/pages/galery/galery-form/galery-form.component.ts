import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';

@Component({
  selector: 'app-galery-form',
  templateUrl: './galery-form.component.html',
  styleUrls: ['./galery-form.component.css']
})

// Componente simple que solo proporciona un formulario para la carga de imagenes. 
// No se dedico tiempo a la estetica del mismo
export class GaleryFormComponent implements OnInit {

  imagenItemForm: any;
  showLoader: boolean = false;
  imagenString: string = ""; // representacion de la imagen en Base64 para su previsualizacion

  constructor(private imagenItemService: ImagenItemService) {

    this.imagenItemForm = new FormGroup({
      imagenUrl: new FormControl(),
      description: new FormControl(),
    });
  }
  
  ngOnInit(): void {}

  async onSubmit(imagenItemData: any){
    
    this.loader();
    imagenItemData.imagenUrl = this.imagenString; // establecemos el valor del campo imagenURL con la representacion de la imagen en Base64
    await this.imagenItemService.createImagenItem(imagenItemData);
    this.resetForm();
    this.loader();
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoadedImages.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoadedImages(e) {
    this.imagenString = 'data:image/png;base64,' + btoa(e.target.result);
  }
  
  loader() {
    this.showLoader = !this.showLoader;
  }

  resetForm() {
    this.imagenString = "";
    this.imagenItemForm.reset();
  }
}
