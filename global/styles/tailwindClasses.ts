// Archivo de utilidades para gradientes y colores específicos de style objects
// Las clases de Tailwind ahora se usan directamente: className="text-main text-xl-custom"

// Gradientes (para usar con LinearGradient)
export const gradientColors = {
  background: ['rgb(21,3,52)', 'rgb(24,7,64)'],    // bgGradient1 -> bgGradient2
  button: ['#E21DF3', '#7B3BCC'],                  // btnGradient1 -> btnGradient2
} as const;

// Colores individuales para casos específicos (style objects)
export const colors = {
  gradientStart: 'rgb(21,3,52)',
  gradientEnd: 'rgb(24,7,64)', 
  btnStart: '#E21DF3',
  btnEnd: '#7B3BCC',
  bgThird: '#22244B',
  infoBlue: '#5043EC',
  mainText: '#ffffff',
  inputBorder: '#ffffff40',
  inputBg: '#ffffff20',
  debug: '#f00',
} as const;