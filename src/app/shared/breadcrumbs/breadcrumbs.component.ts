import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {filter,map} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title:string;
  public tituloSubs$:Subscription;

  constructor(private router:Router,private route:ActivatedRoute) {  

    this.tituloSubs$=this.getArgumentosRuta().subscribe(({title})=>{

      this.title=title;
      document.title='AdminPro - '+title;
    });
  }
  ngOnDestroy(): void {

    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    
    return this.router.events
    .pipe(
      filter(event=>event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild===null?true:false),
      map((event:ActivationEnd)=> event.snapshot.data),
    )
    
  }


}
