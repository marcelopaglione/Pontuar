import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';

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

  constructor(private votarService: VotarService) { }

  ngOnInit() {

    this.interval = interval(1000).pipe(
      switchMap(() => this.votarService.findAll())).subscribe(json => {



        json = this.votarService.jsonToArray(json);
        console.log(json);

        if (JSON.stringify(json) !== JSON.stringify(this.cards)) {
          this.cards = json;
        }
        if (json && json.length === 0) {
          this.cards = null;
        }
      });
  }


  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  mostrarEsconder() {
    this.mostrar = !this.mostrar;
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
    this.mostrar = false;
  }

  pontuar(data: any) {
    console.log('Pontuar!');

    const found = this.cards.find(d => d.nome === data.nome);
    if (found) {
      found.ponto = data.ponto;
    } else {
      this.cards.push(data);
    }
  }

  remover(data: any) {
    console.log(data.nome);
    const position = this.cards.indexOf(data.nome);
    if (position > -1) {
      this.cards.splice(position, 1);
    } else {
      console.log(`Não achei ${data.nome} para remover`);
    }
  }

}
