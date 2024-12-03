import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/Service/autentificador.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username = '';

  constructor(private router: Router, private auth: AuthenticatorService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
      password: string;
    };

    this.username = state?.username || ''; // Maneja el caso si state es undefined
  }

  ngOnInit() { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  buscarViaje() {
    // Navega a la página de búsqueda de viajes
    this.router.navigate(['/buscar-viaje']);
  }

  crearViaje() {
    // Navega a la página de creación de viajes
    this.router.navigate(['/crear-viaje']);
  }
}
