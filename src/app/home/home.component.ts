import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { VotarService } from '../votar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  cards = null;
  mostrar = false;

  constructor(private votarService: VotarService) { }

  ngOnInit() {

    interval(1000).pipe(
      switchMap(() => this.votarService.findAll()))
      .subscribe(data => {
        if (JSON.stringify(data) !== JSON.stringify(this.cards)) {
          this.cards = data;
        }
        if (data && data.length === 0) {
          this.cards = null;
        }
      });
  }

  mostrarEsconder() {
    this.mostrar = !this.mostrar;
  }

  zerar() {
    this.votarService.findAll().subscribe(list => {
      console.log('deleting', list);
      list.forEach(element => {
        this.votarService.deleteById(element.id).subscribe();
      });
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
