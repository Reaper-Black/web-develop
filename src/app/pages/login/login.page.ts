import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isTypePassword: boolean = true;
  isLogin = false


  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.initForm();
  }

  ngOnInit(): void{}

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('',
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('',
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.form.valid) return;
    console.log(this.form.value);
    this.login(this.form)
  }

  login(form){
    this.isLogin = true
    console.log(form.value)
    this.authService.login(form.value.email, form.value.password).then(data  => {
      console.log(data)
      this.router.navigateByUrl('/home')
      this.isLogin = false
      form.reset()
    })
    .catch(e => {
      console.log(e)
      this.isLogin = false
      let msg: string = 'Could not sign you up, please try again.'
      if(e.code == 'auth/user-not-found') msg = 'Email address could not found'
      else if(e.code == 'auth/wrong-password') msg = 'Please enter a correct password'
        msg = 'Email already in use'
      this.showAlert(msg)
    })
  }

  async showAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

}






