import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralForm } from '../../../interfaces/general.interface';
import { FormGeneralService } from '../../../service/form-general.service';
import { AuthenticateService } from '../../../service/authenticate.service';

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
  }
  constructor(
    private dialogRef: MatDialogRef<VerifyComponent>,
    private formGeneralService: FormGeneralService,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC, true);
    if (!valid) {
      return;
    }
    this.authenticateService.verifyCode(this.verificationCode).subscribe((message: object) => {
      console.log('Se hizo el submit, redirección...', this.verificationCode);
      this.onNoClick();
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  respData(data: object) {
    this.verificationCode = data['data']['code'];
  }

}
