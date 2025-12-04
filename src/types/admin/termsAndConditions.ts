export interface MultilingualField {
  ar: string;
  fr: string;
  en: string;
}

export interface TermsAndConditions {
  id?: number;
  condition_id?: string;
  titre: MultilingualField;
  contenu: MultilingualField;
  version: number;
  active: boolean;
  date_creation?: string;
}

export interface TermsAndConditionsFormData {
  titre: MultilingualField;
  contenu: MultilingualField;
  version: number;
  active: boolean;
}
