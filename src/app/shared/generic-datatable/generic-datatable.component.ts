import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { API } from '../../util/api';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { CheckChangeEvent, DTColReorder, DTColumn, DTCSVConfig, DTFilters } from './interface';
import { DataTableDirective } from 'angular-datatables';
import { DataTableRender } from '../../util/datatable.render';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-generic-datatable',
  templateUrl: './generic-datatable.component.html',
  styleUrls: ['./generic-datatable.component.scss'],
})
export class GenericDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings | any = {};

  @Input()
  /** Filtros que se colocan en la cabecera. Si no se define un filtro se colocará un campo de texto */
  filters: DTFilters = {};

  @Input()
  /** Ocultar los filtros */
  hideFilters = false;

  @Input()
  /** Columnas de la tabla */
  columns: DTColumn[] = [];

  @Input()
  /** API desde la cual se consultan los elemento */
  service: API<any>;

  @Input()
  /** Método de la API que se usa para la consulta */
  serviceMethod = 'ajax';

  @Input()
  /** Colocar botón de descarga de CSV */
  csvButton = false;

  @Input()
  /** Mensaje que se muestra cuando no hay elementos en la tabla */
  msgEmpty = 'Sin resultados encontrados.';


  @Input()
  /** Tamaño de página */
  pageLength = 10;

  @Input()
  /** Propiedad de lenguaje de datatables */
  language: any = DataTableRender.lenguaje;

  @Input()
  /** Configuración de descarga de archivo CSV */
  csv_config: DTCSVConfig;

  @Input()
  /** Texto por defecto en columnas vacías */
  textDefault = 'N/A';

  @Input()
  /** Imagen por defecto si la columna imagen es nula */
  imgDefault = '/assets/image/material-default.jpg';

  @Input()
  /** Columna por la cual se ordena, por defecto la primera columna */
  orderColumn = 0;
  @Input()
  /** Columna por la cual se ordena, por defecto la primera columna */
  orderArray;

  @Input()
  /** Dirección en la que se ordena la tabla, por defecto ascendente */
  orderDir = 'asc';

  @Input()
  /** Parametros ajax de la tabla */
  params: any = {};

  @Input()
  /** Diccionario de plantillas personalizadas para las columnas */
  templates: any = {};

  @Input()
  /** Atributo del objeto del que se extrae la propiedad 'value' para filtros en select */
  defaultOptionValueAttribute = 'valor';

  @Input()
  /** Atributo del objeto del que se extrae lo que se mostrará en el option para filtros en select */
  defaultOptionDisplayAttribute = 'nombre';


  @Input()
  /** Agregar columna de checkbox en la tabla */
  checkBoxColumn = false;

  @Input()
  /** Atributo unico que se utiliza para distinguir items */
  checkColumnAttribute = 'id';

  @Input()
  /** Habilita la responsividad */
  responsive = true;

  @Input()
  /** Reorganizar las columnas */
  colReorder: DTColReorder | boolean;

  @Input()
  /** Mostrar boton para refrescamiento manual */
  btnRefresh = false;

  @Input()
  /** Class para la filas */
  classRow: (item: any) => string;

  @Input()
  /** Class para la filas */
  showCheck: (item: any) => boolean;

  /** Atributo que se usa por defecto como parámetro del routerLink */
  defaultRouterLinkAttribute = 'id';

  /** Formato de fecha por defecto para las columnas de fecha */
  defaultDateFormat = 'dd/MM/yyyy HH:mm';

  /** Elementos de la tabla */
  items: any[] = [];

  /** Auxiliar para saber en que indice inicia conteo */
  private colStartIndex = 0;

  @Output()
  checkedItemsChange = new EventEmitter<any>();

  @Input()
  tfoot: TemplateRef<any>;
  /** Valores seleccionados */
  checkedItemsValue: any[] = [];

  /** Auxiliar para conocer valores de los checkboxes */
  checkBoxValue: {} = {};

  /** Auxiliar para conocer valor del checkBox all */
  checkAllValue: boolean;

  /** Auxiliar para conocer si ya se aplicó default en filtro */
  private defaultApplied = {};

  @Output()
  /** Evento que se ejecuta antes de la peticion ajax */
  beforeAjax = new EventEmitter();


  @Output()
  /** Evento que se ejecuta en la respuesta de la peticion ajax y envia el response */
  afterAjax = new EventEmitter();

  @Output()
  dataItemsChange = new EventEmitter<any>();


  @Input()
  get checkedItems() {
    return this.checkedItemsValue;
  }

  set checkedItems(val) {
    this.checkedItemsValue = val;
    if (val.length === 0) {
      this.checkBoxValue = {};
      this.checkAllValue = null;
    }
    this.checkedItemsChange.emit(val);

  }
  _id = `${Math.random()}`.replace('.', '');
  constructor(
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    const that = this;

    if (this.checkBoxColumn) {
      const cols: DTColumn[] = [{
        attribute: 'cbColumn',
        header: ' ',
        disableFilter: true,
        sortable: false,
      }];
      cols.push(...this.columns);
      this.columns = cols;
      this.colStartIndex = 1;
    }

    // if (this.responsive) {
    //   const cols: DTColumn[] = [{
    //     attribute: null,
    //     default: ' ',
    //     className: 'control',
    //     disableFilter: true,
    //     sortable: false,
    //   }];
    //   cols.push(...this.columns);
    //   this.columns = cols;
    //   this.colStartIndex = 1;
    // }

    if (!this.orderArray) {
      this.orderArray = [[this.orderColumn + this.colStartIndex, this.orderDir]];
    } else {
      this.orderArray.forEach(element => {
        element[0] += this.colStartIndex;
      });
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageLength,
      language: this.language,
      processing: true,
      serverSide: true,
      orderCellsTop: true,
      order: this.orderArray,
      ajax: (dataTablesParameters: any, callback) => {
        // Copiar parámetros
        Object.assign(dataTablesParameters, this.params);

        // Valores por defecto de filtros
        for (const idx in this.filters) {
          if (this.filters[idx].default && !this.defaultApplied[idx]) {
            this.defaultApplied[idx] = true;
            this.datatableElement.dtInstance.then((dt) => dt.columns(idx).search(this.filters[idx].default));
            dataTablesParameters.columns[idx].search.value = this.filters[idx].default;
          }
        }

        this.beforeAjax.emit({ params: dataTablesParameters });
        // Llamada al servicio
        that.service[this.serviceMethod](dataTablesParameters)
          .subscribe((resp: any) => {
            that.items = resp.data;
            this.afterAjax.emit({ response: resp, params: dataTablesParameters });
            this.updateCheckboxAll();
            callback({
              recordsTotal: resp.recordsFiltered,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columnDefs: [
        { // Columnas no ordenables
          targets: this.columns.map((value, idx) => {
            if (value.sortable === false) {
              return idx;
            }
          }).filter((x) => !isNaN(x)),
          orderable: false
        }
      ],
      columns: this.columns.map((column) => {
        return {
          data: column.dataAttribute || column.attribute, // Permitir otro atributo para la consulta al back
          width: column.width,
          className: column.className,
        };
      }
      ),

      // responsive:  this.responsive,
      // colReorder: this.colReorder
    };



    if (this.csvButton) {
      // Agregar botones al DOM
      // Bfrtipl
      this.dtOptions.dom = `
      <'row'<'col-sm-12 mb-3'<'float-right'B>><'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>
      <'row table-responsive'tr>
      <'row'<'col-sm-12 col-md-6 text-wrap'i><'col-sm-12 col-md-6'p>>
      `;
      this.dtOptions.buttons = this.botonExcel();
    }
  }

  /** obtiene el valor de objeto.atributo con soporte para atributos anidados */
  getRealValue(obj: any, attribute: string, useShortUUID = false) {
    try {
      let value = _.get(obj, attribute);

      if (useShortUUID) {
        value = value.slice(0, value.indexOf('-'));
      }
      return value;
    } catch (e) {
      return null;
    }

  }

  ngAfterViewInit(): void {
    // Aplicar eventos en los campos de filtrado
    this.datatableElement.dtInstance.then( DataTableRender.datatableFilters(this._id));
  }


  /** Generación de botón de excel */
  botonExcel() {
    return DataTableRender.botonExcel(this.service, this.toastrService, this.csv_config);
  }

  /** Funcion para las columnas bool */
  siNo(data: number | boolean) {
    return data === 1 || data === true ? 'SI' : 'NO';
  }

  /** Workaround para disparar evento en componentes de fechas */
  dateChange($event: Date, input: HTMLInputElement) {
    setTimeout(() => {
      $(input).trigger('change');
    });
  }

  refresh() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api | any) => {
      dtInstance.draw();
    });

  }



  checkAll($event) {
    const value = $event.currentTarget.checked;
    for (const item of this.items) {
      const flat = this.showCheck ? this.showCheck(item) : true;
      this.checkBoxValue[this.getRealValue(item, this.checkColumnAttribute)] = flat ? value : false;
    }
    // Filtro para omitir los check que no se deben de ver definidos por showCheck
    this.updateCheckedItems({
      value,
      items: this.showCheck ? this.items.filter(
        (val: any) => this.checkBoxValue[this.getRealValue(val, this.checkColumnAttribute)]) : this.items
    });
  }

  updateCheckedItems($event: CheckChangeEvent) {
    for (const item of $event.items) {
      const itemValue = this.getRealValue(item, this.checkColumnAttribute);
      if ($event.value) {
        if (!this.checkedItemsValue.filter((listItem) => this.getRealValue(listItem, this.checkColumnAttribute) === itemValue).length) {
          this.checkedItemsValue.push(item);
        }
      } else {
        _.remove(this.checkedItemsValue, (listItem) => {
          return this.getRealValue(listItem, this.checkColumnAttribute) === itemValue;
        });
      }
    }
    this.updateCheckboxAll();
    this.checkedItemsChange.emit($event.items.length > 0 ? this.checkedItemsValue : []);
  }

  cbColumnChange($event: any, i: number) {
    const value = $event.currentTarget.checked;
    // Cambiar el valor de 1
    this.updateCheckedItems({
      value,
      items: [this.items[i]]
    });
  }

  validColumns(columns: DTColumn[]) {
    return columns.filter((c) => c.attribute !== 'cbColumn');
  }

  private updateCheckboxAll() {
    for (const item of this.items) {
      if (!this.checkBoxValue[this.getRealValue(item, this.checkColumnAttribute)]) {
        this.checkAllValue = false;
        return;
      }
    }
    this.checkAllValue = true;
  }

}
