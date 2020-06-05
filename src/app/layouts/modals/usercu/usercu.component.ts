import { Component, OnInit, Inject } from '@angular/core';
import { FormGeneralService } from '../../../service/form-general.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataRole } from '../../../interfaces/rolecu.interface';
import { GeneralForm } from '../../../interfaces/general.interface';
import { DataUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-usercu',
  templateUrl: './usercu.component.html',
  styleUrls: ['./usercu.component.css']
})
export class UsercuComponent implements OnInit {

  user: {};
  dataUser: GeneralForm = {
    data: {},
    fields: ['nombre', 'apellido', 'status'],
    descriptions: ['Nombre', 'Apellido', 'Estatus'],
    types: ['text', 'text', 'toggle'],
    requires: [true]
  };

  constructor(
    private formGeneralService: FormGeneralService,
    private matDialogRef: MatDialogRef<UsercuComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DataUser
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC, true);
    if (!valid) {
      return;
    }
  }

  activeForEventFromService(dataR: object) {
    Object.assign(this.user, dataR['data']);
  }

  onNoClick() {
    this.matDialogRef.close();
  }
}
