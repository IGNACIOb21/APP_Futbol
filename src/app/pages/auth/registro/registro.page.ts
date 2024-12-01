import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellidoPaterno: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellidoMaterno: new FormControl('', [Validators.required, Validators.minLength(4)]),
    tipoUsuario: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.validateUserType(),
    ]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  // Método personalizado para validar tipoUsuario
  validateUserType() {
    const allowedUserTypes = ['admin', 'jugador', 'arbitro']; // Lista de tipos permitidos
    return (control: FormControl) => {
      return allowedUserTypes.includes(control.value)
        ? null
        : { invalidUserType: 'Tipo de usuario no válido' };
    };
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      try {
        // Crear el usuario en Firebase Authentication
        const res = await this.firebaseSvc.regidtroIn(this.form.value as User);

        // Obtener uid y establecer en el formulario
        const uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        // Eliminar contraseña antes de enviar a Firestore
        delete this.form.value.password;

        // Guardar información en Firestore
        await this.setUserInfo(uid);

        // Redirigir al usuario según el tipo de usuario
      const tipoUsuario = this.form.value.tipoUsuario;
      this.redirectBasedOnUserType(tipoUsuario);

        // Redirigir al usuario y guardar en LocalStorage
        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();
      } catch (error) {
        console.error(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      } finally {
        loading.dismiss();
      }
    } else {
      this.utilsSvc.presentToast({
        message: 'Formulario inválido. Revisa los campos.',
        duration: 2500,
        color: 'warning',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }
  }

  private async setUserInfo(uid: string) {
    const path = `users/${uid}`;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      await this.firebaseSvc.setDocument(path, this.form.value);
    } catch (error) {
      console.error(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    } finally {
      loading.dismiss();
    }
  }




  private redirectBasedOnUserType(tipoUsuario: string) {
    switch (tipoUsuario) {
      case 'arbitro':
        this.utilsSvc.routerLink('./main/arbitro'); // Página del árbitro
        break;
      case 'jugador':
        this.utilsSvc.routerLink('/pages/jugador'); // Página del jugador
        break;
      case 'admin':
        this.utilsSvc.routerLink('/main/admin'); // Página del administrador
        break;
      default:
        this.utilsSvc.routerLink('/main/home'); // Página predeterminada
        break;
    }
  }
}
