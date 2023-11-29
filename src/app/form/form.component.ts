import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, CheckboxModule, InputMaskModule, ButtonModule, ReactiveFormsModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.sass'
})

export class FormComponent implements OnInit {
  inputForm: FormGroup; 

  constructor(){}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      time: new FormControl(null, [Validators.required]),
      task: new FormArray([])
    })
  }

  onSubmit(){
    console.log(this.inputForm)
  }
}
