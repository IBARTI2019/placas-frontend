export interface DTColumn {
  /** Ancho de la columna */
  width?: number | string;

  /** Atributo que se consultará al backend, por defecto attribute */
  dataAttribute?: string;

  /** Atributo que se mostrará en la columna */
  attribute?: string;

  /** Cabecera de la columna, por defecto title case de attribute */
  header?: string;

  /** La columna se puede ordenar. Por defecto true */
  sortable?: boolean;

  /** Ruta para el routerLink del enlace de la columna */
  routerLink?: string;

  /** Atributo que se pasa como parámetro al routerLink, por defecto id */
  routerLinkAttribute?: string;

  /** Tipo de columna. Por defecto text */
  type?: 'date' | 'img' | 'text' | 'bool' | 'json';

  /** Formato de fecha de la columna. Por defecto defaultDateFormat */
  dateFormat?: string;

  /** Deshabilitar filtros para la columna, por defecto false */
  disableFilter?: boolean;

  /** Valor por defecto de la columna, por defecto N/A para text y date, e 'imagen no disponible' para img */
  default?: string;

  /** Clave del diccionario de plantillas de donde se extrae el template para la columna */
  template?: string;

  /** Acortar uuid de la columna (sólo válido para columnas con UUID) */
  shortUUID?: boolean;

  /** Css que se aplica a td de la columna */
  className?: string;

  /** Llamar a esta función para mostrar el valor */
  render?: (item: any) => string;
}

export interface DTFilter {
  /** Tipo de input, por defecto html */
  type: 'select' | 'html' | 'range' | 'callable';

  /** Subtipo de input, válido cuando type es html o range */
  dataType?: 'date' | 'number' | 'text';

  /** Opciones en caso de que type sea select */
  options?: any[];

  /** Atributo con el valor que se muestra en el select */
  optionDisplayAttribute?: string;

  /** Atributo con valor que se selecciona en el select */
  optionValueAttribute?: string;

  /** Valor por defecto del filtro */
  default?: string | number;
}

// TODO: mejorar
export interface DTFilters {
  0?: DTFilter;
  1?: DTFilter;
  2?: DTFilter;
  3?: DTFilter;
  4?: DTFilter;
  5?: DTFilter;
  6?: DTFilter;
  7?: DTFilter;
  8?: DTFilter;
  9?: DTFilter;
  10?: DTFilter;
  11?: DTFilter;
  12?: DTFilter;
  13?: DTFilter;
  14?: DTFilter;
  15?: DTFilter;
  16?: DTFilter;
  17?: DTFilter;
  18?: DTFilter;
  19?: DTFilter;
  20?: DTFilter;
}

export interface DTCSVConfig {
  /** Prefijo en el nombre del archivo csv */
  nombre?: string;

  /** Almacen (cedis) del archivo CSV */
  almacen?: string;

  /** columna de item donde está almacen */
  almacenEnColumna?: string;

  /** Arreglo de almacenes */
  almacenes?: any[];

  /** Parámetros adicionales de la generación de csv */
  params?: any;

  /** En caso de éxito llamar a esta función */
  success?: (resp) => {};

  /** En caso de error llamar a esta función */
  error?: (resp) => {};
}

export interface CheckChangeEvent {
  /** Items que cambiaron su valor */
  items: any[];

  /** Nuevo valor del checkbox */
  value: boolean;
}

export interface DTColReorder {
  /** Orden de las columns */
  order: number[];
  /** Columnas fijas de la derecha  */
  fixedColumnsRight: number;
}
