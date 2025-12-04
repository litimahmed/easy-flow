export interface MultilingualField {
  ar: string;
  fr: string;
  en: string;
}

export interface PrivacyPolicy {
  id?: number;
  titre: MultilingualField;
  contenu: MultilingualField;
  version: number;
  active: boolean;
  date_creation?: string;
}

export interface PrivacyPolicyFormData {
  titre: MultilingualField;
  contenu: MultilingualField;
  version: number;
  active: boolean;
}
