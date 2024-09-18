import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...', // Mensagem exibida durante o carregamento
      spinner: 'crescent' // Tipo de spinner
    });
    await loading.present();

    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const res = await this.authService.loginUser(email, password);

        console.log(res); // Opcional: Apenas para depuração, pode ser removido em produção

        // Redireciona para a página inicial após o login bem-sucedido
        await this.router.navigate(['/home']); // Navega para a página home
      } catch (error) {
        console.error('Login failed:', error); // Loga o erro para depuração
        // Você pode adicionar uma mensagem de erro para o usuário aqui, se desejar
      } finally {
        loading.dismiss(); // Garante que o carregamento será fechado independentemente do resultado
      }
    } else {
      // Se o formulário não for válido, ainda assim fechar o carregamento
      loading.dismiss();
    }
  }
}
