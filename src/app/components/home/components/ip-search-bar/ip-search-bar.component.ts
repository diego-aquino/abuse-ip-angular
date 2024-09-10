import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SearchIconComponent } from '@/app/components/icons/search-icon/search-icon.component';
import { ButtonComponent } from '../../../common/button/button.component';
import { FormErrorComponent } from '../../../common/form/form-error/form-error.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const IP_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

export interface FormValues {
  ip: string;
}

@Component({
  selector: 'app-ip-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, SearchIconComponent, ButtonComponent, FormErrorComponent],
  templateUrl: './ip-search-bar.component.html',
})
export class IPSearchBarComponent {
  formGroup = new FormGroup({
    ip: new FormControl('', [Validators.required, Validators.pattern(IP_REGEX)]),
  });

  get formValues() {
    return {
      ip: this.formGroup.value.ip ?? '',
    };
  }

  formErrors = {
    ip: '',
  };

  @ViewChild('ipInput') ipInputElement!: ElementRef;

  @Output() submitSearch = new EventEmitter<FormValues>();

  get submitButtonEnabled() {
    return this.formValues.ip.length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.populateErrorMessages();

    if (this.formGroup.valid) {
      this.submitSearch.emit({
        ip: this.formValues.ip,
      });

      this.formGroup.reset();
      this.ipInputElement.nativeElement.blur();
    }
  }

  private populateErrorMessages() {
    this.formErrors.ip = this.getIPErrorMessage();
  }

  private getIPErrorMessage() {
    const control = this.formGroup.controls.ip;

    if (control.errors?.['pattern']) {
      return 'Endereço IP inválido.';
    }
    return '';
  }
}
