// theme.js
// Tema visual do Bora Lá — cores, tipografia, espaçamentos e sombras
// Extraído das telas de referência (home e detalhe da carona)

export const colors = {
  // Cor principal — header, avatares, textos de destaque
  primary: '#4A1030',        // vinho/bordô escuro (fundo do header)
  primaryLight: '#6B2049',   // variação mais clara (estados hover/pressed)

  // Cor de ação — botões, tags, item ativo do filtro
  accent: '#E8712E',         // laranja vibrante
  accentLight: '#FBD9B8',    // laranja bem claro — fundo da tag "Gratuita"
  accentSoft: '#F5C89A',     // tom intermediário

  // Fundo
  background: '#F3E9D8',     // creme/bege — fundo geral das telas
  surface: '#FFFFFF',        // branco — cards

  // Marcadores de rota (tela de detalhe da carona)
  routeOrigin: '#E8712E',      // laranja — ponto de origem
  routeDestination: '#3CB878', // verde — ponto de destino

  // Texto
  textPrimary: '#4A1030',    // títulos e valores importantes
  textSecondary: '#8B8378',  // texto de apoio (datas, labels)
  textOnPrimary: '#FFFFFF',  // texto sobre o header escuro
  textOnAccent: '#FFFFFF',   // texto sobre botões laranja

  // Feedback / estados
  success: '#3CB878',
  danger: '#D9483C',
  warning: '#E8A73C',

  border: '#EDE3D3',         // linhas sutis dentro dos cards
};

export const typography = {
  // Troque pela família de fonte que você instalar no projeto.
  // Poppins/Nunito combinam com o estilo arredondado das telas de referência.
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
  },
  size: {
    xs: 12,   // tags, legendas
    sm: 14,   // texto de apoio
    md: 16,   // corpo padrão
    lg: 18,   // títulos de card
    xl: 20,   // nome do usuário no header
    xxl: 24,  // títulos de tela
  },
  weight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 20,   // cards (Home, Detalhes da carona)
  xl: 24,   // header com cantos arredondados
  pill: 999, // botões e tags totalmente arredondados (Solicitar vaga, Gratuita)
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2, // Android
  },
};

const theme = { colors, typography, spacing, radius, shadow };
export default theme;

// Exemplo de uso num componente:
// import theme from './theme';
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.radius.lg,
//     padding: theme.spacing.lg,
//     ...theme.shadow.card,
//   },
//   title: {
//     color: theme.colors.textPrimary,
//     fontSize: theme.typography.size.lg,
//     fontFamily: theme.typography.fontFamily.bold,
//   },
// });