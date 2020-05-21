import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerifyComponent } from '../../modals/verify/verify.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  connected = false;

  constructor(
    private dialog: MatDialog
  ) {

  }

  openDialog() {
    const dialogConfig: MatDialogConfig = {
      width: '30vw',
      height: '30vh',
      data: 'login'
    };
    const dialogRef = this.dialog.open(VerifyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.connected = true;
        localStorage.setItem('code', JSON.stringify(value));
      }
    });
  }

  logout() {
    const dialogConfig: MatDialogConfig = {
      width: '30vw',
      height: '30vh',
      data: 'logout'
    };
    const dialogRef = this.dialog.open(VerifyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.connected = false;
      }
    });
  }
}
