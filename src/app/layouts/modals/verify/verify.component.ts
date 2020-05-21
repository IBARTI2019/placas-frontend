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
  verificationCode = '';
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

    if (this.data === 'login') {
      // this.authenticateService.verifyCode(this.verificationCode).subscribe((message: object) => {
      //   console.log('Se hizo el submit, redirección...', this.verificationCode);
      //   this.onNoClick(this.verificationCode);
      // });
      if (this.verificationCode === 'HSibrian') {
        await localStorage.setItem('permissions', JSON.stringify(PERMISOSDEHEMNY));
      } else {
        await localStorage.setItem('permissions', JSON.stringify(PERMISOSDEOTROUSUARIO));
      }
      this.onNoClick(this.verificationCode);
      this.permissionsService.setPermission();
    } else {
      const code = JSON.parse(await localStorage.getItem('code'));
      if (code === this.verificationCode) {
        this.error = false;
        this.router.navigateByUrl('/home');
        await localStorage.removeItem('permissions');
        this.permissionsService.setPermission();
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
    this.verificationCode = data['data']['code'];
  }

}
