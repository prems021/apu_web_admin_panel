import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dataservice } from 'src/app/Service';


interface Sub_service_list{

    description: string;
    name: string;
    id: number;
}

interface Sub_service_list_ex{

    Service_code : string;
    Service_name : string;
    id: number;
}



@Component({
  selector: 'subServices-root',
  templateUrl: './Sub_services.html',
  styleUrls: ['./Sub_services.scss']
})
export class SubservicesComponent implements OnInit{

sub_service_list:Sub_service_list[] = [];

all_sub_services: Sub_service_list_ex[] = [];




  constructor(public ds:Dataservice , public rs:Router) { }

  ngOnInit(): void {

  console.log("sared",this.ds.shared_data)
    this.ds.shared_data.service_name

    // 
    this.ds._filter_subservice_only(this.ds.shared_data.service_code).subscribe((result: any) => {

      console.log(result , "subserices");

      this.sub_service_list = result.subServices
      
      console.log(this.sub_service_list  ,"subservice_list");

    })


this.ds.get_all_sub_services(this.ds.Agency_id).subscribe((result:any)=>{
  console.log(result , "All sub services");

  this.all_sub_services =    result.data;

})







  }

  click_to_add_subservice(item:Sub_service_list){
    
    this.ds.get_sub_service_add_Agency(item.id ,item.name , this.ds.Agency_id)
    .subscribe((result:any)=>{
        console.log(result);
        
    })

    
  }


}
