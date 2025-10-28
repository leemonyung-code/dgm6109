"use strict"

let vocabStudyData = [{
    date: "2025-10-01",
    method: "spaced repetition",
    studyTimeMin: 26, //Study time (min) 
    immediateRecall: 11, //Immediate recall (0-15)
    delayedRecall: 10, //Delayed recall (24h, 0-15)
    errorCount: 1, //Error count
    selfRatedConfidence: 7, //Self-rated confidence (0-10)
    retentionPercent: 0.91 // Retention (0-100%)
},// description of study of vocabs of that particular day
{
    date: "2025-10-02",
    method: "massed practice",
    studyTimeMin: 18,
    immediateRecall: 14,
    delayedRecall: 8,
    errorCount: 3,
    selfRatedConfidence: 7.5, //
    retentionPercent: 0.57
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-03",
    method: "elaborative encoding",
    studyTimeMin: 32,
    immediateRecall: 12,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.83
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-04",
    method: "mnemonic imagery",
    studyTimeMin: 27,
    immediateRecall: 13,
    delayedRecall: 11,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.85
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-05",
    method: "spaced repetition",
    studyTimeMin: 24,
    immediateRecall: 10,
    delayedRecall: 9,
    errorCount: 1,
    selfRatedConfidence: 7,
    retentionPercent: 0.9
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-06",
    method: "massed practice",
    studyTimeMin: 22,
    immediateRecall: 13,
    delayedRecall: 7,
    errorCount: 1,
    selfRatedConfidence: 7,
    retentionPercent: 0.54
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-07",
    method: "elaborative encoding",
    studyTimeMin: 30,
    immediateRecall: 11,
    delayedRecall: 10,
    errorCount: 2,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.91
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-08",
    method: "mnemonic imagery",
    studyTimeMin: 28,
    immediateRecall: 12,
    delayedRecall: 11,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.92
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-09",
    method: "spaced repetition",
    studyTimeMin: 25,
    immediateRecall: 11,
    delayedRecall: 10,
    errorCount: 0,
    selfRatedConfidence: 7,
    retentionPercent: 0.91
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-10",
    method: "massed practice",
    studyTimeMin: 19,
    immediateRecall: 14,
    delayedRecall: 9,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.64
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-11",
    method: "elaborative encoding",
    studyTimeMin: 33,
    immediateRecall: 13,
    delayedRecall: 11,
    errorCount: 2,
    selfRatedConfidence: 8,
    retentionPercent: 0.85
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-12",
    method: "mnemonic imagery",
    studyTimeMin: 27,
    immediateRecall: 12,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.83
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-13",
    method: "spaced repetition",
    studyTimeMin: 23,
    immediateRecall: 10,
    delayedRecall: 9,
    errorCount: 0,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.9
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-14",
    method: "massed practice",
    studyTimeMin: 21,
    immediateRecall: 13,
    delayedRecall: 8,
    errorCount: 3,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.62
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-15",
    method: "elaborative encoding",
    studyTimeMin: 29,
    immediateRecall: 12,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 8.5,
    retentionPercent: 0.83
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-16",
    method: "mnemonic imagery",
    studyTimeMin: 30,
    immediateRecall: 13,
    delayedRecall: 12,
    errorCount: 0,
    selfRatedConfidence: 7.2,
    retentionPercent: 0.92
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-17",
    method: "spaced repetition",
    studyTimeMin: 26,
    immediateRecall: 11,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.91
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-18",
    method: "massed practice",
    studyTimeMin: 19,
    immediateRecall: 14,
    delayedRecall: 8,
    errorCount: 2,
    selfRatedConfidence: 7,
    retentionPercent: 0.57
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-19",
    method: "elaborative encoding",
    studyTimeMin: 31,
    immediateRecall: 11,
    delayedRecall: 9,
    errorCount: 1,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.82
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-20",
    method: "mnemonic imagery",
    studyTimeMin: 29,
    immediateRecall: 12,
    delayedRecall: 11,
    errorCount: 0,
    selfRatedConfidence: 8,
    retentionPercent: 0.92
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-21",
    method: "spaced repetition",
    studyTimeMin: 24,
    immediateRecall: 10,
    delayedRecall: 9,
    errorCount: 1,
    selfRatedConfidence: 7,
    retentionPercent: 0.9
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-22",
    method: "massed practice",
    studyTimeMin: 20,
    immediateRecall: 13,
    delayedRecall: 7,
    errorCount: 2,
    selfRatedConfidence: 7,
    retentionPercent: 0.54
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-23",
    method: "elaborative encoding",
    studyTimeMin: 32,
    immediateRecall: 12,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.83
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-24",
    method: "mnemonic imagery",
    studyTimeMin: 28,
    immediateRecall: 13,
    delayedRecall: 12,
    errorCount: 1,
    selfRatedConfidence: 8,
    retentionPercent: 0.92
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-25",
    method: "spaced repetition",
    studyTimeMin: 24,
    immediateRecall: 11,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 7,
    retentionPercent: 0.91
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-26",
    method: "massed practice",
    studyTimeMin: 20,
    immediateRecall: 14,
    delayedRecall: 8,
    errorCount: 2,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.57
  },// description of study of vocabs of that particular day
  {
    date: "2025-10-27",
    method: "elaborative encoding",
    studyTimeMin: 31,
    immediateRecall: 12,
    delayedRecall: 10,
    errorCount: 1,
    selfRatedConfidence: 7.5,
    retentionPercent: 0.83
  }
];// list of vocabulary study sessions from OCT 1 to OCT 27

// console.log(JSON.stringify(vocabStudyData));
showData(vocabStudyData);