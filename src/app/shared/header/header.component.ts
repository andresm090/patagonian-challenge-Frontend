import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  @Input() isLoggedIn: boolean;
  
  constructor( private storageService: StorageService, private routerRedirect: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.storageService.userAuth = null;
    this.routerRedirect.navigate(["/"]);
  }

}
