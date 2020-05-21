import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { PermissionsService } from '../../../service/permissions.service';
import { Item } from '../../../interfaces/item-sidebar.interface';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  listMenu: Item[];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private permissionsService: PermissionsService
  ) {
    console.log('Sidebar');
    this.permissionsService.sidebarPermissionChange.subscribe((list: Item[]) => {
      this.listMenu = [...list];
    });
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.permissionsService.getPermissions();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
