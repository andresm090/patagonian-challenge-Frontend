import { Component, OnInit, Input, Inject } from '@angular/core';
import { ImagenItem } from 'src/app/models/imagen-item/imagen-item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';

export interface DialogData {
  id: string; // identificador del elemento a eliminar. 
}

@Component({
  selector: 'app-imagen-item',
  templateUrl: './imagen-item.component.html',
  styleUrls: ['./imagen-item.component.css']
})
export class ImagenItemComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input() item: ImagenItem;

  ngOnInit(): void {
  }

  showMessage(): void {
    this.dialog.open(DialogDelete, {
      width: '300px',
      data: {id: this.item.id}
    });
  }

}
// Componente simple para mostrar cuadro de dialogo.
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private imagenItemService: ImagenItemService) {}

  close(): void {
    this.dialogRef.close();
  }

  delete(id: string) {
    this.imagenItemService.deleteImagenItem(id);
    this.close();
  }

}