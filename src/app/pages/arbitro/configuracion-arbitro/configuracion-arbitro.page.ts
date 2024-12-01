import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-configuracion-arbitro',
  templateUrl: './configuracion-arbitro.page.html',
  styleUrls: ['./configuracion-arbitro.page.scss'],
})
export class ConfiguracionArbitroPage implements OnInit {

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
  }
  //===== Cerrar Sesión ======
  signOut() {
    this.firebaseSvc.signOut();
  }

}
