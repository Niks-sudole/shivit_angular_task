import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { CustomField } from '../model/customfield';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyserviceService } from '../service/companyservice.service';
import { CustomfieldserviceService } from '../service/customfieldservice.service';

@Component({
  selector: 'app-company',
  standalone: true, 
  imports: [ReactiveFormsModule], 
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'] 
})
export class CompanyComponent implements OnInit  {
  companies: Company[] = [];
  customFields: CustomField[] = [];
  companyForm: FormGroup;
  page = 0;
  size = 10;
  totalElements = 0;
  editingCompanyId: number | null = null;
  showForm = false;

  constructor(
    private companyService: CompanyserviceService,
    private customFieldService: CustomfieldserviceService,
    private fb: FormBuilder
  ) {
    this.companyForm = this.fb.group({});
  }

  ngOnInit() {
    this.loadCompanies();
    this.loadCustomFields(112);
  }

  loadCompanies() {
    this.companyService.getCompanies(this.page, this.size).subscribe(data => {
      this.companies = data.content;
      this.totalElements = data.totalElements;
    });
  }

  loadCustomFields(moduleId: number) {
    this.customFieldService.getCustomFields(moduleId).subscribe(fields => {
      this.customFields = fields;
      this.generateForm();
    });
  }

  generateForm(company?: Company) {
    const group: any = {};
    this.customFields.forEach(field => {
      group[field.fieldIndexing.indexingDetails] = ['', Validators.required];
    });
    this.companyForm = this.fb.group(group);
    if (company) {
      this.companyForm.patchValue(company);
    }
  }

  onEdit(company: Company) {
    this.editingCompanyId = company.id!;
    this.generateForm(company);
    this.showForm = true;
  }

  onAdd() {
    this.editingCompanyId = null;
    this.generateForm();
    this.showForm = true;
  }

  onSubmit() {
    const company: Company = this.companyForm.value;
    if (this.editingCompanyId) {
      this.companyService.updateCompany(this.editingCompanyId, company).subscribe(() => {
        this.showForm = false;
        this.loadCompanies();
      });
    } else {
      this.companyService.saveCompany(company).subscribe(() => {
        this.showForm = false;
        this.loadCompanies();
      });
    }
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadCompanies();
  }
}
