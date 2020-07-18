import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {
   //@Input('valor') progreso:number=40;  
   @Input() progreso:number=40;  
   valorInput:number=this.progreso;
   @Input() btnClass:string='btn btn-primary';  
 
 
   @Output() valorSalida:EventEmitter<number>=new EventEmitter; 

  cambiarValor(valor:number){

    if(this.progreso>=100 && valor>=0){

      this.valorSalida.emit(100);
      this.progreso=100;
      return;
    }

    if(this.progreso<=0 && valor<0){
      
      this.valorSalida.emit(0);
      this.progreso=0;
      return;
    }
    
    this.progreso=this.progreso+valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor:number){
    
    this.valorInput=nuevoValor;
    if(nuevoValor>=100){
      this.progreso=100;
    }else if(nuevoValor<=0){
      this.progreso=0;
    }else{
      this.progreso=nuevoValor;
    }
        
    this.valorSalida.emit(this.progreso);

  }

}
