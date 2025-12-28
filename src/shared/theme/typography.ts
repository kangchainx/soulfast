import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
  h2: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
  },
  h3: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: 16,
    lineHeight: 26,
  },
  caption: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  mono: {
    fontFamily: 'Courier', 
  },
  fancySubtitle: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#94A3B8',
  },
  // Functional/Cute Styles
  cuteH1: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 28,
  },
  cuteH2: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 22,
  },
  cuteH3: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 18,
  },
  cuteBody: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  cuteCaption: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#94A3B8',
  }
});
