export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'MCQ' | 'TF';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export const questions: Question[] = [
  // Easy
  {
    id: 1,
    text: "According to the WHO (1948), health is merely the absence of disease or infirmity.",
    type: "TF",
    difficulty: "Easy",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Health is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity."
  },
  {
    id: 2,
    text: "Which of the following is NOT part of the Epidemiologic Triad?",
    type: "MCQ",
    difficulty: "Easy",
    options: ["Agent", "Host", "Environment", "Policy"],
    correctAnswer: "Policy",
    explanation: "The Epidemiologic Triad consists of Agent, Host, and Environment."
  },
  {
    id: 3,
    text: "Primary prevention aims to halt the progression of a disease early in its course.",
    type: "TF",
    difficulty: "Easy",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Primary prevention prevents the disease before it occurs. Secondary prevention halts the progression early."
  },
  {
    id: 4,
    text: "What does SDOH stand for?",
    type: "MCQ",
    difficulty: "Easy",
    options: ["Social Determinants of Health", "Standard Dimensions of Health", "Systemic Diseases of Humans", "Social Diseases of Habit"],
    correctAnswer: "Social Determinants of Health",
    explanation: "SDOH stands for Social Determinants of Health, which are conditions in which people are born, grow, live, work, and age."
  },
  {
    id: 5,
    text: "An ecosystem includes both biotic (living) and abiotic (non-living) elements.",
    type: "TF",
    difficulty: "Easy",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "An ecosystem can be categorized into abiotic constituents (minerals, climate, water) and biotic constituents (plants, animals)."
  },
  {
    id: 16,
    text: "Preventive medicine refers to measures taken to cure diseases rather than prevent them.",
    type: "TF",
    difficulty: "Easy",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Preventive medicine involves measures taken to prevent diseases, rather than curing them."
  },
  {
    id: 17,
    text: "Which of the following is considered a renewable resource?",
    type: "MCQ",
    difficulty: "Easy",
    options: ["Fossil fuels", "Coal", "Water", "Natural gas"],
    correctAnswer: "Water",
    explanation: "Resources can be classified as renewable (e.g., water) or non-renewable (e.g., fossil fuels)."
  },
  {
    id: 18,
    text: "Mental and physical health are the only two types of health that contribute to overall well-being.",
    type: "TF",
    difficulty: "Easy",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Spiritual, emotional, and financial health also contribute to overall health."
  },

  // Medium
  {
    id: 6,
    text: "Which model proposes that health and illness result from a combination of biological, psychological, and social factors?",
    type: "MCQ",
    difficulty: "Medium",
    options: ["Health Belief Model", "Biopsychosocial Model", "Epidemiologic Triad", "Health Locus of Control"],
    correctAnswer: "Biopsychosocial Model",
    explanation: "The Biopsychosocial Model proposes that health and illness are the result of a combination of Biological, Psychological, and Social factors."
  },
  {
    id: 7,
    text: "In the Health Belief Model, 'How bad would it be if I got it?' refers to:",
    type: "MCQ",
    difficulty: "Medium",
    options: ["Perceived Susceptibility", "Perceived Severity", "Perceived Benefits", "Cues to Action"],
    correctAnswer: "Perceived Severity",
    explanation: "Perceived Severity refers to the belief about how bad the consequences would be if the disease was contracted."
  },
  {
    id: 8,
    text: "Demography in public health is the scientific study of human population.",
    type: "TF",
    difficulty: "Medium",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Demography is the scientific study of human population, important for understanding population structure to plan health interventions."
  },
  {
    id: 9,
    text: "Which core public health function includes 'Monitor health status to identify and solve community health problems'?",
    type: "MCQ",
    difficulty: "Medium",
    options: ["Assessment", "Policy Development", "Assurance", "Evaluation"],
    correctAnswer: "Assessment",
    explanation: "Monitoring health status is part of the 'Assessment' core function of public health."
  },
  {
    id: 10,
    text: "A person with an 'Internal' Health Locus of Control believes that their health is a matter of luck or fate.",
    type: "TF",
    difficulty: "Medium",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Internal locus of control means believing 'My own actions determine my health.' Chance/luck is an External locus."
  },
  {
    id: 19,
    text: "Which of the following is NOT one of the Three Core Public Health Functions?",
    type: "MCQ",
    difficulty: "Medium",
    options: ["Assessment", "Policy Development", "Assurance", "Treatment"],
    correctAnswer: "Treatment",
    explanation: "The three core functions are Assessment, Policy Development, and Assurance."
  },
  {
    id: 20,
    text: "Stigma is a major barrier to seeking care and adhering to treatment.",
    type: "TF",
    difficulty: "Medium",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Stigma and discrimination are major barriers to seeking care, adhering to treatment, and recovering."
  },
  {
    id: 21,
    text: "Which concept describes an individual's belief about who or what controls their health?",
    type: "MCQ",
    difficulty: "Medium",
    options: ["Health Belief Model", "Health Locus of Control", "Social Support Networks", "Resilience"],
    correctAnswer: "Health Locus of Control",
    explanation: "Health Locus of Control is an individual's belief about who or what controls their health (Internal vs. External)."
  },

  // Hard
  {
    id: 11,
    text: "Which of the following is an example of Tertiary Prevention?",
    type: "MCQ",
    difficulty: "Hard",
    options: ["Vaccination", "Screening for hypertension", "Restoring function and managing impact of established disease", "Water chlorination"],
    correctAnswer: "Restoring function and managing impact of established disease",
    explanation: "Tertiary prevention involves managing the impact of established disease and restoring function."
  },
  {
    id: 12,
    text: "The 'Natural History of Disease' refers to the progression of a disease in an individual after medical intervention has started.",
    type: "TF",
    difficulty: "Hard",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The Natural History of Disease is the progression of a disease from its earliest precursor stage to recovery, disability, or death, WITHOUT intervention."
  },
  {
    id: 13,
    text: "Which public health specialty focuses on hazard identification, risk assessment, and hazard management of all workers in institutions?",
    type: "MCQ",
    difficulty: "Hard",
    options: ["Environmental health", "Occupational health", "Community nutrition", "Biostatistics"],
    correctAnswer: "Occupational health",
    explanation: "Occupational health covers hazard identification, risk assessment, and hazard management of workers."
  },
  {
    id: 14,
    text: "Chronic stress activates the body's 'fight-or-flight' response, leading to elevated levels of which hormone?",
    type: "MCQ",
    difficulty: "Hard",
    options: ["Insulin", "Cortisol", "Adrenaline", "Melatonin"],
    correctAnswer: "Cortisol",
    explanation: "Chronic stress activates the fight-or-flight response, leading to elevated cortisol levels."
  },
  {
    id: 15,
    text: "According to the definitions provided, 'Environment' focuses on the interactions between biotic and abiotic factors, while 'Ecosystem' focuses on the external conditions affecting life.",
    type: "TF",
    difficulty: "Hard",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "It is the opposite. Ecosystem focuses on the interactions between biotic and abiotic factors, while Environment focuses on the external conditions affecting life."
  },
  {
    id: 22,
    text: "In the context of the Epidemiologic Triad, the 'Agent' only refers to microbes like bacteria and viruses.",
    type: "TF",
    difficulty: "Hard",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The Agent is not just microbes, but also chemical, physical, and nutritional factors."
  },
  {
    id: 23,
    text: "Which of the following is an example of a 'Cue to Action' in the Health Belief Model?",
    type: "MCQ",
    difficulty: "Hard",
    options: ["Believing a disease is severe", "A reminder SMS for a vaccination", "Fearing the cost of treatment", "Knowing one is susceptible to a disease"],
    correctAnswer: "A reminder SMS for a vaccination",
    explanation: "Cues to Action are triggers that prompt someone to take action, such as a reminder SMS."
  },
  {
    id: 24,
    text: "'Community Medicine' applies biomedical concepts to an individual patient, while 'Clinical Medicine' applies them to a defined population.",
    type: "TF",
    difficulty: "Hard",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Clinical medicine applies concepts to an individual patient, while community medicine applies them to a defined population."
  }
];
