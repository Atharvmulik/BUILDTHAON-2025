// screens/HomeScreen.tsx - WORKING VERSION FOR EXPO 49
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from '../components/icon';

const { width } = Dimensions.get('window');

// Define TypeScript interfaces
interface Issue {
  id: number;
  title: string;
  location: string;
  distance: string;
  status: 'Resolved' | 'In Progress' | 'Pending';
  urgency: 'URGENT' | 'MEDIUM' | 'LOW';
  icon: string;
  description: string;
  reportedBy: string;
  date: string;
  type: string;
}

interface QuickReportItem {
  label: string;
  icon: string;
  color: string;
}

const HomeScreen = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const issues: Issue[] = [
    {
      id: 1,
      title: 'Water Pipe Leak',
      location: 'Market Road, Zone 3',
      distance: '0.8km',
      status: 'Resolved',
      urgency: 'LOW',
      icon: 'water',
      description: 'Water leakage near residential area',
      reportedBy: 'Siddhil',
      date: '2 hours ago',
      type: 'water'
    },
    {
      id: 2,
      title: 'Garbage Overflow',
      location: 'Park Street, Zone 2',
      distance: '1.2km',
      status: 'In Progress',
      urgency: 'MEDIUM',
      icon: 'trash',
      description: 'Garbage bin overflowing for 2 days',
      reportedBy: 'Rahul',
      date: '5 hours ago',
      type: 'garbage'
    },
    {
      id: 3,
      title: 'Street Light Fault',
      location: 'Main Avenue, Zone 1',
      distance: '1.5km',
      status: 'Pending',
      urgency: 'URGENT',
      icon: 'lightbulb',
      description: 'Street light not working at night',
      reportedBy: 'Priya',
      date: '1 day ago',
      type: 'lights'
    },
    {
      id: 4,
      title: 'Pothole on Road',
      location: 'Highway Road, Zone 4',
      distance: '2.1km',
      status: 'Resolved',
      urgency: 'MEDIUM',
      icon: 'alert-triangle',
      description: 'Large pothole causing traffic issues',
      reportedBy: 'Amit',
      date: '3 days ago',
      type: 'pothole'
    },
    {
      id: 5,
      title: 'Severe Water Logging',
      location: 'Subhash Nagar, Zone 5',
      distance: '0.5km',
      status: 'In Progress',
      urgency: 'URGENT',
      icon: 'water',
      description: 'Water logging after heavy rain',
      reportedBy: 'Neha',
      date: '6 hours ago',
      type: 'water'
    },
  ];

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const flipAnim = useRef(issues.map(() => new Animated.Value(0))).current;
  const pressAnim = useRef(issues.map(() => new Animated.Value(1))).current;
  const quickButtonAnims = useRef(new Array(4).fill(0).map(() => new Animated.Value(1))).current;

  const handleFlip = (index: number) => {
    Animated.spring(flipAnim[index], {
      toValue: flippedCards[index] ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePressIn = (index: number) => {
    Animated.spring(pressAnim[index], {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(pressAnim[index], {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleQuickButtonPressIn = (index: number) => {
    Animated.spring(quickButtonAnims[index], {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleQuickButtonPressOut = (index: number) => {
    Animated.spring(quickButtonAnims[index], {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const getUrgencyColor = (urgency: 'URGENT' | 'MEDIUM' | 'LOW') => {
    switch(urgency) {
      case 'URGENT': return '#EF4444';
      case 'MEDIUM': return '#EAB308';
      case 'LOW': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: 'Resolved' | 'In Progress' | 'Pending') => {
    switch(status) {
      case 'Resolved': return '#10B981';
      case 'In Progress': return '#EAB308';
      case 'Pending': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderCard = (item: Issue, index: number) => {
    const frontInterpolate = flipAnim[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    const backInterpolate = flipAnim[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg']
    });

    const frontAnimatedStyle = {
      transform: [{ rotateY: frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: backInterpolate }]
    };

    const urgencyColor = getUrgencyColor(item.urgency);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.95}
        onPress={() => handleFlip(index)}
        onPressIn={() => handlePressIn(index)}
        onPressOut={() => handlePressOut(index)}
        style={{ marginHorizontal: 16, width: width * 0.8 }}
      >
        <Animated.View style={{ transform: [{ scale: pressAnim[index] }] }}>
          <View style={{ position: 'relative' }}>
            {/* Front of Card */}
            <Animated.View
              style={[
                styles.card,
                styles.cardGlow,
                frontAnimatedStyle,
                { 
                  position: flippedCards[index] ? 'absolute' : 'relative',
                  backfaceVisibility: 'hidden'
                }
              ]}
            >
              {/* Tan gradient overlay from bottom */}
              <View style={styles.tanGradient} />
              
              <View style={styles.cardContent}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <View style={[styles.icon3DContainer, { backgroundColor: `${urgencyColor}40` }]}>
                    <View style={styles.iconInnerGlow}>
                      <Icon name={item.icon as any} size={42} color="#FFFFFF" />
                    </View>
                  </View>
                </View>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>
                
                <View style={styles.locationContainer}>
                  <View style={styles.smallIcon3D}>
                    <Icon name="map-pin" size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.cardLocation}>
                    {item.location}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <View style={[styles.urgencyBadge, { backgroundColor: urgencyColor }]}>
                    <Text style={styles.urgencyText}>
                      {item.urgency}
                    </Text>
                  </View>
                  <Text style={styles.distanceText}>
                    {item.distance}
                  </Text>
                </View>

                <View style={styles.flipHintContainer}>
                  <Text style={styles.flipHint}>Tap to flip</Text>
                  <View style={styles.smallIcon3D}>
                    <Icon name="chevron-right" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* Back of Card */}
            <Animated.View
              style={[
                styles.card,
                styles.cardGlow,
                backAnimatedStyle,
                {
                  position: flippedCards[index] ? 'relative' : 'absolute',
                  backfaceVisibility: 'hidden'
                }
              ]}
            >
              {/* Tan gradient overlay from bottom */}
              <View style={styles.tanGradient} />
              
              <View style={styles.cardContent}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>
                  {item.description}
                </Text>

                <View style={styles.infoContainer}>
                  <View style={styles.infoRow}>
                    <View style={styles.smallIcon3D}>
                      <Icon name="clock" size={18} color="#FFFFFF" />
                    </View>
                    <Text style={styles.infoText}>Reported: {item.date}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.smallIcon3D}>
                      <Icon name="user" size={18} color="#FFFFFF" />
                    </View>
                    <Text style={styles.infoText}>By: {item.reportedBy}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.smallIcon3D}>
                      <Icon name="map-pin" size={18} color="#FFFFFF" />
                    </View>
                    <Text style={styles.infoText}>Location: {item.location}</Text>
                  </View>
                </View>

                <View style={styles.flipBackContainer}>
                  <View style={styles.smallIcon3D}>
                    <Icon name="check-circle" size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.flipBackHint}>Tap to flip back</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const quickReportItems: QuickReportItem[] = [
    { label: 'Pothole', icon: 'alert-triangle', color: '#CD7F32' },
    { label: 'Water', icon: 'water', color: '#CD7F32' },
    { label: 'Garbage', icon: 'trash', color: '#CD7F32' },
    { label: 'Lights', icon: 'lightbulb', color: '#CD7F32' },
  ];

  return (
    <View style={styles.container}>
      {/* Background glow effect */}
      <View style={styles.backgroundGlow} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Hello, Siddhil
        </Text>
        <Text style={styles.headerSubtitle}>
          Make your city better today
        </Text>
      </View>

      {/* Scrollable Cards Section */}
      <View style={styles.cardsContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={width * 0.8 + 32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: (width - (width * 0.8)) / 2 }}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / (width * 0.8 + 32)
            );
            setCurrentCardIndex(newIndex);
          }}
        >
          {issues.map((item, index) => renderCard(item, index))}
        </ScrollView>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {issues.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentCardIndex === index ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>
      </View>

      {/* Quick Report Section */}
      <View style={styles.quickReportContainer}>
        <Text style={styles.quickReportTitle}>
          Report an Issue
        </Text>
        <View style={styles.quickReportButtons}>
          {quickReportItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPressIn={() => handleQuickButtonPressIn(index)}
              onPressOut={() => handleQuickButtonPressOut(index)}
              style={styles.quickReportButtonWrapper}
            >
              <Animated.View 
                style={[
                  styles.quickReportButton,
                  styles.quickButtonGlow,
                  { backgroundColor: item.color, transform: [{ scale: quickButtonAnims[index] }] }
                ]}
              >
                <View style={[styles.quickIconContainer, styles.quickIcon3D]}>
                  <Icon name={item.icon as any} size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.quickButtonText}>
                  {item.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reported Issues Summary */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPressIn={() => handleQuickButtonPressIn(0)}
          onPressOut={() => handleQuickButtonPressOut(0)}
          style={styles.summaryButtonWrapper}
        >
          <Animated.View 
            style={[
              styles.summaryCard,
              styles.summaryCardGlow,
              { transform: [{ scale: quickButtonAnims[0] }] }
            ]}
          >
            <View style={styles.summaryContent}>
              <View>
                <Text style={styles.summaryTitle}>
                  Reported Issues
                </Text>
                <Text style={styles.summarySubtitle}>
                  5 issues reported • 2 resolved
                </Text>
              </View>
              <View style={[styles.summaryIcon, styles.summaryIcon3D]}>
                <Icon name="chevron-right" size={24} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.9}
          onPressIn={() => handleQuickButtonPressIn(1)}
          onPressOut={() => handleQuickButtonPressOut(1)}
          style={[styles.summaryButtonWrapper, { marginTop: 16 }]}
        >
          <Animated.View 
            style={[
              styles.summaryCard,
              styles.summaryCardGlow,
              { transform: [{ scale: quickButtonAnims[1] }] }
            ]}
          >
            <View style={styles.summaryContent}>
              <View>
                <Text style={styles.summaryTitle}>
                  Report Issue
                </Text>
                <Text style={styles.summarySubtitle}>
                  Submit new complaint
                </Text>
              </View>
              <View style={[styles.summaryIcon, styles.summaryIcon3D]}>
                <Icon name="alert-circle" size={24} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 185, 150, 0.1)',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666666',
    marginTop: 4,
  },
  cardsContainer: {
    marginTop: 24,
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: '#D4B996',
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
  quickReportContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    position: 'relative',
    zIndex: 10,
  },
  quickReportTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  quickReportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickReportButtonWrapper: {
    position: 'relative',
  },
  quickReportButton: {
    width: 88,
    height: 88,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickButtonGlow: {
    shadowColor: '#B08D57',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  quickIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIcon3D: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quickButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryContainer: {
    marginTop: 32,
    marginHorizontal: 24,
    marginBottom: 112,
    position: 'relative',
    zIndex: 10,
  },
  summaryButtonWrapper: {
    position: 'relative',
  },
  summaryCard: {
    backgroundColor: '#E6E6FA',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryCardGlow: {
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  summarySubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  summaryIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 20,
  },
  summaryIcon3D: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  // Card styles
  card: {
    width: width * 0.8,
    height: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardGlow: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  tanGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: '#D4B996',
    opacity: 0.3,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardContent: {
    padding: 24,
    position: 'relative',
    zIndex: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon3DContainer: {
    width: 84,
    height: 84,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconInnerGlow: {
    width: 70,
    height: 70,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardLocation: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  urgencyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  urgencyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flipHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  flipHint: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginRight: 4,
  },
  smallIcon3D: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
  flipBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipBackHint: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default HomeScreen;