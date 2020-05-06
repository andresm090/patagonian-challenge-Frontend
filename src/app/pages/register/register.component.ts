import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ImagenService } from 'src/app/services/imagen/imagen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

// Componente simple para el registro de usuarios
// Nota: El registro de usuarios se realiza a traves del storage del navegador, y no contempla ningun tipo de validacion.
//       El objetivo de este componente es establecer una forma simple de carga y visualizaacion de los datos de usuarios.
//       Para una implementcación correcta se deben emplear los mecanismos adecuados de registro.  
export class RegisterComponent implements OnInit {

  @ViewChild("modalLoader") modalLoader: ModalDirective;
  registerForm: any;
  photoString: string = "";
  errors: boolean = false;
  showLoader: boolean = false;

  constructor(private userService: UserService, private storeService: StorageService, private routerRedirect: Router, private imagenService: ImagenService) { 

    this.registerForm = new FormGroup({
      name: new FormControl(),
      lastname: new FormControl(),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      photoUrl: new FormControl(),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  
  }

  ngOnInit(): void {}

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  async onSubmit(registerData) {
    if (this.registerForm.valid) {
      this.loader();
      registerData.photoUrl = (this.photoString.length > 0) ? await this.imagenService.uploadImage(this.photoString, 'profile') : this.photoString; // cargamos la imagen en el storage
      let newUser = ((await this.userService.createUsuario(registerData) as unknown)) as User;
      registerData.password=""; // borramos el password para que este no sea visible desde el storage del navegador
      registerData.id = newUser.id;
      this.storeService.userAuth = registerData;
      this.loader();
      this.routerRedirect.navigate(["/"]);
    }
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
    this.photoString = 'data:image/png;base64,' + btoa(e.target.result);
  }

  loader() {
    this.showLoader = !this.showLoader;
    (this.showLoader) ? this.showModalLoader(): this.hideModalLoader();
  }

  showModalLoader() {
    this.modalLoader.show();
  }

  hideModalLoader() {
    this.modalLoader.hide();
  }
}
