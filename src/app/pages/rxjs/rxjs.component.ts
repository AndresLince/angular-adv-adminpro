import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    
    /*this.retornaObservable()
    .pipe(
      retry(1)
    )
    .subscribe(
      valor=>console.log('subs',valor),
      err=>console.warn(err),
      ()=>console.info('termino')      
    );*/
    this.intervalSubs=this.retornaIntervalo().subscribe(
      console.log
    )

  }
  ngOnDestroy(): void {
    
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>{

    return interval(100).pipe( 
      //take(10),     
      map(valor=> valor+1),
      filter(valor=>valor % 2===0 ?true:false)
     
    )

  }

  retornaObservable():Observable<number>{

    return new Observable<number>(observer=>{

      let i=-1;
      
      const intervalo=setInterval(()=>{
        i++;
        observer.next(i);

        if(i===4){

          clearInterval(intervalo);
          observer.complete();
        }

        if(i===2){
          
          clearInterval(intervalo);
          observer.error('i llego al valor de 2');
        }
        
      },1000);
    });   
   
  }
  

}
