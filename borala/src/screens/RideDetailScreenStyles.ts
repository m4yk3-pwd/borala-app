import theme from '../theme/Theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFE8'
  },
  status: {
    marginTop: 4,
    color: theme.colors.textSecondary,
    fontSize: 13
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },

  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },

  backButton: {
    width: 38,
    height: 38,
    justifyContent: 'center'
  },

  headerTitle: {
    marginTop: 6,
    marginBottom: 28,
    color: theme.colors.textOnPrimary,
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.bold
  },

  routeContainer: {
    marginTop: 4
  },

  routeItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  originDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F45D22',
    marginRight: 14
  },

  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2DD36F',
    marginRight: 14
  },

  routeLine: {
    width: 2,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginLeft: 4,
    marginVertical: 4
  },

  routeText: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: theme.typography.fontFamily.bold
  },

  mainCard: {
    backgroundColor: '#F5EFE8',
    padding: 20
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.bold
  },

  driverName: {
    color: '#202020',
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold
  },

  driverRating: {
    marginTop: 2,
    color: '#8B8178',
    fontSize: 15
  },

  badge: {
    backgroundColor: '#FFF5EF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30
  },

  badgeText: {
    color: '#F45D22',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14
  },

  separator: {
    height: 1,
    backgroundColor: '#DDD4CB',
    marginVertical: 20
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18
  },

  smallCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED4'
  },

  smallTitle: {
    color: '#9A8E83',
    fontSize: 13,
    marginBottom: 8
  },

  smallValue: {
    color: '#222',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.bold
  },

  smallValueOrange: {
    marginTop: 3,
    color: '#F45D22',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.bold
  },

  vehicleCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED4',
    marginBottom: 16
  },

  vehicleText: {
    color: theme.colors.primary,
    fontSize: 17,
    fontFamily: theme.typography.fontFamily.bold
  },

  vehicleColor: {
    marginTop: 4,
    color: '#8B8178',
    fontSize: 14
  },

  button: {
    marginTop: 14,
    backgroundColor: '#F45D22',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.bold
  }
});
