export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  LAKSHMI_TRACKER = 'LAKSHMI_TRACKER',
  JEEVAN_SCANNER = 'JEEVAN_SCANNER',
  RAKSHA_SHIELD = 'RAKSHA_SHIELD',
  FEEDBACK_SUPPORT = 'FEEDBACK_SUPPORT',
}

export interface HiddenAsset {
  id: string;
  name: string;
  fatherName: string;
  type: string;
  source: string;
  amount: number;
  status: 'UNCLAIMED' | 'CLAIMED';
  confidence: number;
}

export interface DocumentAnalysis {
  title: string;
  summary: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  actionItems: string[];
  citation: string;
}

export interface ScamRisk {
  riskLevel: 'SAFE' | 'CAUTION' | 'DANGER';
  score: number;
  analysis: string;
  redFlags: string[];
}

export interface UserProfile {
  name: string;
  location: string;
  language: string;
}