import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralForm } from '../../../interfaces/general.interface';
import { FormGeneralService } from '../../../service/form-general.service';
import { AuthenticateService } from '../../../service/authenticate.service';
import { PermissionsService } from '../../../service/permissions.service';
import { Router } from '@angular/router';

const PERMISOSDEHEMNY = ['All'];
const PERMISOSDEOTROUSUARIO = ['Usuario comun'];

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verificationCode = { cod: ''};
  dataToForm: GeneralForm = {
    data: {},
    fields: ['code'],
    descriptions: ['Código'],
    types: ['password'],
    requires: [true]
  };
  error = false;

  constructor(
    private dialogRef: MatDialogRef<VerifyComponent>,
    private formGeneralService: FormGeneralService,
    private authenticateService: AuthenticateService,
    private permissionsService: PermissionsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC, true);
    if (!valid) {
      return;
    }
    console.log('Qlqlqlqlqlq');
    if (this.data === 'login') {
      this.authenticateService.verifyCode(this.verificationCode).subscribe(async (message: object) => {
        console.log('Se hizo el submit, redirección...', message);
        if (!message['error']) {
          await localStorage.setItem('permissions', JSON.stringify(message['data']['permisos']));
          await localStorage.setItem('code', JSON.stringify(message['data']['codigo_acceso']));
          this.onNoClick(this.verificationCode.cod);
          await this.permissionsService.setPermission();
        }
      });
    } else {
      const code = JSON.parse(await localStorage.getItem('code'));
      console.log('Codigo de Verificacion que está en el LocalStorage: ', code, this.verificationCode);
      if (code === this.verificationCode.cod) {
        this.error = false;
        this.router.navigateByUrl('/home');
        await localStorage.removeItem('permissions');
        await localStorage.removeItem('code');
        await this.permissionsService.setPermission();
        this.onNoClick(true);
      } else {
        this.error = true;
      }
    }
  }

  onNoClick(value: string | boolean) {
    this.dialogRef.close(value);
  }

  respData(data: object) {
    this.verificationCode.cod = data['data']['code'];
  }

}
