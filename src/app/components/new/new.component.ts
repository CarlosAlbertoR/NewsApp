import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() i: number;

  constructor(public actionSheetController: ActionSheetController, private iab: InAppBrowser) { }
  ngOnInit() { }

  openNew() {
    const browser = this.iab.create(this.new.url, '_system');
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Read more',
        icon: 'book',
        handler: () => {
          this.openNew();
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.share();
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          this.favorite();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  share() {
    console.log('Share clicked');
  }

  favorite() {
    console.log('Favorite clicked');
  }

}
