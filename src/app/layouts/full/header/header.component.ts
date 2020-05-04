import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerifyComponent } from '../../modals/verify/verify.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(
    private dialog: MatDialog
  ) {

  }

  openDialog() {
    const dialogConfig: MatDialogConfig = {
      width: '30vw',
      height: '30vh'
    };
    const dialogRef = this.dialog.open(VerifyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
      console.log('Se cerró el modal');
    });
  }
}
