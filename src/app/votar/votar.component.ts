import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VotarService } from '../votar.service';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: [ './votar.component.scss' ]
})
export class VotarComponent implements OnInit {

  pontos = [ '1', '2', '3', '5', '8', '13', '21', 'café', '?' ];

  pontoRegistrado = false;

  constructor(private votarService: VotarService, private builder: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.builder.group({
      nome: [ '', Validators.required ],
      ponto: [ '', Validators.required ]
    });
  }

  votar(ponto: string) {
    this.form.get('ponto').setValue(ponto);
  }

  confirmar() {
    const nomeForm = this.form.get('nome').value;
    const pontoForm = this.form.get('ponto').value;

    this.votarService.findAll().subscribe((list: any[]) => {
      const filtered = list.filter(element => element.nome === nomeForm);
      let httpObject;

      if (filtered && filtered.length === 1) {
        filtered[0].ponto = pontoForm;
        httpObject = filtered[0];
      } else {
        httpObject = {
          nome: this.form.get('nome').value,
          ponto: this.form.get('ponto').value
        };
      }

      this.votarService.votar(httpObject).subscribe(() => {
        this.form.get('ponto').setValue('');
        this.pontoRegistrado = true;
      });

    });

  }
}
