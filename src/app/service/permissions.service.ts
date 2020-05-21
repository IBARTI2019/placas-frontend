import { Injectable, Output, EventEmitter } from '@angular/core';
import { MenuItems } from '../shared/menu-items/menu-items';
import { Item } from '../interfaces/item-sidebar.interface';

const DEFAULT_MODULES = [
  'Shared 1',
  'Shared 2',
  'Dashboard'
];

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  @Output() sidebarPermissionChange: EventEmitter<Item[]> = new EventEmitter();
  modulesAllowed: Item[];

  constructor(
    private menuSidebar: MenuItems
  ) {
    this.setPermission();
  }

  async setPermission() {
    const otherPermission = JSON.parse(await localStorage.getItem('permissions'));
    if (otherPermission && otherPermission.length > 0) {
      if (otherPermission[0] === 'All') {
        this.modulesAllowed = this.menuSidebar.getMenuitem();
      } else {
        this.modulesAllowed = this.menuSidebar.getMenuitem()
          .filter((currentItem) => (DEFAULT_MODULES.concat(otherPermission).includes(currentItem.name)));
      }
    } else {
      this.modulesAllowed = this.menuSidebar.getMenuitem().filter((currentItem) => (DEFAULT_MODULES.includes(currentItem.name)));
    }
    this.getPermissions();
    console.log(this.modulesAllowed, otherPermission);
  }

  getPermissions() {
    this.sidebarPermissionChange.emit(this.modulesAllowed);
  }
}
