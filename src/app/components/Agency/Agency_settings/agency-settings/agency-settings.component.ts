import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { Observable , ReplaySubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



export interface location {
  name: string;
  id : number;
  code : string;
}



@Component({
  selector: 'app-agency-settings',
  templateUrl: './agency-settings.component.html',
  styleUrls: ['./agency-settings.component.scss'],
 
})


export class AgencySettingsComponent implements OnInit {


servicelist:any = []
allsubservice:any = false
local_searchitem: string;

  myControl = new FormControl<string | location>('');

  options: location [] = [];

  selected_opt : location = null;

  filteredOptions: Observable<location[]>;

  nearbylocation_button:boolean=false

  primarylocation_button:boolean=true

  primary_location:any

  locationbutton:any = true

  nearbutton:boolean=true

  pass_name_location:any

  constructor (public ds:Dataservice ,public toastr:ToastrService){
  }

  ngOnInit(): void {

    // filtering
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
    
// get all primary and nearby location get

this.ds.get_location_list(this.ds.Agency_id)
.subscribe((result:any)=>{
  console.log(result , "all list location");
this.primary_location = result.data
// console.log(this.primary_location , "primarylocation");

})


// get All location display
    this.ds.get_all_location()
    .subscribe((result:any)=>{
      console.log(result ,"location");

      this.options = result.data
      console.log(this.options);



       
    })

  }

  onOptionSelected(option:location){
    this.selected_opt = option;
    console.log(this.selected_opt ,"selected option");
  }

  displayFn(user: location): string {
    return user && user.name ? user.name : 'Search';
  }

  private _filter(name: string): location[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  update_location(){
    this.ds.update_location_of_agency(this.ds.Agency_id , this.selected_opt)
      .subscribe((result:any)=>{
        console.log(result);

        this.locationbutton=result.data



        if(result.success==true){
          this.toastr.success("Primary Location Addded successfully")

        }
          else{
            this.toastr.error("Primary Location Alredy Aded")
          }

      })
  }
  nearby_location(){
    this.ds.update_location_of_agency(this.ds.Agency_id , this.selected_opt)
    .subscribe((result:any)=>{
      console.log(result);

      if(result.success==true){
        this.toastr.info("Nearby Location Addded successfully")

      }
        else{
          this.toastr.error("Nearby Location Alredy Aded")
        }

    })

  }


}







  
  
