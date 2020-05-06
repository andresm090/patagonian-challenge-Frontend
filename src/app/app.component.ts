import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { User } from './models/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'patagonian-app';
  user$: User | null;
  isLoggedIn$: boolean;

  constructor(private storeService: StorageService) {}

  ngOnInit() {
    
    this.storeService.user.subscribe((user) => {
  
      if (user == null || user == '') {
        this.isLoggedIn$ = false;
        this.user$ = null;  
      } else {
        this.isLoggedIn$ = true;
        this.user$ = user;
      }
   })


  
  }
    

}
