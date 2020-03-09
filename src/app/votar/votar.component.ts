import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CookiesService } from '../cookies.service';
import { VotarService } from '../votar.service';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: [ './votar.component.scss' ]
})
export class VotarComponent implements OnInit {

  pontos = [ '1', '2', '3', '5', '8', '13', '21', { icon: 'fa-coffee' }, { icon: 'fa-question-circle' } ];

  pontoRegistrado = false;
  pontuando = false;

  constructor(
    private votarService: VotarService,
    private builder: FormBuilder,
    private cookieService: CookiesService) { }

  form: FormGroup;

  ngOnInit() {
    console.log(this.cookieService.isConsented);
    this.form = this.builder.group({
      nome: [ '', Validators.required ],
      ponto: [ '', Validators.required ],
      id: [ '' ]
    });

    this.form.get('nome').valueChanges.subscribe(nome => {
      if (nome) {
        this.cookieService.setCookie('nickname', nome, 30);
      }
    });

    this.form.patchValue({ nome: this.cookieService.getCookie('nickname') });
  }

  votar(ponto: string) {
    this.form.get('ponto').setValue(ponto);
  }

  confirmar() {
    const nomeForm = this.form.get('nome').value;
    const pontoForm = this.form.get('ponto').value;

    this.votarService.findAll().subscribe((list: any[]) => {
      const filtered = this.votarService.jsonToArray(list).filter(element => element.nome === nomeForm);
      let httpObject;

      if (filtered && filtered.length === 1) {
        httpObject = this.put(filtered, pontoForm, httpObject);
      } else {
        httpObject = this.post(httpObject);
      }
    });


  }

  private post(httpObject: any) {
    httpObject = {
      nome: this.form.get('nome').value,
      ponto: this.form.get('ponto').value,
      id: this.form.get('id').value,
    };
    this.votarService.votarPost(httpObject).subscribe(() => this.limparForm());
    return httpObject;
  }

  private put(filtered: any[], pontoForm: any, httpObject: any) {
    this.votarService.votarPut(pontoForm, filtered[ 0 ].id).subscribe(() => this.limparForm());
    return httpObject;
  }

  private limparForm() {
    this.form.get('ponto').setValue('');
    this.pontoRegistrado = true;
  }
}
