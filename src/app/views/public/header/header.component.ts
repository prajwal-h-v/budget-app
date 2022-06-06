import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { StorageKeys } from 'src/app/core/modals/storage-keys.enum';
import { UsersComponent } from '../../secured/users/users.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private api: ApiService) {
    this.email = localStorage.getItem(StorageKeys.EMAIL);
    if (this.email) this.username = this.email.split('@')[0];
  }
  title = 'Budget App';
  email: any = '';
  username: string = '';

  ngOnInit(): void {}
  logout() {
    this.api.logout();
  }
}
