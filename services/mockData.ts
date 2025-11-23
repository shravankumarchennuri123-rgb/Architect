import { HiddenAsset, DocumentAnalysis, ScamRisk } from '../types';

export const MOCK_ASSETS: HiddenAsset[] = [
  {
    id: 'IEPF-2024-8892',
    name: 'R.K. Sharma',
    fatherName: 'B.K. Sharma',
    type: 'Unclaimed Shares',
    source: 'Reliance Industries Ltd',
    amount: 1250000,
    status: 'UNCLAIMED',
    confidence: 92
  },
  {
    id: 'UDGAM-SBI-7721',
    name: 'Rajesh Kumar',
    fatherName: 'Unknown',
    type: 'Dormant Account',
    source: 'State Bank of India',
    amount: 48000,
    status: 'UNCLAIMED',
    confidence: 75
  },
  {
    id: 'LIC-POL-9912',
    name: 'R. Sharma',
    fatherName: 'Hari Sharma',
    type: 'Matured Policy',
    source: 'LIC India',
    amount: 210000,
    status: 'UNCLAIMED',
    confidence: 65
  }
];

export const mockAnalyzeDocument = (fileName: string): Promise<DocumentAnalysis> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Income Tax Demand Notice (Section 143(1))",
        summary: "The Income Tax Department has found a discrepancy in your return for AY 2023-24. There is a demand of ₹4,500.",
        urgency: 'HIGH',
        actionItems: [
          "Log in to e-Filing Portal",
          "Go to 'Pending Actions' > 'Response to Outstanding Demand'",
          "Agree with demand and pay, or disagree if you have proof."
        ],
        citation: "Income Tax Act, 1961 - Section 143(1)(a) - Intimation of Discrepancy."
      });
    }, 2500);
  });
};

export const mockAnalyzeText = (text: string): Promise<ScamRisk> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      if (lowerText.includes('otp') || lowerText.includes('lottery') || lowerText.includes('click here')) {
        resolve({
          riskLevel: 'DANGER',
          score: 95,
          analysis: "This message exhibits classic phishing patterns. It creates artificial urgency and requests sensitive action.",
          redFlags: ["Unverified Link", "Request for OTP/Money", "Grammatical Errors"]
        });
      } else {
        resolve({
          riskLevel: 'SAFE',
          score: 10,
          analysis: "This appears to be a standard informational message. No malicious patterns detected.",
          redFlags: []
        });
      }
    }, 1500);
  });
};

export const MOCK_FAQS = [
  {
    question: "Is my data safe with Sarathi?",
    answer: "Yes. Sarathi is fully compliant with the DPDP Act 2023. Your data is processed locally on your device or in ephemeral memory and is never stored on our servers without your explicit consent."
  },
  {
    question: "How accurate is the legal advice?",
    answer: "Sarathi uses official government circulars to explain documents but does not provide legal counsel. Always verify critical actions with a qualified professional. You can use our 'Expert Help' feature for verified human assistance."
  },
  {
    question: "Does the Lakshmi Tracker guarantee money?",
    answer: "No. The tracker finds 'potential matches' in public registries. You must file the official claim forms (like IEPF-5) to prove ownership and receive the funds."
  },
  {
    question: "Is the service free?",
    answer: "Scanning and analysis are free. We charge a small convenience fee only if you choose to hire a Sarathi Agent for physical paperwork or complex claims."
  }
];

export const submitFeedback = async (type: string, data: any): Promise<boolean> => {
  console.log(`[Sarathi Log] New ${type} Submission:`, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};