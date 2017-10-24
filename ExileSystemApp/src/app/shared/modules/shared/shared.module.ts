import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize/dist';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule
  ],
  exports: [
    CommonModule,
    MaterializeModule
  ]
})

export class SharedModule {}
