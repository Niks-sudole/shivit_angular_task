export interface CustomField {
  id: number;
  moduleId: number;
  fieldValidations: FieldValidation[];
  fieldIndexing: FieldIndexing;
}

export interface FieldValidation {
  id: number;
  rule: string;
}

export interface FieldIndexing {
  id: number;
  indexingDetails: string;
}

