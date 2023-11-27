import { Component , OnInit } from '@angular/core';
import { Dataservice } from 'src/app/Service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxPermissionsService } from 'ngx-permissions';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit  {

  Agencycomplite = true

  constructor (public ds:Dataservice, private router:Router ,  private ps:NgxPermissionsService){

  }

  ngOnInit(): void {

  }

  logout(){

    this.ds.loggined_user_id = null;

    console.log("logout success");
    

    this.router.navigate(['/UserLogin']);

    this.ps.flushPermissions();
  }



  

}



export const fadeOutAnimation = trigger('fadeOut', [
  state('void', style({ opacity: 0 })),
  transition(':leave', [
    animate('0.5s', style({ opacity: 0 })),
  ]),
]);
