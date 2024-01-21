import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteService } from '../../../autocomplete/autocomplete.service';
import {  debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl:'./autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements AfterContentInit{
  @Input() apiEndpoint!: string;
  @Input() minimumTyping:number = 2;
  @Input() limit:number = 10;
  @Input() debounceTime:number = 300;
  @Input() cacheSize: number = 0; // Maximum number of entries in the cache
  @Input() highlightedColor: string | string[] = '#f0f0f0';

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionsClosed: EventEmitter<void> = new EventEmitter<void>();

  autocompleteOptions: string[] = [];
  private resultsCache: Map<string, string[]> = new Map();

  @ContentChild('autocompleteInput', { read: ElementRef }) autocompleteInput: ElementRef | undefined;
  @ContentChild('autocompleteOptionTemplate') autocompleteOptionTemplate: any;

  constructor(private autocompleteService: AutocompleteService) {}
  
  ngAfterContentInit(): void {
    if (this.autocompleteInput) {
      fromEvent<Event>(this.autocompleteInput.nativeElement, 'input').pipe(
        debounceTime(this.debounceTime),
        map((event: Event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
      ).subscribe((query:string) =>this.onInputChange(query));
    } else {
      throw new Error('The autocomplete input is required');
    }
  }
  
  onInputChange(query: string): void {
    if (query.length >= this.minimumTyping) {
      const cacheKey = this.getCacheKey(query);
      const cachedResults = this.resultsCache.get(cacheKey);

      if (cachedResults) {
        this.autocompleteOptions = cachedResults;
      } else {
        this.autocompleteService.search(query, this.apiEndpoint, this.limit)
          .subscribe(results => {
            this.updateCache(cacheKey, results.slice(0, this.limit));
            this.autocompleteOptions = results;
          });
      }
    } else {
      this.autocompleteOptions = [];
    }
  }

  selectOption(option: string): void {
    this.optionSelected.emit(option);
    this.autocompleteOptions=[];
    if (this.autocompleteInput) {
      this.autocompleteInput.nativeElement.value = option;
    }
  }
  closeOptions(): void {
    this.autocompleteOptions = [];
    this.optionsClosed.emit();
  }

  private getCacheKey(query: string): string {
    return `${query}-${this.limit}`;
  }


  private updateCache(cacheKey: string, results: string[]): void {
    this.resultsCache.set(cacheKey, results);

    // Check and limit the cache size
    if (this.resultsCache.size > this.cacheSize) {
      const oldestKey = Array.from(this.resultsCache.keys())[0];
      this.resultsCache.delete(oldestKey);
    }
  }
}
