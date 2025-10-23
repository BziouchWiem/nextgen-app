// components/dashboard/ToolCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  iconSource: any;
  title: string;
  description: string;
  backgroundColor?: string;
  onPress?: () => void;
};

export default function ToolCard({
  iconSource,
  title,
  description,
  backgroundColor = '#FFFFFF',
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {typeof iconSource === 'function' ? (
            React.createElement(iconSource, { width: 28, height: 28, fill: "#002E52" })
          ) : (
            <Image source={iconSource} style={styles.icon} />
          )}
          <View style={styles.arrowIcon}>
            <Text style={styles.arrow}>↗</Text>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 140,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  icon: {
    width: 28,
    height: 28,
  },
  arrowIcon: {
    backgroundColor: '#F3F4F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginTop: 4,
  },
});