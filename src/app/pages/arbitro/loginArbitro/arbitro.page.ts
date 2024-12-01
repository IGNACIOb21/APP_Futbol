import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.page.html',
  styleUrls: ['./arbitro.page.scss'],
})
export class ArbitroPage implements OnInit {
  title: string = 'Login';  // Asegúrate de definir esta propiedad

  form =new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }


  async submit(){
    if (this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

      this.firebaseSvc.signIn(this.form.value as User).then( res => {
        
        this.getUserInfo(res.user.uid);

      }).catch(error =>{
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() =>{
        loading.dismiss();

      })
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      let path = `users/${uid}`;
  
      this.firebaseSvc.getDocument(path).then((user: User) => {
        if (user.tipoUsuario === 'arbitro') {
          // Guardar la información del usuario y redirigir
          this.utilsSvc.saveInLocalStorage('user', user);
          this.form.reset();
  
          this.utilsSvc.routerLink('tabs-arbitro'); // Ruta específica para árbitro
  
          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user.name} ${user.apellidoPaterno}`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline',
          });
        } else {
          // Mostrar mensaje de usuario no válido
          this.utilsSvc.presentToast({
            message: 'Usuario no encontrado o no autorizado.',
            duration: 2500,
            color: 'warning',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        }
      }).catch((error) => {
        console.log(error);
  
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
}
}
