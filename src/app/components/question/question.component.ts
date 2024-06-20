// src/app/components/question/question.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question, Response } from '../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!: Question;
  @Output() responseChange = new EventEmitter<Response>();

  selectedOption: string | string[] = '';

  onOptionChange(event: Event) {
    if (this.question.type === 'radio' || this.question.type === 'select' || this.question.type === 'text') {
      const target = event.target as HTMLInputElement | HTMLSelectElement;
      this.selectedOption = target.value;
    } else if (this.question.type === 'checkbox') {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        this.selectedOption = Array.isArray(this.selectedOption) ? [...this.selectedOption, target.value] : [target.value];
      } else {
        this.selectedOption = Array.isArray(this.selectedOption) ? this.selectedOption.filter(item => item !== target.value) : [];
      }
    }
    this.responseChange.emit({ questionId: this.question.id, selectedOption: this.selectedOption });
  }
}
