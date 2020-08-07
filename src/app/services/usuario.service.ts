import { Usuario } from './../models/usuario.model';
import { LoginForm } from './../../interfaces/login-form.interface';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, ɵConsole } from '@angular/core';
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

  get token():string{
    return localStorage.getItem('token')||'';
  }

  get uid():string{
    return this.usuario.uid||'';
  }

  public auth2:any;
  public usuario:Usuario;

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
        
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{
        localStorage.setItem('token',resp.token);
        
        const {email,google,nombre,role,img='',uid}=resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
        return true;
      }),      
      catchError(error => 
        of(false)
      )
    )
  }

  createUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )
    
  }
  actualizarPerfil(data:{email:string,nombre:string,role:string}){
    data={
      ...data,role:this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    });
  }

  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )    
  }

  loginGoogle(token){
    console.log('se loguea');
    return this.http.post(`${base_url}/login/google`,{token}).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )    
  }
}
