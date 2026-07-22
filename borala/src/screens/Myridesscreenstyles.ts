import {StyleSheet} from 'react-native';
import theme from '../theme/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  header: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl
  },

  headerTitle: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.size.xl,
    fontFamily: theme.typography.fontFamily.bold
  },

  segmentContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    padding: theme.spacing.xs,
    ...theme.shadow.card
  },

  segmentButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    alignItems: 'center'
  },

  segmentButtonActive: {
    backgroundColor: theme.colors.accent
  },

  segmentText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.sm
  },

  segmentTextActive: {
    color: theme.colors.textOnAccent
  },

  scrollContent: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.lg
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadow.card
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  route: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md,
    marginRight: theme.spacing.sm
  },

  meta: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm,
    marginTop: theme.spacing.xs
  },

  metaOrange: {
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.sm,
    marginTop: theme.spacing.xs
  },

  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill
  },

  statusText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.xs
  },

  cancelButton: {
    marginTop: theme.spacing.md,
    alignSelf: 'flex-start'
  },

  cancelButtonText: {
    color: theme.colors.danger,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.sm
  },

  requestsContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  },

  emptyRequests: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm
  },

  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm
  },

  requestName: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.sm,
    flex: 1
  },

  requestActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm
  },

  rejectButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    backgroundColor: '#F7DCD8'
  },

  rejectButtonText: {
    color: theme.colors.danger,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.xs
  },

  approveButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accent
  },

  approveButtonText: {
    color: theme.colors.textOnAccent,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.xs
  }
});
