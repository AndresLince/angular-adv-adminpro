import { LoginForm } from './../../interfaces/login-form.interface';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url=environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,private router:Router
    , private ngZone:NgZone) { 
    this.googleInit();
  }

  public auth2:any;

  googleInit() {

    return new Promise(resolve=>{
      console.log("google init");

      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
  
          client_id: '366412109200-9jkdccdoj2qnrc5sa587gt24b9ij5u9l.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',        
        });        
        resolve();
      });
    })

    
  }

  logout(){

    localStorage.removeItem('token');
    
    this.auth2.signOut().then( ()=> {
      
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      
    });
  }

  validarToken():Observable<boolean>{
    const token=localStorage.getItem('token')||'';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      }),
      map(resp=>{
        return true;
      }),
      catchError(error => of(false))
    )
  }

  createUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )
    
  }

  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )    
  }

  loginGoogle(token){
    
    return this.http.post(`${base_url}/login/google`,{token}).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )    
  }
}
