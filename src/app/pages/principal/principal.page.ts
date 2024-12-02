import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private router: Router) { }  // Inyectamos el Router

  ngOnInit() {
  }

  irJugadores(){
    this.router.navigate(['/auth']);
  }

  irArbitro (){
    this.router.navigate(['/arbitro']);

  }


}
