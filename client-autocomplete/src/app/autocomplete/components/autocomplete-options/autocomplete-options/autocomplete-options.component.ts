import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-autocomplete-options',
  templateUrl: './autocomplete-options.component.html',
  styleUrl: './autocomplete-options.component.scss'
})
export class AutocompleteOptionsComponent implements OnInit{
  private _options: string[] = [];
   @Input() set options(options: string[]) {
    this._options = options;
    this.highlightedIndex = null;
  }
  get options(): string[] {
    return this._options;
  }
  @Input() template: any;
  @Input() highlightedColor: string | string[] = '#f0f0f0';

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionsClosed: EventEmitter<void> = new EventEmitter<void>();


  highlightedIndex: number | null = null;

  constructor(private el: ElementRef) {}

  selectOption(option: string): void {
    this.optionSelected.emit(option);
  }
  ngOnInit(): void {
    console.log(this.options);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.highlightPreviousOption();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.highlightNextOption();
        event.preventDefault();
        break;
      case 'Enter':
        this.selectHighlightedOption();
        event.preventDefault();
        break;
      case 'Esc':
      case 'Escape':
        this.options  = [];
        this.optionsClosed.emit();
        event.preventDefault();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  private handleMouseEvent(event: MouseEvent): void {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.options  = [];
      this.optionsClosed.emit();
    }
  }
  
  private highlightPreviousOption(): void {
    if (this.highlightedIndex === null || this.highlightedIndex === 0) {
      this.highlightedIndex = this.options.length - 1;
    } else {
      this.highlightedIndex--;
    }
    this.scrollIntoView();
  }

  private highlightNextOption(): void {
    if (this.highlightedIndex === null || this.highlightedIndex === this.options.length - 1) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex++;
    }
    this.scrollIntoView();
  }

  private selectHighlightedOption(): void {
    if (this.highlightedIndex !== null && this.options[this.highlightedIndex]) {
      this.optionSelected.emit(this.options[this.highlightedIndex]);
    }
  }

  private scrollIntoView(): void {
    const highlightedOption = this.el.nativeElement.querySelector('.highlighted');
    if (highlightedOption) {
      highlightedOption.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  highlightOption(index: number): void {
    this.highlightedIndex = index;
  }

  getColor(index: number): string {
    if (typeof this.highlightedColor === 'string') {
      return this.highlightedIndex === index ? this.highlightedColor : '';
    } else {
      return this.highlightedIndex === index ? this.highlightedColor[index % this.highlightedColor.length]: '';
    }
  }

}

