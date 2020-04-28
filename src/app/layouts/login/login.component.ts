import { Component, OnInit } from '@angular/core';
import { GeneralForm } from '../../interfaces/general.interface';
import { FormGeneralService } from '../../service/form-general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataResps = {};
  dataN1: GeneralForm = {
    data: {},
    fields: ['arr1', 'arr2', 'arr3'],
    descriptions: ['arr1', 'arr2', 'arr3'],
    types: ['text', 'email', 'text'],
    requires: [true, true, true]
  };
  dataN2: GeneralForm = {
    data: {},
    fields: ['arr4', 'arr5', 'arr6'],
    descriptions: ['arr4', 'arr5', 'arr6'],
    types: ['text', 'email', 'text'],
    requires: [true, true, true]
  };

  constructor(private formGeneralService: FormGeneralService) { }

  ngOnInit(): void {
    console.log("Yo soy tu padre");
  }

  submit() {
    this.formGeneralService.activateChilds();
    const valid = this.formGeneralService.getChilds().reduce((val, valC) => val && valC , true);
    if(valid){
      console.log('Formulario lleno');
      console.log(this.dataResps);
    }
  }

  respData(dataR: {}) {
    Object.assign(this.dataResps, dataR['data']);
  }

}
