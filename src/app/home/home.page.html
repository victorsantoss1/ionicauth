import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  
  constructor(
    private loadingCtrl: LoadingController, //cria carregamentos spiners que indicam ao usuário que uma operação está em andamento
    private authService: AutheticationService, // metodo de autentificaçao de usuario (login,logout,registro)
    private firestoreService: FirestoreService, //é usado para interagir com o Firestore
    private router: Router, //responsável pela navegação entre diferentes componentes ou páginas da aplicação
    private alertCtrl: AlertController // Esse serviço é usado para criar e gerenciar alertas (pop-ups) que informam os usuários sobre eventos ou erros.
  ) {}

  async loginWithGoogle() {
    const loading = await this.createLoading('Fazendo login...');
    try {
      await this.authService.loginWithGoogle();
      await this.router.navigate(['/home']); // Redirecione para a página inicial após o login
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      await this.showAlert('Erro', 'Não foi possível fazer login com Google. Tente novamente.');
    } finally {
      await loading.dismiss();
      
    }
  }

  async logout() {
    await this.router.navigate(['landing']);
  }

  async deleteUser() {
    const loading = await this.createLoading('Excluindo conta...');
    
    try {
      const user = await this.authService.getCurrentUser();
      this.validateUser(user);

      await this.firestoreService.deleteDocument('users', user.uid);
      await this.authService.deleteUser();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      await this.showAlert('Erro', 'Não foi possível excluir a conta. Tente novamente.');
    } finally {
      await loading.dismiss();
    }
  }
  async editUserName() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Nome',
      inputs: [{ name: 'newName', type: 'text', placeholder: 'Novo nome' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Salvar', 
          handler: async (data) => {
            const loading = await this.createLoading('Atualizando nome...');
            try {
              const newName = data.newName?.trim(); // Remove espaços em branco
  
              if (!newName || typeof newName !== 'string') {
                throw new Error('Nome inválido');
              }
  
              await this.authService.updateUserName(newName);
              await this.showAlert('Sucesso', 'Nome atualizado com sucesso!');
            } catch (error) {
              console.error('Erro ao atualizar o nome:', error);
              await this.showAlert('Erro', 'Não foi possível atualizar o nome. Tente novamente.');
            } finally {
              await loading.dismiss();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  



  private async updateUserName(newName: string) {
    const loading = await this.createLoading('Atualizando nome...');

    try {
      const user = await this.authService.getCurrentUser();
      this.validateUser(user);

      await this.firestoreService.updateDocument('users', user.uid, { fullname: newName });
      await this.authService.updateUserName(newName);
    } catch (error) {
      console.error('Erro ao atualizar o nome do usuário:', error);
      await this.showAlert('Erro', 'Não foi possível atualizar o nome. Tente novamente.');
    } finally {
      await loading.dismiss();
    }
  }

  private async createLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

  private validateUser(user: any) {
    if (!user) {
      throw new Error('Usuário não está logado');
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
