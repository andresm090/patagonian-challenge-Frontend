import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: any;
  showLoader: boolean = false;
  error: boolean = false;

  constructor(private userService: UserService, private storeService: StorageService, private routerRedirect: Router) {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {}

  onSubmit() {
    this.loader();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userService.getUserarioLogin(username, password).subscribe(data => {
      let users= data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as User;
      });

      if (users.length > 0) {
        this.error = false;
        this.setUserLocal(users[0]);
        this.routerRedirect.navigate(["/"]);
      } else {
        this.error = true;
      }
      this.loader();
    });
  }

  loader() {
    this.showLoader = !this.showLoader;
  }

  /**
   * Metodo que establece el usuario registrado en el local storage
   * @param user 
   */
  setUserLocal(user: User) {
    this.storeService.userAuth =user;
  }
}
