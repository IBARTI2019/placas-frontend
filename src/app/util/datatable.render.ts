import { HttpParams } from '@angular/common/http';
import { API } from '../util/api';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DTCSVConfig } from '../shared/generic-datatable/interface';
import ChangeEvent = JQuery.ChangeEvent;
import KeyPressEvent = JQuery.KeyPressEvent;


/**
 *  Clase para la configuracion de los  DataTables y
 *  renderizacion de los resultados
 * @export
 * DataTableRender
 */
export class DataTableRender {
  constructor() {
  }

  static lenguaje = {
    emptyTable: 'No hay información',
    info:
      'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    infoEmpty: 'Mostrando 0 a 0 de 0 registros',
    infoFiltered: '(Filtrado de _MAX_ total registros)',
    infoPostFix: '',
    thousands: ',',
    lengthMenu: 'Mostrar _MENU_ registros',
    loadingRecords: 'Cargando...',
    processing: 'Procesando...',
    search: 'Buscar:',
    zeroRecords: 'Sin resultados encontrados',
    paginate: {
      first: '<<',
      last: '>>',
      next: '>',
      previous: '<'
    }
  };

  /**
   * Funcion estatica para adaptar los HttpParams de la consulta al
   *  formato adecuado para los dataTablesParameters
   *
   * {Object} source
   * {HttpParams}
   * DataTableRender
   */
  static buildQueryParams(source: object): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      const value: any = source[key];
      if (typeof value !== 'undefined' && value !== null) {
        if (typeof value === 'object') {
          if (key === 'search') {
            Object.keys(value).forEach((currentKey, index: number) => {
              target = target.append(
                `${key}[${currentKey}]`,
                value[currentKey]
              );
            });
          } else {
            value.forEach((element, index: number) => {
              if (element.hasOwnProperty('data') && !element.data) {
                return;
              }

              if (typeof (element) === 'number' || typeof (element) === 'string') {
                target = target.append(
                  `${key}`,
                  `${element}`
                );
              } else {
                Object.keys(element).forEach(currentKey => {
                  if (currentKey === 'search') {
                    Object.keys(element[currentKey]).forEach(currentSearchKey => {
                      target = target.append(
                        `${key}[${index}][${currentKey}][${currentSearchKey}]`,
                        element[currentKey][currentSearchKey]
                      );
                    });
                  } else {
                    target = target.append(
                      `${key}[${index}][${currentKey}]`,
                      element[currentKey]
                    );
                  }
                });
              }



            });
          }
        } else {
          target = target.append(key, value.toString());
        }
      }
    });

    return target;
  }
  static datatableFilters(_id?: any): any {
    // tslint:disable-next-line: only-arrow-functions
    return function(dtInstance: DataTables.Api)  {
      $(`${_id ? '#' + _id : ''} tr:eq(1) th`).each((i, element) => {
        const column = dtInstance.column(i);
        $('input,select', element).on('keypress blur change', (e: ChangeEvent | KeyPressEvent) => {
          const fireEvent = e.type !== 'keypress' || e.key.codePointAt(0) === 13;
          const control = e.target as HTMLInputElement | any;
          // tslint:disable-next-line: align
          if (control.name === 'cbColumn') {
            e.stopPropagation();
            return; // No disparar para checkbox
          }
          if (
            control.name.endsWith('_range-min') ||
            control.name.endsWith('_range-max')
          ) {
            const min = $(
              '[name=' + control.name.replace('_range-max', '_range-min') + ']',
              element
            ).val();
            const max = $(
              '[name=' + control.name.replace('_range-min', '_range-max') + ']',
              element
            ).val();
            const search_range = `${min}~${max}`;
            // No buscar vacíos
            if (!column.search() && search_range === '~') {
              return;
            }
            if (column.search() !== search_range && fireEvent) {
              column.search(search_range).draw();
            }
          } else if (column.search() !== control.value && fireEvent) {
            column.search(control.value).draw();
          }
        });
      });
    };
  }


  static botonExcel(service: API<any>, toastrService: ToastrService, csv_config: DTCSVConfig = {}) {
    return {
      dom: {
        button: {
          className: ''
        }
      },
      buttons: [
        {
          text: '<i class="icon-excel-attachment"></i> Descargar CSV',
          key: '1',
          className: 'btn btn-sm btn-excel',
          action: (e, dt, node, config) => {
            const params = dt.ajax.params();
            const csv_nombre = [csv_config.nombre];

            if (csv_config.almacenEnColumna) {
              let _almacen = null;
              try {
                _almacen = csv_config.almacenes.find((t) => {
                  const tv = params.columns.find((col) => {
                    return col.data === 'almacen';
                  }).search.value;
                  return t.id === tv || t.descripcion === tv || t.codigo === tv;
                }).descripcion;
              } catch (e) {
                _almacen = null;
              }
              csv_nombre.push(_almacen || 'TODOS');
            } else if (csv_config.almacen) {
              csv_nombre.push(csv_config.almacen);
            }

            csv_nombre.push(moment().format('DD-MM-YYYY'));

            if ($(node).attr('disabled')) {
              return;
            }
            $(node).attr('disabled', 'disabled');

            params.download = true;
            if (csv_config.params) {
              for (const key in csv_config.params) {
                if (csv_config.params.hasOwnProperty(key)) {
                  params[key] = csv_config.params[key];
                }
              }
            }

            params.csv_nombre = csv_nombre.join('_');

            service.ajax(params).subscribe((resp) => {
              toastrService.success(`${params.csv_nombre} se está procesando. En un momento estará disponible en el centro de descargas.`);
              if (csv_config.success) {
                csv_config.success(resp);
              }
            }, (resp) => {
              toastrService.error('No se pudo descargar el archivo');
              if (csv_config.error) {
                csv_config.error(resp);
              }
            }).add(
              () => {
                $(node).removeAttr('disabled');
              });
          }
        }
      ]
    };
  }

  conLink(data: string, direccion: any, data_url?: string | number) {
    if (data_url) {
      return `<a href="${direccion}${data_url}">${data}</a>`;
    } else {
      return `<a href="${direccion}${data}">${data}</a>`;
    }
  }

  collapse(data: any, index: any) {
    if (data.length < 1) {
      return '';
    }

    let output = '';

    for (let i = 1; i < data.length; i++) {
      output += `${data[i].descripcion}<br>`;
    }

    const arrow = `<a class="collapse-arrow collapsed" data-toggle="collapse" data-target="#collapse${index}" >
                  <i class="icon-navigation-up-arrow"></i>
                </a> `;

    return `<div>${data[0].descripcion}${data.length > 1 ? arrow : ''}</div>
              <div id="collapse${index}" class="collapse-arrow collapse">
              ${output}
            </div>`;
  }

  isActivo(data: number) {
    return data === 1 ? 'Activo' : 'Desactivado';
  }

  ubicEstado(data: number) {
    switch (data) {
      case 1:
        return 'Activa';
      case 100:
        return 'Creado';
      case 101:
        return 'Impreso';
      case 102:
        return 'Almacen Intermedio';
      case 104:
        return 'Montado Camion';
      case 105:
        return 'Transito';
      case 106:
        return 'Camion Tienda';
      case 107:
        return 'Despacho';
      case 108:
        return 'Contabilizado en Tienda';
      case 109:
        return 'Anulado';
      default:
        return 'Desactivado';
    }
  }

  isNull(data: string) {
    return data === null || data === undefined ? '' : data;
  }

  siNo(data: number | boolean) {
    return data === 1 || data === true ? 'SI' : 'NO';
  }

  descripcionDesdeURL(url: string) {
    // tslint:disable-next-line: variable-name
    let _url: any = url;
    let descripcion = '';
    _url = _url.replace('#!/', '').split('/');

    for (let i = 0; i < _url.length; i++) {
      descripcion += _url[i] + (_url.length - 1 > i ? ' > ' : '');
    }

    descripcion = descripcion.replace('_', ' ').replace('-', ' ');

    return descripcion;
  }

}
