import { Component } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, url } from '../base/base_url';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { DocumentService } from '../document.service';
import { DocumentSelectionService } from '../document-selection.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AddDirectionComponent } from '../add-direction/add-direction.component';

@Component({
  selector: 'app-document-admin',
  templateUrl: './document-admin.component.html',
  styleUrls: ['./document-admin.component.css']
})
export class DocumentAdminComponent {
  commites: any[] = [];
  dataSource = new MatTableDataSource<any>();
  show = true;
  showButtons: boolean = false; 
  isAutorite: boolean = false;
  typeppm: any[] = [];
  // constructor(private commiteService: CommiteService,private sanitizer: DomSanitizer,public dialog: MatDialog, private router: Router) { }

  constructor(private MarchetService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,private sanitizer: DomSanitizer,private http: HttpClient, private router: Router) { }

  // ngOnInit(): void {
  //   this.documentService.getAllDocuments().subscribe((data: any[]) => {
  //     this.documents = data;
  //     this.dataSource.data = this.documents; // Set the data for the Material table
  //   });
  // }
  
  ngOnInit(): void {
    const role = window.localStorage.getItem('role');

      this.typeppm = ['PPM-2019','PPM-2020','PPM2021','PPM2022']


    console.log('+++++++',role)
    this.isAutorite = role === 'Autorite';
    this.MarchetService.getMarchet().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.commites = data;
        this.dataSource.data = this.commites; // Set the data for the Material table
    
        // Désinfecter les URLs
        // this.commites.forEach(document => {
        //   document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${document.Document}`);
        // });
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
      }
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddDirectionComponent, {
      
      width: '1000px',
      
      panelClass: 'custom-dialog-container',
      position: {
        left: '330px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  }

  // openConfirmationDialog(commiteId: number) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent);

  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if (result === true) {
  //       // Call the API to delete the document when the user confirms
  //       this.commiteService.deleteCommite(commiteId);
             
  //     }
  //   });
  // }

  toggleSelection(comiite: any) {
    comiite.isSelected = !comiite.isSelected;
  } 
  toggleButtons(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.showButtons = true;
    } else {
      this.showButtons = false;
    }
  }
}
