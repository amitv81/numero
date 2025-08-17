// Function to count occurrences of a number in the grid
const countNumberOccurrences = (numbers, targetNumber) => {
  return numbers.reduce(
    (count, num) => (num === targetNumber ? count + 1 : count),
    0
  );
};

// Function to check if a number is missing from the grid
const isNumberMissing = (numbers, targetNumber) => {
  return !numbers.includes(targetNumber);
};

const calculateYogs = (numbers) => {
  // Count occurrences of numbers 4, 5 and 9
  const count1 = countNumberOccurrences(numbers, 1);
  const count2 = countNumberOccurrences(numbers, 2);
  const count3 = countNumberOccurrences(numbers, 3);
  const count4 = countNumberOccurrences(numbers, 4);
  const count5 = countNumberOccurrences(numbers, 5);
  const count6 = countNumberOccurrences(numbers, 6);
  const count7 = countNumberOccurrences(numbers, 7);
  const count8 = countNumberOccurrences(numbers, 8);
  const count9 = countNumberOccurrences(numbers, 9);

  // Check if numbers are missing
  const is1Missing = isNumberMissing(numbers, 1);
  const is2Missing = isNumberMissing(numbers, 2);
  const is3Missing = isNumberMissing(numbers, 3);
  const is4Missing = isNumberMissing(numbers, 4);
  const is5Missing = isNumberMissing(numbers, 5);
  const is6Missing = isNumberMissing(numbers, 6);
  const is7Missing = isNumberMissing(numbers, 7);
  const is8Missing = isNumberMissing(numbers, 8);
  const is9Missing = isNumberMissing(numbers, 9);

  const yogs = [];

  // Bandhan Yog: Either (Single 9 and single 4, and 5 missing) OR (Single 5 and single 4, and 9 missing)
  if (
    (count4 === 1 && count9 === 1 && is5Missing) ||
    (count5 === 1 && count4 === 1 && is9Missing)
  ) {
    yogs.push({
      name: "Bandhan Yog",
      description: [
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Loose Bandhan Yog: Multiple 4 (even frequency) and single/multiple 9, and 5 must be missing OR (Single 5 and even frequency of 4, and 9 must be missing)
  if (
    (count4 > 1 && count4 % 2 === 0 && count9 >= 1 && is5Missing) ||
    (count5 === 1 && count4 % 2 === 0 && is9Missing)
  ) {
    yogs.push({
      name: "Loose Bandhan Yog",
      description: [
        "The problem will be reduced",
        "The person will be able to recover from illness",
        "Will get bail easily",
        "----------------------------------------",
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Strong Bandhan Yog: Multiple 9 and single 4, and 5 must be missing
  if (count9 > 1 && count4 === 1 && is5Missing) {
    yogs.push({
      name: "Strong Bandhan Yog(99,4,Missing(5))",
      description: [
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Accident Yog: Single 8 and single 4, and 2 must be missing
  if (count8 === 1 && count4 === 1 && is2Missing) {
    yogs.push({
      name: "Accident Yog(8,4,Missing(2))",
      description: [
        "Makes native accident-prone",
        "The native behaves irrationally",
        "This combination is great for research and if natives have this combination in their birth chart, they will do very well in research-related vocationCannot control their speech",
        "Married life is generally problematic",
        "The Natives with this combination build air castles, and most of their plans and talks will be in the air",
      ],
    });
  }

  // Chatur Yog: Single 9 and single 5, and missing 4
  if (count9 === 1 && count5 === 1 && is4Missing) {
    yogs.push({
      name: "Chatur Yog(9,5,Missing(4))",
      description: [
        "The native is extremely sharp-minded and street-smart",
        "They are very clever and will always be looking to make money",
        "Straight-forward and blunt in what they say",
        "They will never give you a loss",
      ],
    });
  }
  // Mha Chatur Yog: Single 9 and multiple 5, and missing 4
  if (count9 === 1 && count5 > 1 && is4Missing) {
    yogs.push({
      name: "Mha Chatur Yog(9,55,Missing(4))",
      description: [
        "The native is very clever and will always be looking to make money",
        "May cheat others",
        "Might commit financial fraud",
        "Very very sharp mind as multiple brains are active at a given point",
      ],
    });
  }
  // Buddhu Yog: Double 9 and single 5, and missing 4
  if (count9 > 1 && count5 == 1 && is4Missing) {
    yogs.push({
      name: "Buddhu Yog(99,5,Missing(4))",
      description: [
        "Slow mind person/Dumb person",
        "Will remain confused",
        "Will not be great at studies",
      ],
    });
  }
  // Confusion Yog: Double 9 and double 5, and missing 4
  if (count9 > 1 && count5 > 1 && is4Missing) {
    yogs.push({
      name: "Confusion Yog(99,55,Missing(4))",
      description: [
        "The speed of mercury will at times be slow and at times fast",
        "The person will be confused as both fast and slow minds will work together",
      ],
    });
  }
  // Emotionless Love Yog: Single 7 and single 5, and missing 6
  if (count7 === 1 && count5 === 1 && is6Missing) {
    yogs.push({
      name: "Emotionless Love(7,5,Missing(6))",
      description: [
        "Native has the possibility of multiple love affairs",
        "No emotions in love, or we can say it is plastic love and plastic beauty",
        "Good communication skills",
        "Interest in the occult science",
        "Combination for becoming a model",
      ],
    });
  }
  // Anger Yog: Single/multiple 1 and single 9, and missing 3
  if (count1 >= 1 && count9 === 1 && is3Missing) {
    yogs.push({
      name: "Anger Yog(1,9,Missing(3))",
      description: [
        "These natives always remain angry",
        "These people generally pursue post-graduation and are learned like Engineers, Surgeons etc",
        "They like to work independently",
      ],
    });
  }
  // Gyan Yog: Single 3 and single 1, and missing 9
  if (count3 === 1 && count1 === 1 && is9Missing) {
    yogs.push({
      name: "Gyan Yog(3,1,Missing(9))",
      description: [
        "Natives with this combination are highly learned and pursue higher education",
        "fame in professional life",
        "Professional success only after hard work",
        "They are always respected due to their wisdom and knowledge",
        "They will rise high in life",
        "Counsellors, consultants, teachers, and professionals where speech is important will help",
      ],
    });
  }
  // Depressive Yog: Single/double 2 and single 8, and missing 4
  if (count2 >= 1 && count8 === 1 && is4Missing) {
    yogs.push({
      name: "Depressive Yog(2,8,Missing(4))",
      description: [
        "The native suffers from an inferiority complex",
        "Depressive nature",
      ],
    });
  }
  // Flirt Yog: Single 6 and single/multiple 7, and missing 5
  if (count6 === 1 && count7 >= 1 && is5Missing) {
    yogs.push({
      name: "Flirt Yog(1,7,Missing(5))",
      description: [
        "These people are very attractive",
        "possibility of many love interests",
        "Have multiple and stable love affairs(Single 7)",
        "Instability in love affairs (Multiple 7)",
        "Music and Art lovers",
        "Would like to flirt and behave like a playboy",
      ],
    });
  }
  // Kalakar Yog: Single 6 and single/multiple 2, and missing 3
  if (count6 === 1 && count2 >= 1 && is3Missing) {
    yogs.push({
      name: "Kalakar Yog(6,2,Missing(3))",
      description: [
        "Natives with this combination are generally Media personalities, artistic in nature",
        "These people are easily attracted to the opposite sex",
      ],
    });
  }
  // Quarrel Yog: Multiple 6 and single 2, and missing 3
  if (count6 >= 2 && count2 === 1 && is3Missing) {
    yogs.push({
      name: "Quarrel Yog(6,2,Missing(3))",
      description: [
        "Always fighting, especially with the opposite sex",
        "They become foul mouth and the use of expletives(rude or swear words) and slang in their communication increases",
        "They would be the ones who would start the quarrel",
      ],
    });
  }
  // Education Yog: Single 3, Single 6 and Single 2
  if (count3 === 1 && count6 === 1 && count2 === 1) {
    yogs.push({
      name: "Education Yog(3,6,2)",
      description: [
        "breaks/herdals in education",
        "good for education and teaching",
        "very intelegent",
        "good counsler",
        "good negociatory and mnuplator",
        "good communication",
        "marketing people",
        "hardworking and successful in life",
        "skin diseases, ear related diseases",
        "don't like to marriage, if married then devoted to spiritual so bad married life",
        "disturbed period/ sperm count related issues ",
      ],
    });
  }
  // Luck Yog: Single 1 and single 7, and missing 8
  if (count1 === 1 && count7 === 1 && is8Missing) {
    yogs.push({
      name: "Luck Yog(1,7,Missing(8))",
      description: [
        "Number one and seven both are Lucky",
        "Early Job or Earning in life",
        "Govt job at a young age or someone in the family working in govt",
        "Loyal in love",
      ],
    });
  }
  // Valk Siddhi: Single 1 and single 7, and single 8
  if (count1 === 1 && count7 === 1 && count8 === 1) {
    yogs.push({
      name: "Valk Siddhi Yog(1,7,8)",
      description: [
        "Valk Siddh - will happen what they said",
        "good in aucled since",
        "very good 6th sense and intuition power",
        "multiple source of income",
        "Get respect from society",
        "they help other but others will not help them (nki kar daria main dal)",
        "if get hearted by any one then other person will auto get hearted by many times by some one",
        "very hard worker",
        "they will never ask for help from others",
        "they will never stop till they become perfect in there learnings/work/output",
        "bed discomfort - sleep, sex related",
        "abroad/inter travel/transfer",
        "good in research",
        "idealistic nature/with good followers",
      ],
    });
  }
  // Roller Coaster Yog: Single 2, Single 8 and single 4
  if (count2 === 1 && count8 === 1 && count4 === 1) {
    yogs.push({
      name: "Roller Coaster Yog(2,8,4)",
      description: [
        "The native will experience a lot of ups and downs in life.",
        "Rises high and falls also",
        "These people can speak anything anywhere –whatever, whenever, wherever",
        "Married life is troubled",
        "Chronic disease",
      ],
    });
  }
  // Success Yog: Single 1, Single 2 and missing 3 and missing 6
  if (count1 === 1 && count2 === 1 && is6Missing && is3Missing) {
    yogs.push({
      name: "Success Yog(1,2,Missing(3,6))",
      description: [
        "These natives rise very high in life and hold high positions",
        "they will be either at the senior management level where a lot of people are working under them",
        "they become politicians",
        "These people also enjoy high financial status",
      ],
    });
  }
  // Success Yog: Single 3, Single 1 and Single 9
  if (count3 === 1 && count1 === 1 && count9 === 1) {
    yogs.push({
      name: "Success Yog(3,1,9)",
      description: [
        "The native rises high in life or dominates everywhere",
        "These are male numbers and if present in the female chart, she will display manly qualities – tomboy, in behaviour and appearance as well",
        "Good professional",
        "Leadership/admin quality",
        "Bold decision",
        "Spark in life",
        "Passionate",
        "Imaginative",
        "will do whatever they think",
        "hardworking and successful in life",
      ],
    });
  }
  // Luxury Yog: Single 6, Single 7 and Single 5
  if (count6 >= 1 && count7 >= 1 && count5 >= 1) {
    yogs.push({
      name: "Luxury Yog(6,7,5)",
      description: [
        "Enjoy all luxuries in life throughout, whether self-funded or otherwise",
        "Beautiful/handsome/attractive",
        "Business-minded",
        "Love Marriage",
        "Materialistic/matlabi",
        "Interest in music and arts",
        "Good money management",
        "True lovers",
        "may have extra marital affair",
        "counsellors and consultants",
        "Prone to disputes and will have a harsh tone(66)",
        "in-stable life(77)",
        "Sharp mind(55)",
      ],
    });
  }

  // Spirituality Yog: Single 3, Single 7 and Single 9
  if (count3 >= 1 && count7 >= 1 && count9 >= 1) {
    yogs.push({
      name: "Spirituality Yog(3,7,9)",
      description: [
        "Native is said to have very high intuition power",
        "It is also said that the person will not be satisfied in their physical relationships",
        "Social service",
        "This is the spirituality plane",
      ],
    });
  }

  // Success Yog: Single 3, Single 7 and Single 4
  if (count3 >= 1 && count7 >= 1 && count4 >= 1) {
    yogs.push({
      name: "Success Yog(3,7,4)",
      description: [
        "Always got top position and success",
        "easily manage money related problem in there life",
        "they are good business related consultant",
        "arrogant",
        "addiction of any thing",
      ],
    });
  }

  // Kamar Tord Yog: Single 9, Single 5 and Single 4
  if (count9 == 1 && count5 == 1 && count4 == 1) {
    yogs.push({
      name: "Kamar Tord Yog(9,5,4)",
      description: [
        "Full fill there dreams by hook or by crook",
        "Hospital ke chakkr (choli daman ka stah)",
        "Dispute with family members",
        "Black and white coat ka chakr rhega",
        "Property related issues (may be with family members)",
        "Chances of litigation are too much and may jail",
      ],
    });
  }
  // Sadhu Yog: Single 9, Single 7 and Single 2
  if (count9 === 1 && count7 === 1 && count2 === 1) {
    yogs.push({
      name: "Sadhu Yog(9,7,2)",
      description: [
        "Very good reserchers",
        "urine/joint pain related health issues",
        "live life away from there family/Family life disturb",
        "good patience",
      ],
    });
  }

  return yogs;
};

export { calculateYogs };
