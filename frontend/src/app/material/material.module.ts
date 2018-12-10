import { NgModule } from '@angular/core';
import { MatCardModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatExpansionModule],
  exports: [MatCardModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatExpansionModule],
})
export class MaterialModule { }
