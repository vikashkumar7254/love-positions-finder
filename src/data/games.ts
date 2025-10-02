export interface TruthOrDareQuestion {
  id: string
  type: 'truth' | 'dare'
  question: string
  spicyLevel: 1 | 2 | 3 | 4 | 5
  category: string
}

export interface DiceAction {
  id: string
  action: string
  bodyPart: string
  duration: string
  spicyLevel: 1 | 2 | 3 | 4 | 5
}

export interface LongDistanceActivity {
  id: string
  title: string
  description: string
  instructions: string[]
  duration: string
  category: 'romantic' | 'playful' | 'intimate' | 'adventure'
}

export const truthQuestions: TruthOrDareQuestion[] = [
  // TRUTH QUESTIONS - Level 1 (Mild)
  {
    id: 't1',
    type: 'truth',
    question: 'What is your favorite thing about our relationship?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't2',
    type: 'truth',
    question: 'What is the most romantic thing I have ever done for you?',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 't3',
    type: 'truth',
    question: 'What is your favorite memory of us together?',
    spicyLevel: 1,
    category: 'Memories'
  },
  {
    id: 't4',
    type: 'truth',
    question: 'What is something you love about my personality?',
    spicyLevel: 1,
    category: 'Personality'
  },
  {
    id: 't5',
    type: 'truth',
    question: 'What is the sweetest thing I have ever said to you?',
    spicyLevel: 1,
    category: 'Romance'
  },

  // TRUTH QUESTIONS - Level 2 (Warm)
  {
    id: 't6',
    type: 'truth',
    question: 'What is something you find attractive about me that I might not know?',
    spicyLevel: 2,
    category: 'Attraction'
  },
  {
    id: 't7',
    type: 'truth',
    question: 'What is your favorite way to spend time with me?',
    spicyLevel: 2,
    category: 'Activities'
  },
  {
    id: 't8',
    type: 'truth',
    question: 'What is something you want to do together that we haven\'t done yet?',
    spicyLevel: 2,
    category: 'Future'
  },
  {
    id: 't9',
    type: 'truth',
    question: 'What is the most thoughtful thing I have ever done for you?',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 't10',
    type: 'truth',
    question: 'What is something about me that makes you feel loved?',
    spicyLevel: 2,
    category: 'Love'
  },

  // TRUTH QUESTIONS - Level 3 (Hot)
  {
    id: 't11',
    type: 'truth',
    question: 'What is your favorite physical feature of mine?',
    spicyLevel: 3,
    category: 'Physical'
  },
  {
    id: 't12',
    type: 'truth',
    question: 'What is something you find sexy about me?',
    spicyLevel: 3,
    category: 'Attraction'
  },
  {
    id: 't13',
    type: 'truth',
    question: 'What is the most intimate moment we have shared?',
    spicyLevel: 3,
    category: 'Intimacy'
  },
  {
    id: 't14',
    type: 'truth',
    question: 'What is something you want me to do more often?',
    spicyLevel: 3,
    category: 'Desires'
  },
  {
    id: 't15',
    type: 'truth',
    question: 'What is your favorite way I touch you?',
    spicyLevel: 3,
    category: 'Touch'
  },

  // TRUTH QUESTIONS - Level 4 (Steamy)
  {
    id: 't16',
    type: 'truth',
    question: 'What is the most passionate kiss we have ever shared?',
    spicyLevel: 4,
    category: 'Intimacy'
  },
  {
    id: 't17',
    type: 'truth',
    question: 'What is something you want to try with me in the bedroom?',
    spicyLevel: 4,
    category: 'Desires'
  },
  {
    id: 't18',
    type: 'truth',
    question: 'What is the most adventurous thing you want to try with me?',
    spicyLevel: 4,
    category: 'Adventure'
  },
  {
    id: 't19',
    type: 'truth',
    question: 'What is your secret desire that you have never told me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },
  {
    id: 't20',
    type: 'truth',
    question: 'What is the wildest place you have ever fantasized about being with me?',
    spicyLevel: 4,
    category: 'Fantasy'
  },

  // TRUTH QUESTIONS - Level 5 (Fire)
  {
    id: 't21',
    type: 'truth',
    question: 'What is your deepest, most intimate fantasy involving me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't22',
    type: 'truth',
    question: 'What is something you have always wanted to try but were too shy to ask?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't23',
    type: 'truth',
    question: 'What is the most passionate moment we have shared together?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't24',
    type: 'truth',
    question: 'What is your ultimate fantasy scenario with me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },

  // More Adult Truth Questions (Level 4-5)
  {
    id: 't25',
    type: 'truth',
    question: 'What is the most explicit thing you want me to do to you right now?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't26',
    type: 'truth',
    question: 'What is your dirtiest sexual fantasy involving me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't27',
    type: 'truth',
    question: 'What is the most intense orgasm you have ever had and how did it happen?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't28',
    type: 'truth',
    question: 'What is something you want me to do to you that you have never told anyone?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't29',
    type: 'truth',
    question: 'What is the most explicit position you want to try with me?',
    spicyLevel: 5,
    category: 'Preferences'
  },
  {
    id: 't30',
    type: 'truth',
    question: 'What is your biggest sexual turn-on that drives you absolutely wild?',
    spicyLevel: 5,
    category: 'Attraction'
  },
  {
    id: 't31',
    type: 'truth',
    question: 'What is the most intense foreplay you have ever experienced with me?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't32',
    type: 'truth',
    question: 'What is something you want me to whisper in your ear during intimate moments?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't33',
    type: 'truth',
    question: 'What is the most explicit thing you have ever fantasized about us doing?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't34',
    type: 'truth',
    question: 'What is your secret kink that you want to explore with me?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't35',
    type: 'truth',
    question: 'What is the most intense way you want me to touch you?',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 't36',
    type: 'truth',
    question: 'What is something you want me to do to you that would make you lose control?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't37',
    type: 'truth',
    question: 'What is the most explicit roleplay scenario you want to try with me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't38',
    type: 'truth',
    question: 'What is your biggest sexual desire that you have never told me before?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't39',
    type: 'truth',
    question: 'What is the most intense way you want me to pleasure you?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't40',
    type: 'truth',
    question: 'What is something you want me to do to you that would drive you absolutely crazy?',
    spicyLevel: 5,
    category: 'Desires'
  },

  // EXTREME LEVEL - Google Search Based (Level 5+)
  {
    id: 't41',
    type: 'truth',
    question: 'Have you ever fantasized about being intimate in a public place? If yes, where?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't42',
    type: 'truth',
    question: 'What is your deepest and most secret fantasy that you have never shared with anyone?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't43',
    type: 'truth',
    question: 'Have you ever thought about being intimate with someone else while in a relationship?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't44',
    type: 'truth',
    question: 'What was your most memorable and arousing experience ever?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't45',
    type: 'truth',
    question: 'Have you ever had intimate activities during a video call with someone?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't46',
    type: 'truth',
    question: 'What is your favorite roleplay scenario that you want to try with me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't47',
    type: 'truth',
    question: 'Have you ever been intimate with someone multiple times in the same day?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't48',
    type: 'truth',
    question: 'Have you ever used any special outfit or costume for intimate moments?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't49',
    type: 'truth',
    question: 'Have you ever used any toys or equipment during intimate moments?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't50',
    type: 'truth',
    question: 'What is your biggest sexual insecurity that you want me to help you overcome?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't51',
    type: 'truth',
    question: 'Have you ever dreamed about being intimate with a complete stranger?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't52',
    type: 'truth',
    question: 'What is your biggest taboo fantasy that you are too shy to admit?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't53',
    type: 'truth',
    question: 'Have you ever flirted with someone else while in a relationship with me?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't54',
    type: 'truth',
    question: 'What is the most extreme thing you have ever done for sexual pleasure?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't55',
    type: 'truth',
    question: 'Have you ever had a threesome fantasy involving me?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 't56',
    type: 'truth',
    question: 'What is the dirtiest thing you want me to say to you during intimate moments?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't57',
    type: 'truth',
    question: 'Have you ever recorded yourself doing something intimate?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't58',
    type: 'truth',
    question: 'What is your most extreme sexual desire that you have never told anyone?',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 't59',
    type: 'truth',
    question: 'Have you ever been intimate in a place where you could have been caught?',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 't60',
    type: 'truth',
    question: 'What is the most intense orgasm you have ever had and what caused it?',
    spicyLevel: 5,
    category: 'Intimacy'
  }
]

export const dareQuestions: TruthOrDareQuestion[] = [
  // DARE QUESTIONS - Level 1 (Mild)
  {
    id: 'd1',
    type: 'dare',
    question: 'Whisper three things you love about your partner in their ear',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd2',
    type: 'dare',
    question: 'Give your partner a gentle forehead kiss',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd3',
    type: 'dare',
    question: 'Hold hands and look into each other\'s eyes for 30 seconds',
    spicyLevel: 1,
    category: 'Intimacy'
  },
  {
    id: 'd4',
    type: 'dare',
    question: 'Give your partner a 30-second hug',
    spicyLevel: 1,
    category: 'Romance'
  },
  {
    id: 'd5',
    type: 'dare',
    question: 'Tell your partner what you find most attractive about them',
    spicyLevel: 1,
    category: 'Romance'
  },

  // DARE QUESTIONS - Level 2 (Warm)
  {
    id: 'd6',
    type: 'dare',
    question: 'Give your partner a gentle massage for 2 minutes',
    spicyLevel: 2,
    category: 'Touch'
  },
  {
    id: 'd7',
    type: 'dare',
    question: 'Dance together to a slow song',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 'd8',
    type: 'dare',
    question: 'Give your partner a passionate kiss',
    spicyLevel: 2,
    category: 'Intimacy'
  },
  {
    id: 'd9',
    type: 'dare',
    question: 'Tell your partner your favorite memory with them',
    spicyLevel: 2,
    category: 'Romance'
  },
  {
    id: 'd10',
    type: 'dare',
    question: 'Give your partner a back scratch for 2 minutes',
    spicyLevel: 2,
    category: 'Touch'
  },

  // DARE QUESTIONS - Level 3 (Hot)
  {
    id: 'd11',
    type: 'dare',
    question: 'Give your partner a sensual massage for 3 minutes',
    spicyLevel: 3,
    category: 'Touch'
  },
  {
    id: 'd12',
    type: 'dare',
    question: 'Kiss your partner\'s neck for 1 minute',
    spicyLevel: 3,
    category: 'Intimacy'
  },
  {
    id: 'd13',
    type: 'dare',
    question: 'Give your partner a lap dance',
    spicyLevel: 3,
    category: 'Performance'
  },
  {
    id: 'd14',
    type: 'dare',
    question: 'Whisper something sexy in your partner\'s ear',
    spicyLevel: 3,
    category: 'Intimacy'
  },
  {
    id: 'd15',
    type: 'dare',
    question: 'Give your partner a foot massage for 3 minutes',
    spicyLevel: 3,
    category: 'Touch'
  },

  // DARE QUESTIONS - Level 4 (Steamy)
  {
    id: 'd16',
    type: 'dare',
    question: 'Give your partner a full body massage for 5 minutes',
    spicyLevel: 4,
    category: 'Touch'
  },
  {
    id: 'd17',
    type: 'dare',
    question: 'Kiss your partner passionately for 2 minutes',
    spicyLevel: 4,
    category: 'Intimacy'
  },
  {
    id: 'd18',
    type: 'dare',
    question: 'Give your partner a sensual striptease',
    spicyLevel: 4,
    category: 'Performance'
  },
  {
    id: 'd19',
    type: 'dare',
    question: 'Explore your partner\'s body with gentle touches for 3 minutes',
    spicyLevel: 4,
    category: 'Touch'
  },
  {
    id: 'd20',
    type: 'dare',
    question: 'Give your partner a passionate kiss while touching them sensually',
    spicyLevel: 4,
    category: 'Intimacy'
  },

  // DARE QUESTIONS - Level 5 (Fire)
  {
    id: 'd21',
    type: 'dare',
    question: 'Act out your partner\'s favorite fantasy for 5 minutes',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd22',
    type: 'dare',
    question: 'Give your partner a full body massage with complete focus',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd23',
    type: 'dare',
    question: 'Explore your partner\'s body with feathers or silk for 3 minutes',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'd24',
    type: 'dare',
    question: 'Fulfill one of your partner\'s whispered desires right now',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'd25',
    type: 'dare',
    question: 'Create an intimate moment that your partner will never forget',
    spicyLevel: 5,
    category: 'Intimacy'
  },

  // More Adult Dare Questions (Level 4-5)
  {
    id: 'd26',
    type: 'dare',
    question: 'Give your partner a sensual striptease while maintaining eye contact',
    spicyLevel: 4,
    category: 'Performance'
  },
  {
    id: 'd27',
    type: 'dare',
    question: 'Use ice cubes to create thrilling sensations on your partner\'s body',
    spicyLevel: 4,
    category: 'Sensual'
  },
  {
    id: 'd28',
    type: 'dare',
    question: 'Blindfold your partner and explore their body with your hands and mouth',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd29',
    type: 'dare',
    question: 'Give your partner a passionate massage using warming oils',
    spicyLevel: 4,
    category: 'Touch'
  },
  {
    id: 'd30',
    type: 'dare',
    question: 'Use silk scarves for gentle restraint and sensual stimulation',
    spicyLevel: 4,
    category: 'Sensual'
  },
  {
    id: 'd31',
    type: 'dare',
    question: 'Whisper your wildest fantasy in your partner\'s ear while touching them',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'd32',
    type: 'dare',
    question: 'Give your partner a sensual lap dance with intimate contact',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd33',
    type: 'dare',
    question: 'Use your mouth to create intense pleasure on your partner\'s sensitive areas',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd34',
    type: 'dare',
    question: 'Create anticipation with teasing touches and whispered desires',
    spicyLevel: 4,
    category: 'Sensual'
  },
  {
    id: 'd35',
    type: 'dare',
    question: 'Use feather ticklers for sensual stimulation all over your partner\'s body',
    spicyLevel: 4,
    category: 'Sensual'
  },
  {
    id: 'd36',
    type: 'dare',
    question: 'Give your partner a passionate kiss while exploring their body with your hands',
    spicyLevel: 4,
    category: 'Intimacy'
  },
  {
    id: 'd37',
    type: 'dare',
    question: 'Use warming gels for an intense sensual experience on your partner',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd38',
    type: 'dare',
    question: 'Create a sensual atmosphere with candlelight and give a full body massage',
    spicyLevel: 4,
    category: 'Touch'
  },
  {
    id: 'd39',
    type: 'dare',
    question: 'Explore your partner\'s erogenous zones with slow, deliberate touches',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd40',
    type: 'dare',
    question: 'Fulfill one of your partner\'s secret desires that they have never told you',
    spicyLevel: 5,
    category: 'Fantasy'
  },

  // Brutal & Direct Dare Questions (Level 5+)
  {
    id: 'd41',
    type: 'dare',
    question: 'Remove your clothes slowly while maintaining intense eye contact',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd42',
    type: 'dare',
    question: 'Let your partner undress you completely while you stand still',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd43',
    type: 'dare',
    question: 'Give your partner a lap dance wearing only underwear',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd44',
    type: 'dare',
    question: 'Strip down to your bra and panties and dance seductively',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd45',
    type: 'dare',
    question: 'Let your partner touch you anywhere they want for 2 minutes',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd46',
    type: 'dare',
    question: 'Take off your partner\'s clothes with your teeth',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd47',
    type: 'dare',
    question: 'Give your partner a sensual massage while completely naked',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd48',
    type: 'dare',
    question: 'Let your partner kiss you anywhere on your body for 3 minutes',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd49',
    type: 'dare',
    question: 'Strip down to nothing and pose for your partner for 1 minute',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd50',
    type: 'dare',
    question: 'Give your partner a full body massage while both of you are naked',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd51',
    type: 'dare',
    question: 'Let your partner undress you and then kiss every inch of your body',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd52',
    type: 'dare',
    question: 'Give your partner a striptease and end up completely naked',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd53',
    type: 'dare',
    question: 'Let your partner explore your body with their hands and mouth for 5 minutes',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd54',
    type: 'dare',
    question: 'Take a shower together and wash each other\'s bodies sensually',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd55',
    type: 'dare',
    question: 'Give your partner a lap dance and let them touch you anywhere',
    spicyLevel: 5,
    category: 'Performance'
  },

  // EXTREME LEVEL - Google Search Based (Level 5+)
  {
    id: 'd56',
    type: 'dare',
    question: 'Perform a sexy striptease dance in front of your partner',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd57',
    type: 'dare',
    question: 'Blindfold your partner and kiss and touch them for one minute',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd58',
    type: 'dare',
    question: 'Record a sexy message for your partner and send it to them',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd59',
    type: 'dare',
    question: 'Have a sexy photoshoot with your partner',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd60',
    type: 'dare',
    question: 'Create a sexy video with your partner',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd61',
    type: 'dare',
    question: 'Play a sexy game with your partner',
    spicyLevel: 5,
    category: 'Playful'
  },
  {
    id: 'd62',
    type: 'dare',
    question: 'Write a sexy story with your partner and read it aloud',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'd63',
    type: 'dare',
    question: 'Watch a sexy movie with your partner',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd64',
    type: 'dare',
    question: 'Perform a sexy dance with your partner',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd65',
    type: 'dare',
    question: 'Give your partner a sexy massage for 10 minutes',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd66',
    type: 'dare',
    question: 'Let your partner undress you completely while you stand still',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd67',
    type: 'dare',
    question: 'Give your partner a sensual massage while both naked',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd68',
    type: 'dare',
    question: 'Let your partner kiss you anywhere on your body for 5 minutes',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd69',
    type: 'dare',
    question: 'Strip down to nothing and pose for your partner for 2 minutes',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd70',
    type: 'dare',
    question: 'Give your partner a full body massage while both naked',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd71',
    type: 'dare',
    question: 'Let your partner undress you and kiss every inch of your body',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd72',
    type: 'dare',
    question: 'Give your partner a striptease and end up completely naked',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd73',
    type: 'dare',
    question: 'Let your partner explore your body with their hands and mouth for 10 minutes',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd74',
    type: 'dare',
    question: 'Take a shower together and wash each other\'s bodies sensually',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd75',
    type: 'dare',
    question: 'Give your partner a lap dance and let them touch you anywhere',
    spicyLevel: 5,
    category: 'Performance'
  },
  {
    id: 'd76',
    type: 'dare',
    question: 'Use your mouth to create intense pleasure on your partner\'s sensitive areas',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd77',
    type: 'dare',
    question: 'Create anticipation with teasing touches and whispered desires',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'd78',
    type: 'dare',
    question: 'Use warming gels for an intense sensual experience on your partner',
    spicyLevel: 5,
    category: 'Touch'
  },
  {
    id: 'd79',
    type: 'dare',
    question: 'Explore your partner\'s erogenous zones with slow, deliberate touches',
    spicyLevel: 5,
    category: 'Intimacy'
  },
  {
    id: 'd80',
    type: 'dare',
    question: 'Fulfill one of your partner\'s secret desires that they have never told you',
    spicyLevel: 5,
    category: 'Fantasy'
  }
]

export const diceActions: DiceAction[] = [
  // Gentle & Romantic (Level 1)
  {
    id: 'dice1',
    action: 'Gently stroke your partner\'s hair while looking into their eyes',
    bodyPart: 'Hair',
    duration: '1-2 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice2',
    action: 'Give a tender massage to relieve tension',
    bodyPart: 'Shoulders',
    duration: '2-3 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice3',
    action: 'Caress your partner\'s face with gentle fingertips',
    bodyPart: 'Face',
    duration: '1 minute',
    spicyLevel: 1
  },
  {
    id: 'dice4',
    action: 'Hold hands and share three things you love about them',
    bodyPart: 'Hands',
    duration: '2-3 minutes',
    spicyLevel: 1
  },
  {
    id: 'dice5',
    action: 'Give a gentle back scratch',
    bodyPart: 'Back',
    duration: '2-3 minutes',
    spicyLevel: 1
  },

  // Playful & Flirty (Level 2)
  {
    id: 'dice6',
    action: 'Give a playful foot massage',
    bodyPart: 'Feet',
    duration: '3-4 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice7',
    action: 'Kiss your partner\'s neck gently',
    bodyPart: 'Neck',
    duration: '1-2 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice8',
    action: 'Give a sensual shoulder massage',
    bodyPart: 'Shoulders',
    duration: '3-5 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice9',
    action: 'Hold your partner close and sway to music',
    bodyPart: 'Whole body',
    duration: '2-3 minutes',
    spicyLevel: 2
  },
  {
    id: 'dice10',
    action: 'Give a gentle arm massage',
    bodyPart: 'Arms',
    duration: '2-3 minutes',
    spicyLevel: 2
  },

  // Sensual & Intimate (Level 3)
  {
    id: 'dice11',
    action: 'Give a passionate kiss while touching their face',
    bodyPart: 'Lips & Face',
    duration: '2-3 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice12',
    action: 'Massage your partner\'s lower back sensually',
    bodyPart: 'Lower back',
    duration: '3-5 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice13',
    action: 'Give a sensual neck and shoulder massage',
    bodyPart: 'Neck & Shoulders',
    duration: '4-6 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice14',
    action: 'Kiss and caress your partner\'s hands',
    bodyPart: 'Hands',
    duration: '2-3 minutes',
    spicyLevel: 3
  },
  {
    id: 'dice15',
    action: 'Give a gentle full body massage',
    bodyPart: 'Full body',
    duration: '5-8 minutes',
    spicyLevel: 3
  },

  // Passionate & Steamy (Level 4)
  {
    id: 'dice16',
    action: 'Give a passionate massage with warming oils',
    bodyPart: 'Full body',
    duration: '8-12 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice17',
    action: 'Kiss your partner passionately while exploring their body',
    bodyPart: 'Lips & Body',
    duration: '3-5 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice18',
    action: 'Give a sensual massage focusing on erogenous zones',
    bodyPart: 'Erogenous zones',
    duration: '5-8 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice19',
    action: 'Use your hands to explore and tease sensitive areas',
    bodyPart: 'Sensitive areas',
    duration: '4-6 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice20',
    action: 'Give a passionate kiss while touching intimate areas',
    bodyPart: 'Lips & Intimate areas',
    duration: '3-5 minutes',
    spicyLevel: 4
  },

  // Intense & Wild (Level 5)
  {
    id: 'dice21',
    action: 'Give an intense full body massage with complete focus',
    bodyPart: 'Full body',
    duration: '10-15 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice22',
    action: 'Use your mouth to create intense pleasure',
    bodyPart: 'Sensitive areas',
    duration: '5-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice23',
    action: 'Explore your partner\'s body with passionate intensity',
    bodyPart: 'Entire body',
    duration: '8-12 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice24',
    action: 'Give a sensual massage while maintaining intense eye contact',
    bodyPart: 'Full body',
    duration: '6-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice25',
    action: 'Use your hands and mouth to create maximum pleasure',
    bodyPart: 'Intimate areas',
    duration: '5-8 minutes',
    spicyLevel: 5
  },

  // More Adult & Spicy Content (Level 4-5)
  {
    id: 'dice26',
    action: 'Use your tongue to trace patterns on sensitive skin',
    bodyPart: 'Inner thighs',
    duration: '2-3 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice27',
    action: 'Give a sensual striptease while maintaining eye contact',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice28',
    action: 'Use temperature play with ice and warm breath',
    bodyPart: 'Neck & Chest',
    duration: '2-4 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice29',
    action: 'Explore with your hands while blindfolded',
    bodyPart: 'Intimate areas',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice30',
    action: 'Use massage oils for sensual body exploration',
    bodyPart: 'Full body',
    duration: '5-10 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice31',
    action: 'Create anticipation with teasing touches and whispers',
    bodyPart: 'Erogenous zones',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice32',
    action: 'Use silk scarves for gentle restraint and sensation',
    bodyPart: 'Wrists & Ankles',
    duration: '4-6 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice33',
    action: 'Give a passionate massage focusing on pressure points',
    bodyPart: 'Back & Shoulders',
    duration: '5-8 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice34',
    action: 'Use your mouth to create intense pleasure',
    bodyPart: 'Sensitive areas',
    duration: '3-7 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice35',
    action: 'Explore each other\'s fantasies with dirty talk',
    bodyPart: 'Mind & Body',
    duration: '2-4 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice36',
    action: 'Use feather ticklers for sensual stimulation',
    bodyPart: 'Entire body',
    duration: '3-5 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice37',
    action: 'Create a sensual atmosphere with candlelight massage',
    bodyPart: 'Full body',
    duration: '10-15 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice38',
    action: 'Use your hands to explore and tease erogenous zones',
    bodyPart: 'Intimate areas',
    duration: '4-6 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice39',
    action: 'Give a passionate kiss while exploring with hands',
    bodyPart: 'Lips & Body',
    duration: '2-4 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice40',
    action: 'Use warming gels for intense sensual experience',
    bodyPart: 'Sensitive zones',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice41',
    action: 'Create anticipation with slow, deliberate foreplay',
    bodyPart: 'Erogenous zones',
    duration: '5-8 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice42',
    action: 'Use your breath to create goosebumps and arousal',
    bodyPart: 'Spine & Neck',
    duration: '2-3 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice43',
    action: 'Give a sensual lap dance with intimate contact',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice44',
    action: 'Use ice cubes and warm mouth for temperature play',
    bodyPart: 'Chest & Neck',
    duration: '2-4 minutes',
    spicyLevel: 4
  },
  {
    id: 'dice45',
    action: 'Explore with passionate intensity and complete focus',
    bodyPart: 'Intimate areas',
    duration: '5-10 minutes',
    spicyLevel: 5
  },

  // Brutal & Direct Dice Actions (Level 5+)
  {
    id: 'dice46',
    action: 'Remove all clothes and give a sensual striptease',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice47',
    action: 'Let your partner undress you completely with their hands',
    bodyPart: 'Whole body',
    duration: '2-3 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice48',
    action: 'Give a lap dance wearing only underwear',
    bodyPart: 'Whole body',
    duration: '3-4 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice49',
    action: 'Strip down to bra and panties and dance seductively',
    bodyPart: 'Whole body',
    duration: '2-3 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice50',
    action: 'Let your partner touch you anywhere they want',
    bodyPart: 'Entire body',
    duration: '2-3 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice51',
    action: 'Take off your partner\'s clothes with your teeth',
    bodyPart: 'Clothing',
    duration: '2-4 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice52',
    action: 'Give a sensual massage while completely naked',
    bodyPart: 'Full body',
    duration: '5-8 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice53',
    action: 'Let your partner kiss you anywhere on your body',
    bodyPart: 'Entire body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice54',
    action: 'Strip down to nothing and pose for your partner',
    bodyPart: 'Whole body',
    duration: '1-2 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice55',
    action: 'Give a full body massage while both naked',
    bodyPart: 'Full body',
    duration: '8-12 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice56',
    action: 'Let your partner undress you and kiss every inch',
    bodyPart: 'Entire body',
    duration: '5-8 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice57',
    action: 'Give a striptease ending up completely naked',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice58',
    action: 'Let your partner explore with hands and mouth',
    bodyPart: 'Intimate areas',
    duration: '5-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice59',
    action: 'Take a shower together and wash each other',
    bodyPart: 'Full body',
    duration: '10-15 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice60',
    action: 'Give a lap dance and let them touch anywhere',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },

  // EXTREME LEVEL - Google Search Based (Level 5+)
  {
    id: 'dice61',
    action: 'Perform a sexy striptease dance in front of your partner',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice62',
    action: 'Blindfold your partner and kiss and touch them sensually',
    bodyPart: 'Entire body',
    duration: '2-3 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice63',
    action: 'Record a sexy message for your partner and send it',
    bodyPart: 'Voice & Body',
    duration: '1-2 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice64',
    action: 'Have a sexy photoshoot with your partner',
    bodyPart: 'Whole body',
    duration: '5-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice65',
    action: 'Create a sexy video with your partner',
    bodyPart: 'Whole body',
    duration: '5-15 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice66',
    action: 'Play a sexy game with your partner',
    bodyPart: 'Mind & Body',
    duration: '10-20 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice67',
    action: 'Write a sexy story with your partner and read it aloud',
    bodyPart: 'Mind & Voice',
    duration: '5-10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice68',
    action: 'Watch a sexy movie with your partner',
    bodyPart: 'Eyes & Mind',
    duration: '30-60 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice69',
    action: 'Perform a sexy dance with your partner',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice70',
    action: 'Give your partner a sexy massage for 10 minutes',
    bodyPart: 'Full body',
    duration: '10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice71',
    action: 'Let your partner undress you completely while you stand still',
    bodyPart: 'Whole body',
    duration: '2-3 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice72',
    action: 'Give your partner a sensual massage while both naked',
    bodyPart: 'Full body',
    duration: '8-12 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice73',
    action: 'Let your partner kiss you anywhere on your body for 5 minutes',
    bodyPart: 'Entire body',
    duration: '5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice74',
    action: 'Strip down to nothing and pose for your partner for 2 minutes',
    bodyPart: 'Whole body',
    duration: '2 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice75',
    action: 'Give your partner a full body massage while both naked',
    bodyPart: 'Full body',
    duration: '10-15 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice76',
    action: 'Let your partner undress you and kiss every inch of your body',
    bodyPart: 'Entire body',
    duration: '8-12 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice77',
    action: 'Give your partner a striptease and end up completely naked',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice78',
    action: 'Let your partner explore your body with their hands and mouth for 10 minutes',
    bodyPart: 'Intimate areas',
    duration: '10 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice79',
    action: 'Take a shower together and wash each other\'s bodies sensually',
    bodyPart: 'Full body',
    duration: '15-20 minutes',
    spicyLevel: 5
  },
  {
    id: 'dice80',
    action: 'Give your partner a lap dance and let them touch you anywhere',
    bodyPart: 'Whole body',
    duration: '3-5 minutes',
    spicyLevel: 5
  }
]

export const longDistanceActivities: LongDistanceActivity[] = [
  {
    id: 'ld1',
    title: 'Virtual Date Night',
    description: 'Create a romantic atmosphere even when apart',
    instructions: [
      'Both partners prepare the same meal',
      'Set up video call with romantic lighting',
      'Eat together while sharing conversation',
      'End with a virtual slow dance'
    ],
    duration: '2-3 hours',
    category: 'romantic'
  },
  {
    id: 'ld2',
    title: 'Sensual Photo Exchange',
    description: 'Share intimate photos to keep the spark alive',
    instructions: [
      'Take tasteful, romantic photos',
      'Share them at a special time',
      'Express what you love about each photo',
      'Keep the conversation intimate and loving'
    ],
    duration: '30-45 minutes',
    category: 'intimate'
  },
  {
    id: 'ld3',
    title: 'Virtual Movie Night',
    description: 'Watch a romantic movie together while apart',
    instructions: [
      'Choose a romantic movie both want to watch',
      'Start the movie at the same time',
      'Use video call to see each other\'s reactions',
      'Discuss the movie during breaks'
    ],
    duration: '2-3 hours',
    category: 'romantic'
  },
  {
    id: 'ld4',
    title: 'Love Letter Writing',
    description: 'Write heartfelt letters to each other',
    instructions: [
      'Set aside time to write detailed letters',
      'Share memories, dreams, and desires',
      'Mail physical letters or read them over video call',
      'Keep the letters as keepsakes'
    ],
    duration: '1-2 hours',
    category: 'romantic'
  },
  {
    id: 'ld5',
    title: 'Virtual Game Night',
    description: 'Play intimate games together online',
    instructions: [
      'Choose truth or dare, 20 questions, or similar games',
      'Use video call to see reactions',
      'Make it romantic and playful',
      'End with sweet goodnight messages'
    ],
    duration: '1-2 hours',
    category: 'playful'
  },
  {
    id: 'ld6',
    title: 'Surprise Delivery',
    description: 'Send surprise gifts to each other',
    instructions: [
      'Order something special for your partner',
      'Coordinate delivery times',
      'Video call when packages arrive',
      'Share the joy of receiving surprises'
    ],
    duration: '30 minutes + delivery time',
    category: 'romantic'
  },
  {
    id: 'ld7',
    title: 'Virtual Cooking Class',
    description: 'Learn to cook a romantic meal together',
    instructions: [
      'Find an online cooking class',
      'Both prepare the same ingredients',
      'Cook together via video call',
      'Enjoy the meal together virtually'
    ],
    duration: '2-3 hours',
    category: 'romantic'
  },
  {
    id: 'ld8',
    title: 'Intimate Voice Messages',
    description: 'Send voice messages expressing your feelings',
    instructions: [
      'Record heartfelt voice messages',
      'Share memories and future dreams',
      'Send at special times of day',
      'Keep the messages as audio keepsakes'
    ],
    duration: '20-30 minutes',
    category: 'intimate'
  },
  {
    id: 'ld9',
    title: 'Virtual Stargazing',
    description: 'Look at the stars together while apart',
    instructions: [
      'Find a clear night sky',
      'Video call while looking at stars',
      'Share constellations and stories',
      'Make wishes on shooting stars together'
    ],
    duration: '1-2 hours',
    category: 'romantic'
  },
  {
    id: 'ld10',
    title: 'Future Planning Session',
    description: 'Plan your next visit and future together',
    instructions: [
      'Discuss when you\'ll see each other next',
      'Plan activities for your reunion',
      'Share dreams and goals',
      'Create a countdown to your next meeting'
    ],
    duration: '1-2 hours',
    category: 'romantic'
  },

  // EXTREME LEVEL - Google Search Based
  {
    id: 'ld11',
    title: 'Virtual Intimate Session',
    description: 'Have an intimate video call session with your partner',
    instructions: [
      'Set up a private video call',
      'Create a romantic atmosphere with lighting',
      'Engage in intimate activities together',
      'Share your deepest desires and fantasies'
    ],
    duration: '30-60 minutes',
    category: 'intimate'
  },
  {
    id: 'ld12',
    title: 'Sexy Photo Exchange',
    description: 'Exchange intimate photos to keep the spark alive',
    instructions: [
      'Take tasteful intimate photos',
      'Share them at a special time',
      'Express what you love about each photo',
      'Keep the conversation intimate and loving'
    ],
    duration: '20-30 minutes',
    category: 'intimate'
  },
  {
    id: 'ld13',
    title: 'Erotic Story Writing',
    description: 'Write erotic stories together and share them',
    instructions: [
      'Write intimate stories about each other',
      'Share them during video calls',
      'Act out parts of the stories',
      'Create a collection of your stories'
    ],
    duration: '1-2 hours',
    category: 'intimate'
  },
  {
    id: 'ld14',
    title: 'Virtual Roleplay Session',
    description: 'Engage in roleplay scenarios over video call',
    instructions: [
      'Choose a roleplay scenario together',
      'Dress up in costumes',
      'Act out the scenario over video call',
      'Discuss what you enjoyed most'
    ],
    duration: '45-60 minutes',
    category: 'playful'
  },
  {
    id: 'ld15',
    title: 'Sexy Video Messages',
    description: 'Send each other intimate video messages',
    instructions: [
      'Record intimate video messages',
      'Send them at special times',
      'Respond to each other\'s messages',
      'Keep the videos private and secure'
    ],
    duration: '15-30 minutes',
    category: 'intimate'
  },
  {
    id: 'ld16',
    title: 'Virtual Massage Session',
    description: 'Guide each other through virtual massage sessions',
    instructions: [
      'Set up video call with good lighting',
      'Guide each other through massage techniques',
      'Use oils and lotions',
      'Focus on relaxation and intimacy'
    ],
    duration: '30-45 minutes',
    category: 'intimate'
  },
  {
    id: 'ld17',
    title: 'Fantasy Discussion Night',
    description: 'Discuss your wildest fantasies together',
    instructions: [
      'Create a comfortable atmosphere',
      'Take turns sharing fantasies',
      'Be open and non-judgmental',
      'Plan how to fulfill some fantasies when together'
    ],
    duration: '1-2 hours',
    category: 'intimate'
  },
  {
    id: 'ld18',
    title: 'Virtual Date Night - Intimate',
    description: 'Have a romantic and intimate virtual date',
    instructions: [
      'Both dress up nicely',
      'Set up romantic lighting and music',
      'Have dinner together over video call',
      'End with intimate conversation and activities'
    ],
    duration: '2-3 hours',
    category: 'romantic'
  },
  {
    id: 'ld19',
    title: 'Sexy Game Night',
    description: 'Play intimate games together over video call',
    instructions: [
      'Choose intimate games to play',
      'Use video call to see reactions',
      'Make it romantic and playful',
      'End with sweet goodnight messages'
    ],
    duration: '1-2 hours',
    category: 'playful'
  },
  {
    id: 'ld20',
    title: 'Virtual Shower Together',
    description: 'Take a shower together over video call',
    instructions: [
      'Set up waterproof phone/tablet holder',
      'Take a shower at the same time',
      'Talk and interact while showering',
      'Make it romantic and intimate'
    ],
    duration: '20-30 minutes',
    category: 'intimate'
  }
]

// Helper functions
export const getRandomTruthQuestion = (spicyLevel?: number): TruthOrDareQuestion => {
  const filtered = spicyLevel 
    ? truthQuestions.filter(q => q.spicyLevel === spicyLevel)
    : truthQuestions
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getRandomDareQuestion = (spicyLevel?: number): TruthOrDareQuestion => {
  const filtered = spicyLevel 
    ? dareQuestions.filter(q => q.spicyLevel === spicyLevel)
    : dareQuestions
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getRandomDiceAction = (spicyLevel?: number): DiceAction => {
  const filtered = spicyLevel 
    ? diceActions.filter(a => a.spicyLevel === spicyLevel)
    : diceActions
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getRandomLongDistanceActivity = (): LongDistanceActivity => {
  return longDistanceActivities[Math.floor(Math.random() * longDistanceActivities.length)]
}

// FANTASY ROLEPLAY SCENARIOS - Extreme Level
export const fantasyRoleplayScenarios = [
  {
    id: 'fr1',
    title: 'Seductive Stranger',
    description: 'You meet a mysterious stranger in a bar and sparks fly instantly',
    scenario: 'You are at a dimly lit bar when a gorgeous stranger catches your eye. They approach you with confidence and start a conversation that quickly turns flirtatious.',
    characters: ['Mysterious Stranger', 'Bar Patron'],
    setting: 'Dimly lit bar with soft music',
    duration: '20-60 minutes',
    spicyLevel: 5,
    category: 'Adventure'
  },
  {
    id: 'fr2',
    title: 'Forbidden Office Romance',
    description: 'A steamy encounter with your attractive colleague after hours',
    scenario: 'You and your attractive colleague are working late. The office is empty, and tension has been building between you all day.',
    characters: ['Colleague', 'Office Worker'],
    setting: 'Empty office building at night',
    duration: '30-45 minutes',
    spicyLevel: 5,
    category: 'Forbidden'
  },
  {
    id: 'fr3',
    title: 'Doctor & Patient',
    description: 'A sensual medical examination that turns intimate',
    scenario: 'You are a doctor giving a routine checkup to an attractive patient. The examination becomes more intimate than expected.',
    characters: ['Doctor', 'Patient'],
    setting: 'Private medical office',
    duration: '25-40 minutes',
    spicyLevel: 5,
    category: 'Authority'
  },
  {
    id: 'fr4',
    title: 'Teacher & Student',
    description: 'A forbidden romance between teacher and student',
    scenario: 'You are a teacher giving private tutoring to an attractive student. The lesson becomes more than just academic.',
    characters: ['Teacher', 'Student'],
    setting: 'Private study room',
    duration: '30-50 minutes',
    spicyLevel: 5,
    category: 'Forbidden'
  },
  {
    id: 'fr5',
    title: 'Boss & Employee',
    description: 'A steamy encounter with your attractive boss',
    scenario: 'You are alone in the office with your attractive boss. Work discussion turns into something much more intimate.',
    characters: ['Boss', 'Employee'],
    setting: 'Executive office',
    duration: '25-45 minutes',
    spicyLevel: 5,
    category: 'Authority'
  },
  {
    id: 'fr6',
    title: 'Neighbor Next Door',
    description: 'A passionate encounter with your attractive neighbor',
    scenario: 'You accidentally see your attractive neighbor through their window. They notice you watching and invite you over.',
    characters: ['Neighbor', 'Observer'],
    setting: 'Neighbor\'s apartment',
    duration: '20-40 minutes',
    spicyLevel: 5,
    category: 'Voyeur'
  },
  {
    id: 'fr7',
    title: 'Masseuse & Client',
    description: 'A sensual massage that becomes much more intimate',
    scenario: 'You are getting a massage from an attractive masseuse. The massage becomes more sensual and intimate than expected.',
    characters: ['Masseuse', 'Client'],
    setting: 'Spa massage room',
    duration: '30-60 minutes',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'fr8',
    title: 'Stranger on a Train',
    description: 'A passionate encounter with a stranger during a long train journey',
    scenario: 'You are on a long train journey when an attractive stranger sits next to you. Conversation leads to something more intimate.',
    characters: ['Train Passenger', 'Stranger'],
    setting: 'Private train compartment',
    duration: '25-45 minutes',
    spicyLevel: 5,
    category: 'Adventure'
  },
  {
    id: 'fr9',
    title: 'Hotel Room Service',
    description: 'A steamy encounter with room service that becomes intimate',
    scenario: 'You order room service and an attractive person delivers it. One thing leads to another.',
    characters: ['Hotel Guest', 'Room Service'],
    setting: 'Hotel room',
    duration: '20-35 minutes',
    spicyLevel: 5,
    category: 'Service'
  },
  {
    id: 'fr10',
    title: 'Pool Party Encounter',
    description: 'A passionate encounter at a pool party',
    scenario: 'You are at a pool party when you meet an attractive person. You find a private spot to get to know each other better.',
    characters: ['Pool Party Guest', 'Attractive Stranger'],
    setting: 'Private pool area',
    duration: '25-40 minutes',
    spicyLevel: 5,
    category: 'Public'
  }
]

// SEDUCTIVE CONVERSATION STARTERS - Extreme Level
export const seductiveConversationStarters = [
  {
    id: 'sc1',
    question: 'What is the most forbidden fantasy you have ever had?',
    followUp: 'Tell me every detail about how you would act it out.',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'sc2',
    question: 'If you could have sex anywhere in the world, where would it be?',
    followUp: 'What would make that location so special for you?',
    spicyLevel: 5,
    category: 'Location'
  },
  {
    id: 'sc3',
    question: 'What is the dirtiest thing you want me to do to you right now?',
    followUp: 'Describe exactly how you want me to do it.',
    spicyLevel: 5,
    category: 'Desires'
  },
  {
    id: 'sc4',
    question: 'Have you ever fantasized about being watched while having sex?',
    followUp: 'Who would you want to watch us?',
    spicyLevel: 5,
    category: 'Voyeur'
  },
  {
    id: 'sc5',
    question: 'What is your biggest sexual secret that you have never told anyone?',
    followUp: 'Why have you kept it a secret for so long?',
    spicyLevel: 5,
    category: 'Secrets'
  },
  {
    id: 'sc6',
    question: 'If you could have a threesome with anyone, who would it be?',
    followUp: 'What would you want to do with them?',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'sc7',
    question: 'What is the most intense orgasm you have ever had?',
    followUp: 'What exactly caused it and how did it feel?',
    spicyLevel: 5,
    category: 'Experience'
  },
  {
    id: 'sc8',
    question: 'Have you ever had sex in a public place?',
    followUp: 'Where was it and what made it so exciting?',
    spicyLevel: 5,
    category: 'Adventure'
  },
  {
    id: 'sc9',
    question: 'What is your wildest sexual fantasy involving me?',
    followUp: 'Describe every detail of how you want it to happen.',
    spicyLevel: 5,
    category: 'Fantasy'
  },
  {
    id: 'sc10',
    question: 'What is the most extreme thing you have ever done for sexual pleasure?',
    followUp: 'Would you do it again? Why or why not?',
    spicyLevel: 5,
    category: 'Experience'
  }
]

// PLEASURE MAP TECHNIQUES - Extreme Level
export const pleasureMapTechniques = [
  {
    id: 'pm1',
    technique: 'Erogenous Zone Discovery',
    description: 'Systematically explore every inch of your partner\'s body to find hidden pleasure spots',
    instructions: [
      'Start with gentle touches on non-intimate areas',
      'Use different pressures and textures',
      'Watch for physical reactions and responses',
      'Map out each sensitive area you discover',
      'Test different techniques on each spot'
    ],
    duration: '15-30 minutes',
    spicyLevel: 5,
    category: 'Discovery'
  },
  {
    id: 'pm2',
    technique: 'Temperature Play Mapping',
    description: 'Use hot and cold sensations to create intense pleasure responses',
    instructions: [
      'Use ice cubes on different body parts',
      'Try warm oil or heated massage stones',
      'Alternate between hot and cold sensations',
      'Focus on areas that respond most intensely',
      'Create patterns of temperature changes'
    ],
    duration: '20-40 minutes',
    spicyLevel: 5,
    category: 'Sensation'
  },
  {
    id: 'pm3',
    technique: 'Pressure Point Pleasure',
    description: 'Apply different pressures to discover the perfect touch for each area',
    instructions: [
      'Start with very light touches',
      'Gradually increase pressure',
      'Try circular motions, tapping, and stroking',
      'Find the perfect pressure for each spot',
      'Create a map of pressure preferences'
    ],
    duration: '25-45 minutes',
    spicyLevel: 5,
    category: 'Technique'
  },
  {
    id: 'pm4',
    technique: 'Sensory Overload Discovery',
    description: 'Use multiple senses simultaneously to create intense pleasure',
    instructions: [
      'Combine touch, taste, smell, and sound',
      'Use scented oils and lotions',
      'Play with different textures and materials',
      'Create a multi-sensory experience',
      'Map which combinations work best'
    ],
    duration: '30-60 minutes',
    spicyLevel: 5,
    category: 'Sensation'
  },
  {
    id: 'pm5',
    technique: 'Intimate Zone Exploration',
    description: 'Carefully explore the most sensitive and intimate areas',
    instructions: [
      'Use only your hands and mouth',
      'Start with the most sensitive areas',
      'Use different techniques for each zone',
      'Pay attention to every response',
      'Create a detailed pleasure map'
    ],
    duration: '20-35 minutes',
    spicyLevel: 5,
    category: 'Intimate'
  }
]

// EXTREME POSITION CARDS - For Scratch Position Game
export const extremePositionCards = [
  {
    id: 'ep1',
    name: 'The Forbidden Encounter',
    description: 'A passionate position that requires complete trust and flexibility',
    instructions: [
      'Partner A sits on the edge of a surface',
      'Partner B stands facing them',
      'Wrap legs around Partner B\'s waist',
      'Use hands for support and balance',
      'Maintain eye contact throughout'
    ],
    difficulty: 'Advanced',
    duration: '15-30 minutes',
    spicyLevel: 5,
    category: 'Intimate'
  },
  {
    id: 'ep2',
    name: 'The Sensual Surprise',
    description: 'A position that builds anticipation and creates intense pleasure',
    instructions: [
      'Partner A lies on their back',
      'Partner B kneels between their legs',
      'Use hands to explore and tease',
      'Build anticipation slowly',
      'Focus on pleasure and connection'
    ],
    difficulty: 'Intermediate',
    duration: '20-40 minutes',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'ep3',
    name: 'The Intimate Dance',
    description: 'A position that combines movement with deep connection',
    instructions: [
      'Both partners stand facing each other',
      'Hold each other close',
      'Move together in a slow, sensual dance',
      'Let the movement guide you',
      'Focus on the connection between you'
    ],
    difficulty: 'Intermediate',
    duration: '15-25 minutes',
    spicyLevel: 5,
    category: 'Romantic'
  },
  {
    id: 'ep4',
    name: 'The Passionate Embrace',
    description: 'A position that emphasizes closeness and intimacy',
    instructions: [
      'Partner A sits with legs spread',
      'Partner B sits between their legs',
      'Face each other and embrace',
      'Use hands to explore each other',
      'Maintain close physical contact'
    ],
    difficulty: 'Beginner',
    duration: '10-20 minutes',
    spicyLevel: 5,
    category: 'Intimate'
  },
  {
    id: 'ep5',
    name: 'The Wild Adventure',
    description: 'A position that requires creativity and open-mindedness',
    instructions: [
      'Choose a location that excites you both',
      'Be creative with your positioning',
      'Focus on pleasure and exploration',
      'Let your instincts guide you',
      'Enjoy the adventure together'
    ],
    difficulty: 'Advanced',
    duration: '25-45 minutes',
    spicyLevel: 5,
    category: 'Adventure'
  }
]

// EXTREME RANDOM POSITIONS - For Random Position Game
export const extremeRandomPositions = [
  {
    id: 'erp1',
    name: 'The Midnight Seduction',
    description: 'A passionate encounter that begins with whispered secrets and ends with intense pleasure',
    instructions: 'Start by whispering your deepest desires in your partner\'s ear, then let passion take over',
    spicyLevel: 5,
    category: 'Romantic'
  },
  {
    id: 'erp2',
    name: 'The Forbidden Touch',
    description: 'Explore each other\'s bodies with blindfolds and restraints for maximum sensation',
    instructions: 'Blindfold your partner and use only your hands and mouth to create intense pleasure',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'erp3',
    name: 'The Wild Encounter',
    description: 'A spontaneous and passionate position that requires complete trust',
    instructions: 'Let your instincts guide you and explore each other without any preconceived notions',
    spicyLevel: 5,
    category: 'Adventure'
  },
  {
    id: 'erp4',
    name: 'The Intimate Connection',
    description: 'A position that focuses on emotional and physical connection',
    instructions: 'Face each other and maintain eye contact while exploring each other\'s bodies',
    spicyLevel: 5,
    category: 'Intimate'
  },
  {
    id: 'erp5',
    name: 'The Sensual Surprise',
    description: 'A position that builds anticipation and creates intense pleasure',
    instructions: 'Take turns surprising each other with unexpected touches and movements',
    spicyLevel: 5,
    category: 'Playful'
  }
]

// EXTREME HONEYMOON ACTIVITIES
export const extremeHoneymoonActivities = [
  {
    id: 'eha1',
    title: 'Midnight Beach Encounter',
    description: 'A passionate encounter on a secluded beach under the stars',
    instructions: [
      'Find a secluded beach spot',
      'Bring a blanket and some wine',
      'Watch the sunset together',
      'Let the romantic atmosphere guide you',
      'Enjoy the privacy and intimacy'
    ],
    duration: '2-3 hours',
    spicyLevel: 5,
    category: 'Romantic'
  },
  {
    id: 'eha2',
    title: 'Hotel Room Seduction',
    description: 'Create an intimate atmosphere in your hotel room',
    instructions: [
      'Set up romantic lighting',
      'Play soft music',
      'Use scented candles',
      'Take your time exploring each other',
      'Focus on pleasure and connection'
    ],
    duration: '1-2 hours',
    spicyLevel: 5,
    category: 'Intimate'
  },
  {
    id: 'eha3',
    title: 'Spa Sensual Massage',
    description: 'Give each other sensual massages in your hotel room',
    instructions: [
      'Use warming massage oils',
      'Take turns giving massages',
      'Focus on relaxation and pleasure',
      'Use different techniques and pressures',
      'Let the massage lead to more intimate activities'
    ],
    duration: '45-90 minutes',
    spicyLevel: 5,
    category: 'Sensual'
  },
  {
    id: 'eha4',
    title: 'Balcony Intimacy',
    description: 'A passionate encounter on your hotel balcony',
    instructions: [
      'Wait until it\'s dark and private',
      'Bring a blanket or towel',
      'Enjoy the view and each other',
      'Be careful not to be seen',
      'Let the excitement of the location enhance your experience'
    ],
    duration: '30-60 minutes',
    spicyLevel: 5,
    category: 'Adventure'
  },
  {
    id: 'eha5',
    title: 'Room Service Seduction',
    description: 'Turn room service into a sensual experience',
    instructions: [
      'Order something special for dinner',
      'Dress up for each other',
      'Feed each other sensually',
      'Let the meal become foreplay',
      'Enjoy the intimacy of your private space'
    ],
    duration: '1-2 hours',
    spicyLevel: 5,
    category: 'Romantic'
  }
]

// EXTREME FIRST NIGHT ACTIVITIES
export const extremeFirstNightActivities = [
  {
    id: 'efna1',
    title: 'The Perfect First Night',
    description: 'Create the perfect atmosphere for your first intimate night together',
    instructions: [
      'Set up romantic lighting with candles',
      'Play soft, romantic music',
      'Use scented oils or lotions',
      'Take your time and don\'t rush',
      'Focus on comfort and communication'
    ],
    duration: '2-4 hours',
    spicyLevel: 5,
    category: 'Romantic'
  },
  {
    id: 'efna2',
    title: 'Sensual Discovery',
    description: 'Explore each other\'s bodies and discover what feels good',
    instructions: [
      'Start with gentle touches and kisses',
      'Communicate about what feels good',
      'Take turns exploring each other',
      'Don\'t be afraid to ask questions',
      'Focus on pleasure and connection'
    ],
    duration: '1-3 hours',
    spicyLevel: 5,
    category: 'Discovery'
  },
  {
    id: 'efna3',
    title: 'Intimate Communication',
    description: 'Share your desires and fantasies with each other',
    instructions: [
      'Create a comfortable, private space',
      'Take turns sharing your thoughts',
      'Be open and honest about your feelings',
      'Listen without judgment',
      'Use this time to build trust and intimacy'
    ],
    duration: '30-60 minutes',
    spicyLevel: 5,
    category: 'Communication'
  },
  {
    id: 'efna4',
    title: 'Romantic Bath Together',
    description: 'Share a romantic bath and create intimate moments',
    instructions: [
      'Fill the tub with warm water and bubbles',
      'Add some scented oils or bath salts',
      'Take turns washing each other',
      'Use this time for gentle exploration',
      'Enjoy the intimacy and relaxation'
    ],
    duration: '45-90 minutes',
    spicyLevel: 5,
    category: 'Romantic'
  },
  {
    id: 'efna5',
    title: 'Bedroom Seduction',
    description: 'Create a seductive atmosphere in your bedroom',
    instructions: [
      'Set up soft, romantic lighting',
      'Use comfortable, sensual bedding',
      'Play music that makes you both feel good',
      'Take your time with foreplay',
      'Focus on pleasure and satisfaction'
    ],
    duration: '1-2 hours',
    spicyLevel: 5,
    category: 'Intimate'
  }
]

// EXTREME DICE COMBINATIONS - For Dice to Spice Game
export const extremeDiceCombinations = [
  {
    id: 'edc1',
    action: 'Passionate Kiss',
    bodyPart: 'Lips',
    description: 'Give your partner a deep, passionate kiss that leaves them breathless',
    spicyLevel: 5,
    duration: '2-5 minutes'
  },
  {
    id: 'edc2',
    action: 'Sensual Massage',
    bodyPart: 'Full Body',
    description: 'Give your partner a full body massage using warming oils',
    spicyLevel: 5,
    duration: '15-30 minutes'
  },
  {
    id: 'edc3',
    action: 'Intimate Exploration',
    bodyPart: 'Intimate Areas',
    description: 'Explore your partner\'s most sensitive areas with your hands and mouth',
    spicyLevel: 5,
    duration: '10-20 minutes'
  },
  {
    id: 'edc4',
    action: 'Passionate Embrace',
    bodyPart: 'Entire Body',
    description: 'Hold your partner close and let passion take over',
    spicyLevel: 5,
    duration: '5-15 minutes'
  },
  {
    id: 'edc5',
    action: 'Sensual Dance',
    bodyPart: 'Whole Body',
    description: 'Dance sensually with your partner to romantic music',
    spicyLevel: 5,
    duration: '10-20 minutes'
  }
]

// Combined exports for Truth or Dare game
export const truthOrDareQuestions: TruthOrDareQuestion[] = [
  ...truthQuestions,
  ...dareQuestions
]

export const getRandomTruthOrDare = (spicyLevel?: number): TruthOrDareQuestion => {
  const filtered = spicyLevel 
    ? truthOrDareQuestions.filter(q => q.spicyLevel === spicyLevel)
    : truthOrDareQuestions
  return filtered[Math.floor(Math.random() * filtered.length)]
}

// Games array for AllGames component
export const games = [
  {
    id: 'random-position',
    title: 'Random Position',
    description: 'Get instant random position suggestions with a single click',
    icon: 'Shuffle',
    path: '/games/random-position',
    color: 'text-romantic',
    bgColor: 'bg-romantic/10',
    borderColor: 'border-romantic/20'
  },
  {
    id: 'spin-for-desire',
    title: 'Spin for Desire',
    description: 'Spin to pick a playful prompt or fantasy',
    icon: 'Sparkles',
    path: '/games/spin-for-desire',
    color: 'text-passionate',
    bgColor: 'bg-passionate/10',
    borderColor: 'border-passionate/20'
  },
  {
    id: 'custom-poster',
    title: 'Custom Poster',
    description: 'Design your own collection of favorite positions',
    icon: 'Palette',
    path: '/positions/custom-poster',
    color: 'text-tender',
    bgColor: 'bg-tender/10',
    borderColor: 'border-tender/20'
  },
  {
    id: 'passion-dice',
    title: 'Passion Dice',
    description: 'Roll for pleasure! Each combination reveals a steamy action',
    icon: 'Dice1',
    path: '/games/passion-dice',
    color: 'text-romantic',
    bgColor: 'bg-romantic/10',
    borderColor: 'border-romantic/20'
  },
  {
    id: 'honeymoon-bucket-list',
    title: 'Honeymoon Bucket List',
    description: 'A sweet checklist of romantic honeymoon ideas',
    icon: 'Heart',
    path: '/games/honeymoon-bucket-list',
    color: 'text-passionate',
    bgColor: 'bg-passionate/10',
    borderColor: 'border-passionate/20'
  },
  {
    id: 'first-night-bucket-list',
    title: 'First Night Bucket List',
    description: 'Gentle and memorable ideas for your special night',
    icon: 'Sparkles',
    path: '/games/first-night-bucket-list',
    color: 'text-tender',
    bgColor: 'bg-tender/10',
    borderColor: 'border-tender/20'
  },
  {
    id: 'scratch-position',
    title: 'Scratch Position',
    description: 'Get a random intimate position to try right now',
    icon: 'Shuffle',
    path: '/games/scratch-position',
    color: 'text-romantic',
    bgColor: 'bg-romantic/10',
    borderColor: 'border-romantic/20'
  },
  {
    id: 'dice-to-spice',
    title: 'Dice to Spice',
    description: 'Roll two dice for exciting combinations! One shows actions, the other body parts',
    icon: 'Dice6',
    path: '/games/dice-to-spice',
    color: 'text-passionate',
    bgColor: 'bg-passionate/10',
    borderColor: 'border-passionate/20'
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    description: 'Classic game with romantic and intimate questions and dares',
    icon: 'MessageCircle',
    path: '/games/truth-or-dare',
    color: 'text-tender',
    bgColor: 'bg-tender/10',
    borderColor: 'border-tender/20'
  },
  {
    id: 'long-distance',
    title: 'Long Distance',
    description: 'Special activities for couples who are apart',
    icon: 'Map',
    path: '/games/long-distance',
    color: 'text-romantic',
    bgColor: 'bg-romantic/10',
    borderColor: 'border-romantic/20'
  }
]