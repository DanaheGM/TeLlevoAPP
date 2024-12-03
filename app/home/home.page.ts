import { Component, AfterContentInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../Service/autentificador.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterContentInit {
  /* Objeto JSON para usuario */
  user = {
    username: '',
    password: '',
  };
  
  /* Mensaje de respuesta */
  mensaje = '';
  
  /* Estado de carga */
  spinner = false;
  
  rememberMe = false; /* Estado del toggle "Recuerdame" */

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private auth: AuthenticatorService
  ) {}

  ngAfterContentInit() {
    this.animarLoginGiroYColor();
  }

  animarLoginGiroYColor() {
    /* Seleccionamos el item desde el Front con un query selector y reconocemos el elemento como HTMLElement para que sea compatible con la animacion */
    const loginIcon = document.querySelector(".login img") as HTMLElement;

    /* Creamos y configuramos la animación */
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000) // Duración de la animación en milisegundos
      .iterations(Infinity) // La animación se repetirá infinitamente
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)', boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)', backgroundColor: 'red' },
        { offset: 0.5, transform: 'rotate(180deg)', boxShadow: '0px 0px 20px rgba(0, 0, 255, 0.5)', backgroundColor: 'blue' },
        { offset: 1, transform: 'rotate(360deg)', boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)', backgroundColor: 'red' }
      ]);

    animacion.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  validar() {
    if (this.auth.login(this.user.username, this.user.password)) {
      this.mensaje = 'Conexión exitosa';
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };
      this.cambiarSpinner();

      /* setTimeout = permite generar un pequeño delay para realizar la acción */
      setTimeout(() => {
        this.router.navigate(['/perfil'], navigationExtras);
        this.cambiarSpinner();
        this.mensaje = '';
      }, 3000);
    } else {
      this.mensaje = 'Error en las credenciales';
    }
  }

  forgotPassword() {
    // Implementa la lógica para recuperar la contraseña
    console.log('Recuperar contraseña');
  }
}

