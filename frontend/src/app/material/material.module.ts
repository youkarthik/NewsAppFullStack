import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule,  MatSelectModule, MatExpansionModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MatCardModule,  MatButtonModule,  MatSelectModule, MatExpansionModule, MatSnackBarModule],
  exports: [MatCardModule,  MatButtonModule,  MatSelectModule, MatExpansionModule, MatSnackBarModule],
})
export class MaterialModule { }
