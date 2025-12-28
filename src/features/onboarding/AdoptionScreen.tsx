import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../shared/theme/colors';
import { typography } from '../../shared/theme/typography';
import { useCompanionStore, BeastType } from '../companion/companion.store';
import { PawPrint, Star, Fire, CaretRight, CheckCircle } from 'phosphor-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type OnboardingStep = 'welcome' | 'instructions' | 'quiz' | 'result' | 'manual';

const QUESTIONS = [
  {
    text: "When facing a challenge, what is your greatest asset?",
    options: [
      { text: "Patience and inner calm", type: 'cat' },
      { text: "Unyielding strength of will", type: 'dragon' },
      { text: "Insight and careful reflection", type: 'fox' }
    ]
  },
  {
    text: "Which environment draws your spirit most?",
    options: [
      { text: "A sun-drenched valley", type: 'cat' },
      { text: "A storm-swept mountain peak", type: 'dragon' },
      { text: "A starlit autumn forest", type: 'fox' }
    ]
  },
  {
    text: "What do you hope to find through fasting?",
    options: [
      { text: "Holistic balance and health", type: 'cat' },
      { text: "Indomitable discipline", type: 'dragon' },
      { text: "Mental clarity and wisdom", type: 'fox' }
    ]
  }
];

export const AdoptionScreen = () => {
  const adoptBeast = useCompanionStore((state) => state.adoptBeast);
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [quizIndex, setQuizIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ cat: 0, dragon: 0, fox: 0 });
  const [assignedBeast, setAssignedBeast] = useState<BeastType | null>(null);

  // Animation values for staggered entry
  const anims = React.useRef({
    titleOpacity: new Animated.Value(0),
    titleSlide: new Animated.Value(30),
    subOpacity: new Animated.Value(0),
    subSlide: new Animated.Value(30),
    btnOpacity: new Animated.Value(0),
    btnSlide: new Animated.Value(30),
  }).current;

  React.useEffect(() => {
    if (step === 'welcome' || step === 'instructions') {
      const { titleOpacity, titleSlide, subOpacity, subSlide, btnOpacity, btnSlide } = anims;
      
      // Reset values
      titleOpacity.setValue(0);
      titleSlide.setValue(30);
      subOpacity.setValue(0);
      subSlide.setValue(30);
      btnOpacity.setValue(0);
      btnSlide.setValue(30);

      Animated.stagger(200, [
        Animated.parallel([
          Animated.timing(titleOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(titleSlide, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(subOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(subSlide, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(btnOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(btnSlide, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
      ]).start();
    }
  }, [step]);

  const nextStep = (next: OnboardingStep) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(next);
  };

  const handleQuizSelect = (type: string) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (quizIndex < QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      const result = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b) as BeastType;
      setAssignedBeast(result);
      nextStep('result');
    }
  };

  const renderWelcome = () => (
    <View style={styles.content}>
      <Animated.Text style={[
        typography.h1, 
        styles.title, 
        { opacity: anims.titleOpacity, transform: [{ translateY: anims.titleSlide }] }
      ]}>
        Welcome, Seeker
      </Animated.Text>
      
      <Animated.Text style={[
        typography.body, 
        styles.subtitle, 
        { opacity: anims.subOpacity, transform: [{ translateY: anims.subSlide }] }
      ]}>
        Your journey is about more than just time. It is about a bond formed in discipline.
      </Animated.Text>
      
      <Animated.View style={{ 
        opacity: anims.btnOpacity, 
        transform: [{ translateY: anims.btnSlide }],
        width: '100%' 
      }}>
        <Pressable style={styles.buttonPrimary} onPress={() => nextStep('instructions')}>
          <Text style={styles.buttonText}>Begin the Covenant</Text>
          <CaretRight size={20} color={colors.background} />
        </Pressable>
      </Animated.View>
    </View>
  );

  const renderInstructions = () => (
    <View style={styles.content}>
      <Animated.Text style={[
        typography.h1, 
        styles.title, 
        { opacity: anims.titleOpacity, transform: [{ translateY: anims.titleSlide }] }
      ]}>
        The Ritual of Insight
      </Animated.Text>
      
      <Animated.Text style={[
        typography.body, 
        styles.subtitle, 
        { opacity: anims.subOpacity, transform: [{ translateY: anims.subSlide }] }
      ]}>
        We will now ask three questions to reveal your inner spirit. This ritual will summon the Spirit Beast destined to guide your discipline.
      </Animated.Text>
      
      <Animated.View style={{ 
        opacity: anims.btnOpacity, 
        transform: [{ translateY: anims.btnSlide }],
        width: '100%' 
      }}>
        <Pressable style={styles.buttonPrimary} onPress={() => nextStep('quiz')}>
          <Text style={styles.buttonText}>Enter the Ritual</Text>
          <CaretRight size={20} color={colors.background} />
        </Pressable>
      </Animated.View>
    </View>
  );

  const renderQuiz = () => (
    <View style={styles.content}>
      <View style={styles.progressContainer}>
         <View style={[styles.progressFill, { width: `${((quizIndex + 1) / QUESTIONS.length) * 100}%` }]} />
      </View>
      <Text style={[typography.caption, styles.stepLabel]}>QUESTION {quizIndex + 1} OF 3</Text>
      <Text style={[typography.h2, styles.questionText]}>{QUESTIONS[quizIndex].text}</Text>
      <View style={styles.optionsList}>
        {QUESTIONS[quizIndex].options.map((opt, i) => (
          <Pressable key={i} style={styles.optionCard} onPress={() => handleQuizSelect(opt.type)}>
             <Text style={styles.optionText}>{opt.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderResult = () => (
    <View style={styles.content}>
      <Text style={[typography.caption, styles.stepLabel]}>YOUR DESTINED COMPANION</Text>
      <View style={styles.iconBig}>
          {assignedBeast === 'cat' && <Star size={80} color={colors.primary} weight="duotone" />}
          {assignedBeast === 'dragon' && <Fire size={80} color={colors.status.error} weight="duotone" />}
          {assignedBeast === 'fox' && <PawPrint size={80} color={colors.secondary} weight="duotone" />}
      </View>
      <Text style={[typography.h1, styles.resultTitle]}>
        Result: {assignedBeast === 'cat' ? 'Solar Cat' : assignedBeast === 'dragon' ? 'Nebula Dragon' : 'Spirit Fox'}
      </Text>
      <Text style={[typography.body, styles.resultDesc]}>
        Based on your spirit, this companion is most attuned to your path.
      </Text>
      
      <Pressable style={styles.buttonPrimary} onPress={() => adoptBeast(assignedBeast!)}>
        <Text style={styles.buttonText}>Accept the Bond</Text>
        <CheckCircle size={20} color={colors.background} weight="fill" />
      </Pressable>

      <Pressable style={styles.buttonGhost} onPress={() => nextStep('manual')}>
        <Text style={styles.ghostText}>Choose another path instead</Text>
      </Pressable>
    </View>
  );

  const renderManual = () => (
    <View style={styles.content}>
      <Text style={[typography.h2, styles.title]}>Choose Your Path</Text>
      <Text style={[typography.body, styles.subtitle]}>Every soul is unique. Select the Spirit Beast that calls to you.</Text>
      <View style={styles.manualOptions}>
        {(['cat', 'dragon', 'fox'] as BeastType[]).map((type) => (
           <Pressable key={type} style={styles.manualCard} onPress={() => adoptBeast(type)}>
              {type === 'cat' && <Star size={32} color={colors.primary} weight="duotone" />}
              {type === 'dragon' && <Fire size={32} color={colors.status.error} weight="duotone" />}
              {type === 'fox' && <PawPrint size={32} color={colors.secondary} weight="duotone" />}
              <Text style={styles.cardBeastText}>{type.toUpperCase()}</Text>
           </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {step === 'welcome' && renderWelcome()}
      {step === 'instructions' && renderInstructions()}
      {step === 'quiz' && renderQuiz()}
      {step === 'result' && renderResult()}
      {step === 'manual' && renderManual()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonText: {
    ...typography.h3,
    color: colors.background,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  stepLabel: {
    color: colors.text.muted,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  questionText: {
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 48,
  },
  optionsList: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  optionText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
  },
  iconBig: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultTitle: {
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  resultDesc: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonGhost: {
    marginTop: 24,
    alignItems: 'center',
  },
  ghostText: {
    color: colors.text.muted,
    textDecorationLine: 'underline',
  },
  manualOptions: {
    gap: 16,
  },
  manualCard: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  cardBeastText: {
    ...typography.h3,
    color: colors.text.primary,
  }
});
