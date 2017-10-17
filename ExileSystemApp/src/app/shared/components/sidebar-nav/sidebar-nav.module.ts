import { RouterModule } from '@angular/router';
import { SidebarNavComponent } from './sidebar-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SidebarNavComponent],
  declarations: [SidebarNavComponent]
})
export class SidebarNavModule { }
