import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform) {}

  ngOnInit() {}

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 5000);
  //   });
  // }
}
