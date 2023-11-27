import { Component } from '@angular/core';
import { Dataservice } from 'src/app/Service';

@Component({
  selector: 'app-agency-verification',
  templateUrl: './agency-verification.component.html',
  styleUrls: ['./agency-verification.component.scss']
})
export class AgencyVerificationComponent {

  constructor (public ds:Dataservice){


  }
  Confirm(){

    
    this.ds.Approve_agency(this.Confirm).subscribe(
      result =>{
        console.log(result,'Approve agency');
        
      }
    )
  }

}
