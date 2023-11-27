import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { Observable, Observer, map, startWith } from 'rxjs';
import { MatDialog ,MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



interface all_sub_service{
  Service_code : string;
  Service_name : string;
  id: number;
}

interface apu_all_list{
  Apu_name:string;
  Description:string;
  id:number;
}

interface all_sub_service{
  Service_code : string;
  Service_name : string;
  id: number;
}



@Component({
  selector: 'Agencyapu-root',
  templateUrl: './Agency_apu.html',
  styleUrls: ['./Agency_apu.scss'],
})
export class AgencyapuComponent implements OnInit{



  options: all_sub_service[] = [];

  selected_opt: all_sub_service = null;

  filteredOptions: Observable<all_sub_service[]>;

  accessForm: FormGroup

  apu_list: apu_all_list[] = [];

  sub_service_list: all_sub_service[] = [];


  constructor(public ds:Dataservice , public fb:FormBuilder , public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  ngOnInit(): void {



// subservice list

this.ds.get_all_sub_services(this.ds.Agency_id).subscribe((result:any)=>{
  console.log(result , "All sub services");
  
this.options = result.data



})

// map subservices

this.update_apu_list()

    console.log(this.ds.shared_data);

    this.accessForm = this.fb.group({

      Agency_Id: [''],
      accessName: ['' ],
      description: [''],
    })


  }



  addAccess() : void {

    if(this.accessForm.valid){

      this.accessForm.patchValue({Agency_Id:this.ds.Agency_id})

      this.ds.Add_new_apu(this.accessForm.value).subscribe((result:any)=>{
        console.log(result , "APU aded sussessfully");


        if(result.success==true){

          
          this.update_apu_list()

        }

      })
    }
  }



  update_apu_list(){
    this.ds.get_all_apu_list(this.ds.Agency_id).subscribe((result:any)=>{
      console.log(result , "all list in Apu");

      this.apu_list = result.data

      


  })
  }
  

  click_to_add_subservice(){



  }


}


@Component({
  selector: 'DigitalDailog',
  templateUrl: 'DigitaDailog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule , MatTabsModule,  AsyncPipe , MatInputModule ,MatFormFieldModule , MatAutocompleteModule]   

})



export class DialogContentExampleDialog  implements OnInit{

  myControl = new FormControl<string | all_sub_service>('');

  options: all_sub_service[] = [];

  selected_opt: all_sub_service = null;

  filteredOptions: Observable<all_sub_service[]>;



  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Service_name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    
  }


  onOptionSelected(option: all_sub_service) {
    this.selected_opt = option;
    console.log(this.selected_opt, "selected option");
  }

  displayFn(user: all_sub_service): string {
    return user && user.Service_name ? user.Service_name : 'Search';
  }

  private _filter(name: string): all_sub_service[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.Service_name.toLowerCase().includes(filterValue));
  }

  
}


