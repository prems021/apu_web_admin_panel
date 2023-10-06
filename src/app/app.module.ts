import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DataService } from './services/data.service';
import { ApiService } from './services/api.service';
import { LoginComponent } from './pages/login/login';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashComponent } from './pages/dash/dash';
import { View_Invoice_list } from './pages/invoice/view-list/view';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoaderComponent } from './shared/loader/loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    DashComponent,
    View_Invoice_list,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    DragDropModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [DataService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
