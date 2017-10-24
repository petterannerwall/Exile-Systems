import { SharedModule } from '../shared/shared.module';
import { SidebarNavComponent } from '../../components/sidebar-nav/sidebar-nav.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [SidebarNavComponent],
  declarations: [SidebarNavComponent]
})
export class SidebarNavModule { }
