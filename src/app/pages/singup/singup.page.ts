import { FirestoreService } from './../../firestore.service'; // Corrigir o caminho se necessário
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public router: Router,
    private firestoreService: FirestoreService // Use o FirestoreService
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
      password: ['', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]] // Verifique a validade da senha
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async singUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      try {
        const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);

        if (user) {
          // adicionar o usuário ao Firestore
          const userData = {
            fullname: this.regForm.value.fullname,
            email: this.regForm.value.email,
            // adicionar outros dados do usuário se desejar
          };

          await this.firestoreService.addDocument('users', userData);

          loading.dismiss();
          this.router.navigate(['/home']);
        } else {
          console.log('Provide correct values');
          loading.dismiss();
        }
      } catch (error) {
        console.log(error);
        loading.dismiss();
      }
    }
  }
}