import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataRole } from '../../../interfaces/rolecu.interface';
import { GeneralForm } from '../../../interfaces/general.interface';
import { FormGeneralService } from '../../../service/form-general.service';

@Component({
  selector: 'app-rolecu',
  templateUrl: './rolecu.component.html',
  styleUrls: ['./rolecu.component.css']
})
export class RolecuComponent implements OnInit {
  private role = {};
  dataRole: GeneralForm = {
    data: {},
    fields: ['descripcion'],
    descriptions: ['Descripcion'],
    types: ['text'],
    requires: [true]
  };

  constructor(
    private formGeneralService: FormGeneralService,
    private matDialogRef: MatDialogRef<RolecuComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DataRole
  ) {
  }

  ngOnInit(): void {
    Object.assign(this.dataRole.data, this.data.data);
  }

  submit(): void {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC, true);
    if (!valid) {
      return;
    }
  }

  activeForEventFromService(dataR: object) {
    Object.assign(this.role, dataR['data']);
  }

  onNoClick() {
    this.matDialogRef.close();
  }

}
