import { Component, OnInit } from '@angular/core';
import { GeneralForm } from '../../interfaces/general.interface';
import { FormGeneralService } from '../../service/form-general.service';
import { AuthenticateModel } from '../../interfaces/login.interface';
import { AuthenticateService } from '../../service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataResps: AuthenticateModel = {
    cod: '',
    pass: ''
  };
  dataN1: GeneralForm = {
    data: {},
    fields: ['cod', 'pass'],
    descriptions: ['Email', 'Contraseña'],
    types: ['email', 'password'],
    requires: [true, true]
  };

  constructor(
    private formGeneralService: FormGeneralService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(): void {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC , true);
    if (!valid) {
      return;
    }
    this.authenticateService.authenticate(this.dataResps).subscribe(async (message: object) => {
      console.log('Se hizo el submit, redirección...', message);
      if (!message['error']) {
        await localStorage.setItem('DB_HEADER', JSON.stringify({ db: message['data']['db'] }));
        this.router.navigateByUrl('/home');
      }
    });
  }

  respData(dataR: object) {
    Object.assign(this.dataResps, dataR['data']);
    console.log('DataResp: ', this.dataResps);
    console.log('DataR: ', dataR['data']);
  }

}
