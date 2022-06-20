import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

const declarations = [
  ModalComponent,
  ConfirmationModalComponent,
]

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations]
})
export class SharedModule {}
