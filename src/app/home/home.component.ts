import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNumber } from 'util';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { CookiesService } from '../cookies.service';
import { VotarService } from '../votar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {

  cards = null;
  mostrar = false;
  interval: any;
  totalMostrarAuto = 8;
  isUnanime = false;

  constructor(private votarService: VotarService, private cookieService: CookiesService) { }

  ngOnInit() {

    const total = parseInt(this.cookieService.getCookie('totalmostrar'), 0);
    if (total) {
      this.totalMostrarAuto = total;
    }


    this.interval = this.getFireBaseData();
  }

  setCookies() {
    this.cookieService.setCookie('totalmostrar', this.totalMostrarAuto + '', 30);
  }

  private getFireBaseData() {
    return interval(2000)
      .pipe(switchMap(() => this.votarService.findAll()))
      .subscribe(json => {
        this.showItens(json);

        setTimeout(() => {
          if (
            this.cards &&
            this.totalMostrarAuto &&
            isNumber(this.totalMostrarAuto) &&
            this.totalMostrarAuto <= this.cards.length) {
            this.mostrarCartas();
          }
        }, 100);

      });
  }

  private showItens(json: any) {
    json = this.votarService.jsonToArray(json);
    console.log(json);
    if (JSON.stringify(json) !== JSON.stringify(this.cards)) {
      this.cards = json;
    }
    if (json && json.length === 0) {
      this.cards = null;
    }
    this.calcIsUnanime();
  }

  private calcIsUnanime() {
    if (this.cards && this.cards.length > 0) {
      this.isUnanime = true;
      const voto1 = (this.cards as any)[ 0 ].ponto;
      this.cards.forEach(card => {
        if ((card as any).ponto !== voto1) {
          this.isUnanime = false;
        }
      });
    }
  }


  classFront() {
    if (this.mostrar) {
      return 'front';
    } else {
      return 'back';
    }
  }

  classBack() {
    if (this.mostrar) {
      return 'back';
    } else {
      return 'front';
    }
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  mostrarCartas() {
    this.mostrar = true;
    this.interval.unsubscribe();
  }


  esconderCartas() {
    this.mostrar = false;
    this.interval = this.getFireBaseData();
  }

  mostrarEsconder() {
    if (this.mostrar) {
      this.esconderCartas();
    } else {
      this.mostrarCartas();
    }
  }

  zerar() {
    this.votarService.findAll().subscribe(json => {
      console.log('deleting', json);
      for (const property in json) {
        if (json.hasOwnProperty(property)) {
          this.votarService.deleteById(property).subscribe();
        }
      }
    });
    this.cards = null;
    this.esconderCartas();
  }

  pontuar(data: any) {
    const found = this.cards.find(d => d.nome === data.nome);
    if (found) {
      found.ponto = data.ponto;
    } else {
      this.cards.push(data);
    }
  }

  remover(data: any) {
    const position = this.cards.indexOf(data.nome);
    if (position > -1) {
      this.cards.splice(position, 1);
    } else {
      console.log(`Não achei ${data.nome} para remover`);
    }
    this.esconderCartas();
  }

}
