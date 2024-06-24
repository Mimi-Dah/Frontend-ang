import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../document.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-direction',
  templateUrl: './add-direction.component.html',
  styleUrls: ['./add-direction.component.css']
})
export class AddDirectionComponent {
  selectedFile: File | null = null;
  loginInProgress = false;
  ppm: string = '';
  ppmType: string = '';
  inscriptionPpm: boolean | null = null;
  ac: string = '';
  refActivite: string = '';
  typeActivite: string = '';
  mode: string = '';
  datePrevLancementActivite: Date | null = null;
  datePrevDeReception: Date | null = null;
  budgetPrev: number | null = null;
  devise: string = '';
  sourceDeFinancement: string = '';
  libSourceDeFinancement: string = '';
  datePublicationActivite: Date | null = null;
  niveauSuivi: string = '';
  etape: string = '';
  approbation: string = '';
  dateAttribution: Date | null = null;
  attributaire: string = '';
  montantTotalDuMarche: number | null = null;
  dateSignatureAc: Date | null = null;
  numMarche: string = '';
  dateNumerotation: Date | null = null;
  dateNotification: Date | null = null;
  delaiExecutionEnJour: number | null = null;
  dateDeReception: Date | null = null;
  retardConstateEnJour: number | null = null;
  etatDuMarche: string = '';
  observation: string = '';
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  documents: any[] = [];
  ppmOptions = [
    { value: 'PPM-2019', label: 'PPM-2019' },
    { value: 'PPM-2020', label: 'PPM-2020' },
    { value: 'PPM2021', label: 'PPM2021' },
    { value: 'PPM2022', label: 'PPM2022' },
  ];
  typeActiviteOptions = [
    { value: 'T', label: 'Travaux' },
    { value: 'F', label: 'Fournitures' },
    { value: 'S', label: 'Services' },
    { value: 'PI', label: 'Prestations Intellectuelles' },
  ];
  modeOptions = [
    { value: 'SQC', label: 'Sélection sur la Qualité du Consultant' },
    { value: 'SBQC', label: 'Sélection sur la Base de qualité et Cout' },
    { value: 'SBD', label: 'Sélection sur la Base de Document' },
    { value: 'SMC', label: 'Sélection du Moindre Cout' },
    { value: 'AON', label: 'Appel d\'Offre National' },
    { value: 'AOI', label: 'Appel d\'Offre International' },
    { value: 'AOR', label: 'Appel d\'Offre national Restreint' },
    { value: 'AORI', label: 'Appel d\'Offre Restreint International' },
    { value: 'ED', label: 'En Mode Direct' },
  ];
  deviseOptions = [
    { value: 'MRU', label: 'MRU' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];
  sourceDeFinancementOptions = [
    { value: 'B.E', label: 'Budget de l\'Etat' },
    { value: 'B.F', label: 'Bayeur de Fond ou Budget Externe' },
    { value: 'B.E/B.F', label: 'Projet financé en deux Partie Etat et B.F' },
  ];
  niveauSuiviOptions = [
    { value: 'AC', label: 'Autorité Contractante' },
    { value: 'CPMP', label: 'Commission de Passation des Marchés Publics' },
    { value: 'CNCMP', label: 'Commission Nationale de Contrôle des Marchés Publics' },
    { value: 'ARMP', label: 'Autorité de Régulation des Marchés Publics' },
    { value: 'ANO-B.F', label: 'Avis de Non Objection du Bayeur de Fond' },
  ];
  etapeOptions = [
    { value: 'AMI', label: 'Avis de Manifestation d\'Intérêt' },
    { value: 'DP', label: 'Demande de Proposition' },
    { value: 'ET', label: 'Etude Technique' },
    { value: 'EF', label: 'Etude Financière' },
    { value: 'PM', label: 'Projet de Marché' },
    { value: 'Marché', label: 'Marché attribué' },
    { value: 'DAO', label: 'Dossier d\'Appel d\'Offre' },
    { value: 'PE', label: 'Phase d\'Evaluation' },
  ];
  approbationOptions = [
    { value: 'NA', label: 'Non approuvé' },
    { value: 'Reporté', label: 'Reporté' },
    { value: 'ASR', label: 'Approuvé sous réserve' },
    { value: 'Approuvé', label: 'Approuvé' },
    { value: 'MA', label: 'Marché attribué' },
  ];
  etatDuMarcheOptions = [
    { value: 'PA', label: 'Projet Marché' },
    { value: 'MECE', label: 'Marché En cours d\'Exécution' },
    { value: 'MER', label: 'Marché En Retard' },
    { value: 'AAN', label: 'Activité Annulée' },
    { value: 'MR', label: 'Marché Resilié' },
    { value: 'MREC', label: 'Marché Réceptionné' },
  ];

  dataSource = new MatTableDataSource<any>();
ppm_type: any;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    private demandeMarchetService: DocumentService
  ) {}

