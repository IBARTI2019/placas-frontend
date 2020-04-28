import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralForm } from '../../interfaces/general.interface';
import { FormGeneralService } from '../../service/form-general.service';


@Component({
  selector: 'app-form-general',
  templateUrl: './form-general.component.html',
  styleUrls: ['./form-general.component.css']
})
export class FormGeneralComponent implements OnInit {
  @Input() dataNe: GeneralForm;
  @Output() onResp = new EventEmitter<{ data: object, invalid: boolean, err: string }>();
  formG: FormGroup;
  posService: number;

  send = false;
  constructor(
    private fb: FormBuilder,
    private formGeneralService: FormGeneralService
  ) { }

  ngOnInit(): void {
    console.log('Noooooooooooo');
    const params = {};
    this.dataNe.fields.forEach((field: string, i: number) => {
      const proper = {};
      const arrV = [];
      if (this.dataNe.requires[i]) {
        arrV.push(Validators.required);
      }
      let val: any;
      switch (this.dataNe.types[i]) {
        case 'boolean':
          val = (this.dataNe.data[field]) ? this.dataNe.data[field] : false;
          break;
        case 'email':
          val = (this.dataNe.data[field]) ? this.dataNe.data[field] : '';
          arrV.push(Validators.email);
          break;
        default:
          val = (this.dataNe.data[field]) ? this.dataNe.data[field] : '';
          break;
      }
      proper[field] = [val, arrV];
      Object.assign(params, proper);
    });
    this.formG = this.fb.group(params);

    this.posService = this.formGeneralService.onLine();
    this.formGeneralService.change.subscribe((value: []) => {
      console.log(value[this.posService]);
        if (value[this.posService]) {
          console.log("hola");
          this.verifValid();
        }
    });
  }

  verifValid() {
    if(this.formG.invalid){
      this.formGeneralService.setErrorChild(this.posService);
    }else{
      console.log('Enviado Componente ' + this.posService);
      this.onResp.emit({data:this.formG.value,invalid:false,err:''});
    }
  }

}
