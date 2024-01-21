import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteOptionsComponent } from './autocomplete-options.component';

describe('AutocompleteOptionsComponent', () => {
  let component: AutocompleteOptionsComponent;
  let fixture: ComponentFixture<AutocompleteOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutocompleteOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
