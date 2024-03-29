import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

interface CompanySize {
  id: number;
  label: string;
}

@Component({
  selector: 'app-home-section-two',
  templateUrl: './section-two.component.html',
  styleUrl: './section-two.component.scss',
})
export class HomeSectionTwoComponent {
  @ViewChild('requestDemoFormTemp')
  private requestDemoFormTemp: ElementRef;

  public requestDemoForm: FormGroup;

  public preferredCountries: CountryISO[] = [
    CountryISO.Jordan,
    CountryISO.Egypt,
    CountryISO.UnitedArabEmirates,
    CountryISO.SaudiArabia,
    CountryISO.Syria,
  ];

  public selectedCountryISO: CountryISO = CountryISO.Jordan;

  public searchCountryField: SearchCountryField[] = [
    SearchCountryField.Iso2,
    SearchCountryField.Name,
  ];

  private formModal: typeof Swal;

  public comapnySizes: CompanySize[] = [
    {
      id: 1,
      label: '1 - 20 ' + this.translateService.instant('translate_employees'),
    },
    {
      id: 2,
      label: '21 - 100 ' + this.translateService.instant('translate_employees'),
    },
    {
      id: 3,
      label:
        '101 - 500 ' + this.translateService.instant('translate_employees'),
    },
    {
      id: 4,
      label: '> 500 ' + this.translateService.instant('translate_employees'),
    },
  ];

  public constructor(
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {
    this.requestDemoForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      companySize: new FormControl(null, Validators.required),
    });
  }

  public showRequestDemoAccount(): void {
    if (this.requestDemoFormTemp) {
      this.formModal = Swal.mixin({
        html: this.requestDemoFormTemp.nativeElement,
        width: '48rem',
        showCloseButton: true,
        showConfirmButton: false,
      });
      this.formModal.fire();
    }
  }

  public submitRequestDemoAccount(): void {
    this.requestDemoForm.markAllAsTouched();
    if (this.requestDemoForm.valid) {
      console.log({
        ...this.requestDemoForm.value,
        phone: this.requestDemoForm.get('phone')?.value.e164Number,
      });
      this.requestDemoForm.reset();
      this.formModal.close();
      this.toastr.success(
        'The data has been printed in console',
        this.translateService.instant('translate_your_request_has_been_sent')
      );
    }
  }
}