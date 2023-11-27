import { Component, OnInit } from '@angular/core';
import { Dataservice } from 'src/app/Service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface services {
  name: string;
  id: number;
}

export interface Activated_service_list{

  Service_code: string
  Service_name: string
  id: number
}

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss']
})


export class AgencyDetailsComponent implements OnInit {


  myControl = new FormControl<string | services>('');

  options: services[] = [];

  activated_service_list: Activated_service_list[] = [];
  selected_opt: services = null;

  filteredOptions: Observable<services[]>;

  Allservicelist:string

  isLoading = false;



  constructor(private ds: Dataservice, public toaster: ToastrService,public rs : Router) { }


  ngOnInit(): void {

 this.Update_service_list();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );


    // get all services share replay

    this.ds.serviceData$.subscribe((result: any) => {
      console.log(result, "all service list");

      this.options = result.data
      console.log(this.options);




    })

    // get all serviceto add agency
  }

  onOptionSelected(option: services) {
    this.selected_opt = option;
    console.log(this.selected_opt, "selected option");
  }

  displayFn(user: services): string {
    return user && user.name ? user.name : 'Search';
  }

  private _filter(name: string): services[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  Active() {

    this.isLoading = true;

    this.ds.add_service_to_agency_list(this.selected_opt.id ,this.selected_opt.name , this.ds.Agency_id).subscribe
    ((result: any) => {
      console.log(result, "service add to agency list");

      if (result.success == true) {

        this.isLoading = false;
          this.Update_service_list()
      }

    })


  }
  Update_service_list(){
    this.ds.get_all_service_to_agency_list(this.ds.Agency_id).subscribe((result: any) => {
      console.log(result, "all service list");

      const modifiedData = this.transformData(result.data);
       this.activated_service_list = modifiedData;

      
    })
    
  }

  transformData(data: any): any[] {
    // Example transformation: Extracting relevant fields and modifying them
    const modifiedData = data.map((item: any) => {
      return {
        Service_code: item.Service_code,
        Service_name: item.Service_name,
        id: item.id
        // Add more transformations as needed
      };
    });

    return modifiedData;
  }


  click_on_action( item:Activated_service_list) 

    {
      console.log(item , "items");

  
      this.ds.shared_data.service_code = item.Service_code;
      this.ds.shared_data.service_name = item.Service_name;
      this.ds.shared_data.service_id = item.id;
      this.rs.navigate(['/Subservices']);
    }






}








