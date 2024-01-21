import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteService } from './autocomplete.service';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteOptionsComponent } from './components/autocomplete-options/autocomplete-options/autocomplete-options.component';



@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteOptionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    AutocompleteComponent
  ],
  providers:[AutocompleteService]
})
export class AutocompleteModule { }
