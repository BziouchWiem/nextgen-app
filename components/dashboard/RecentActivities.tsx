// components/dashboard/RecentActivities.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Import SVG icons
import PomodoroSvg from '../../assets/images/Pomodoro.svg';
import FileFillSvg from '../../assets/images/file-fill.svg';

type Activity = {
  id: string;
  type: 'pomodoro' | 'document';
  title: string;
  subtitle: string;
  time: string;
  icon: any;
};

type Props = {
  activities?: Activity[];
  onViewAll?: () => void;
};

const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'pomodoro',
    title: 'Pomodoro (25 min)',
    subtitle: 'Terminé à 10:14',
    time: '10:14',
    icon: PomodoroSvg,
  },
  {
    id: '2',
    type: 'document',
    title: 'Doc "UX Research"',
    subtitle: 'Résumé hier à 16:30',
    time: 'hier',
    icon: FileFillSvg,
  },
];

export default function RecentActivities({ activities = defaultActivities, onViewAll }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dernières activités</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.arrow}>↗</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.activitiesList}>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              {typeof activity.icon === 'function' ? (
                React.createElement(activity.icon, { width: 20, height: 20, fill: "#002E52" })
              ) : (
                <Image source={activity.icon} style={styles.icon} />
              )}
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  arrow: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
  },
  activitiesList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});