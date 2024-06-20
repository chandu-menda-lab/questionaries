// src/app/components/questionnaire/questionnaire.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.questionService.questions$.subscribe(questions => {
      this.questions = questions;
    });
  }

  onResponseChange(response: any) {
    this.questionService.setResponse(response);
  }

  goToSummary() {
    // this.questionService.questions$.subscribe(questions => {
    //   this.questions = questions;
    //   console.log("this.questions::", this.questions);
    // });
    this.router.navigate(['/summary']); // Navigate to SummaryComponent
  }

  moveUp(index: number) {
    if (index > 0) {
      [this.questions[index], this.questions[index - 1]] = [this.questions[index - 1], this.questions[index]];
      this.questionService.setQuestions(this.questions);
    }
  }

  moveDown(index: number) {
    if (index < this.questions.length - 1) {
      [this.questions[index], this.questions[index + 1]] = [this.questions[index + 1], this.questions[index]];
      this.questionService.setQuestions(this.questions);
    }
  }

}