  ngOnInit(): void {
    const role = window.localStorage.getItem('role');
    console.log('+++++++',role)
   // this.isAutorite = role === 'Autorite';
    this.demandeMarchetService.getppm().subscribe((data) => {
      this.documents = data;
      this.dataSource.data = this.documents; // Set the data for the Material table
    });

  }

  onSubmit() {
    if (this.ppm) {
      const formData = new FormData();
      formData.append('ppm', this.ppm);
      formData.append('ppmOptions', this.ppmType);
      formData.append('inscriptionPpm', this.inscriptionPpm?.toString() || '');
      formData.append('ac', this.ac);
      formData.append('refActivite', this.refActivite);
      formData.append('typeActivite', this.typeActivite);
      formData.append('mode', this.mode);
      formData.append('datePrevLancementActivite', this.datePrevLancementActivite?.toISOString() || '');
      formData.append('datePrevDeReception', this.datePrevDeReception?.toISOString() || '');
      formData.append('budgetPrev', this.budgetPrev?.toString() || '');
      formData.append('devise', this.devise);
      formData.append('sourceDeFinancement', this.sourceDeFinancement);
      formData.append('libSourceDeFinancement', this.libSourceDeFinancement);
      formData.append('datePublicationActivite', this.datePublicationActivite?.toISOString() || '');
      formData.append('niveauSuivi', this.niveauSuivi);
      formData.append('etape', this.etape);
      formData.append('approbation', this.approbation);
      formData.append('dateAttribution', this.dateAttribution?.toISOString() || '');
      formData.append('attributaire', this.attributaire);
      formData.append('montantTotalDuMarche', this.montantTotalDuMarche?.toString() || '');
      formData.append('dateSignatureAc', this.dateSignatureAc?.toISOString() || '');
      formData.append('numMarche', this.numMarche);
      formData.append('dateNumerotation', this.dateNumerotation?.toISOString() || '');
      formData.append('dateNotification', this.dateNotification?.toISOString() || '');
      formData.append('delaiExecutionEnJour', this.delaiExecutionEnJour?.toString() || '');
      formData.append('dateDeReception', this.dateDeReception?.toISOString() || '');
      formData.append('retardConstateEnJour', this.retardConstateEnJour?.toString() || '');
      formData.append('etatDuMarche', this.etatDuMarche);
      formData.append('observation', this.observation);

      if (this.selectedFile) {
        formData.append('Document', this.selectedFile);
      }

      this.loginInProgress = true;
      this.demandeMarchetService.demanderMarche(formData).subscribe(
        response => {
          console.log('Response:', response);
          this.message = response.message;
          if (this.message) {
            this.showErrorAlert(this.message);
          }
          this.dialogRef.close();
          window.location.reload();
        },
        error => {
          console.error('Error:', error);
          this.message = 'Une erreur s\'est produite lors de la soumission du formulaire.';
          this.showErrorAlert(this.message);
        }
      ).add(() => {
        this.loginInProgress = false;
      });
    }
  }
  

  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000,
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCancel() {
    this.dialogRef.close();
  }
}