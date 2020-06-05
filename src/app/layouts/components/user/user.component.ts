import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UsercuComponent } from '../../modals/usercu/usercu.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openUserCU(data: object = {}) {
    const dialogConfig: MatDialogConfig = {
      width: '50vw',
      height: '60vh',
      data
    };

    const dialogRef = this.dialog.open(UsercuComponent, dialogConfig);
  }

}
