import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item-sidebar.interface';

const MENUITEMSOLDS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

const NEWITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'role', type: 'link', name: 'Roll', icon: 'person' },
  { state: 'user', type: 'link', name: 'Usuario', icon: 'accessibility_new' },
  { state: 'autos', type: 'link', name: 'Autos', icon: '' },
  { state: 'person', type: 'link', name: 'Personas', icon: 'person' },
  { state: 'ingreso-temporal', type: 'link', name: 'Ingreso Temporal', icon: '' },
  { state: 'locations', type: 'link', name: 'Ubicaiones', icon: '' },
  { state: 'access-points', type: 'link', name: 'Puntos de Acceso', icon: '' },
  { state: 'shared1', type: 'link', name: 'Shared 1', icon: 'bug_report' },
  { state: 'shsred2', type: 'link', name: 'Shared 2', icon: 'bug_report' },
  { state: 'onlyuser', type: 'link', name: 'Usuario comun', icon: 'visibility' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Item[] {
    return NEWITEMS;
  }
}
