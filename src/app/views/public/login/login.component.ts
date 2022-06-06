import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { StorageKeys } from 'src/app/core/modals/storage-keys.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  errorMSG: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {
    this.errorMSG = '';
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  ngOnInit(): void {}
  submit() {
    console.log('tring to login');
    this.api.login(this.loginForm.value).subscribe((res) => {
      if (res && !res.error) {
        var username = res.data.email.toString();

        localStorage.setItem(StorageKeys.TOKEN, res.token);
        localStorage.setItem(StorageKeys.EMAIL, username);
        this.router.navigateByUrl('/users');
        return;
      } else {
        console.log(res);
        this.errorMSG = res.error;
      }
    });
  }
}
