import { Component, input, output, ViewChild } from '@angular/core';
import { PerfilEmpresaDto } from '../../../core/interfaces/empresa.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { EditarPerfilDialog } from '../../../empresa/pages/perfil/editar-perfil-dialog/editar-perfil-dialog';
import { ButtonModule } from 'primeng/button';
import { CustomAvatar } from '../custom-avatar/custom-avatar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-profile',
  imports: [
    SkeletonModule,
    ButtonModule,
    EditarPerfilDialog,
    CustomAvatar,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './empresa-profile.html',
  styleUrl: './empresa-profile.scss',
})
export class EmpresaProfile {
  perfil = input.required<PerfilEmpresaDto>();
  editable = input(false);

  perfilEditado = output<void>();

  @ViewChild(EditarPerfilDialog)
  editarPerfilDialog!: EditarPerfilDialog;
}
