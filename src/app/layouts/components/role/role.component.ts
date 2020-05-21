import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RolecuComponent } from '../../modals/rolecu/rolecu.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openRoleCU(data: object = {}) {
    const dialogConfig: MatDialogConfig = {
      width: '50vw',
      height: '60vh',
      data
    };

    const dialogRef = this.dialog.open(RolecuComponent, dialogConfig);
  }

}
