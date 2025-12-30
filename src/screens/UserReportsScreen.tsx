import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Home,
  User,
  Search,
  Filter,
  Clock,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  FileText,
  Tag,
  Building,
  Navigation,
  ChevronRight,
  X,
  Fingerprint,
  Shield,
  FileCheck,
  Clock4,
  Users,
  CheckSquare,
  Circle,
} from 'lucide-react-native';
import Constants from 'expo-constants';

// Enhanced formal color palette for government website
const COLORS = {
  // Primary Government Blue Theme
  primary: '#1E3A8A',
  primaryLight: '#3B82F6',
  primaryDark: '#1E40AF',
  primaryGradient: ['#1E3A8A', '#2563EB', '#3B82F6'] as const,
  
  // Background colors
  background: '#F8FAFC',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#0F172A',
  
  // Card colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E2E8F0',
  
  // Status colors
  success: '#059669',
  successLight: '#10B981',
  warning: '#D97706',
  warningLight: '#F59E0B',
  info: '#4F46E5',
  infoLight: '#6366F1',
  pending: '#6B7280',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  textLight: '#F9FAFB',
  
  // UI Elements
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: 'rgba(17, 24, 39, 0.05)',
  shadowDark: 'rgba(17, 24, 39, 0.1)',
  
  // Government-specific colors
  govBlue: '#1E3A8A',
  govGold: '#B8860B',
  govGreen: '#059669',
  govRed: '#DC2626',
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Animated Components
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

// Enhanced mock data with more details
const MOCK_REPORTS = [
  {
    id: 1,
    title: 'Garbage Overflow on Main Street',
    complaint_id: 'CMP-2024-001',
    date: '2024-01-15',
    category: 'Sanitation',
    status: 'in_progress',
    department: 'Public Works Department',
    location_address: 'Main Street, Zone 5, District 3',
    urgency_level: 'High',
    submitted_on: '15 Jan, 2024 10:30 AM',
    estimated_resolution: '20 Jan, 2024',
    officer_assigned: 'John Smith',
    timeline: [
      { 
        step: 'submitted', 
        date: '15 Jan, 2024 10:30 AM', 
        completed: true,
        description: 'Complaint registered in system'
      },
      { 
        step: 'assigned', 
        date: '15 Jan, 2024 02:45 PM', 
        completed: true,
        description: 'Assigned to sanitation team'
      },
      { 
        step: 'in_progress', 
        date: '16 Jan, 2024 09:00 AM', 
        completed: true,
        description: 'Team dispatched to location'
      },
      { 
        step: 'resolved', 
        date: 'Pending', 
        completed: false,
        description: 'Awaiting completion'
      },
    ]
  },
  {
    id: 2,
    title: 'Broken Street Light - Park Road',
    complaint_id: 'CMP-2024-002',
    date: '2024-01-14',
    category: 'Electricity & Lighting',
    status: 'assigned',
    department: 'Electricity Department',
    location_address: 'Park Road, Block B, Sector 12',
    urgency_level: 'Medium',
    submitted_on: '14 Jan, 2024 02:45 PM',
    estimated_resolution: '18 Jan, 2024',
    officer_assigned: 'Sarah Johnson',
    timeline: [
      { 
        step: 'submitted', 
        date: '14 Jan, 2024 02:45 PM', 
        completed: true,
        description: 'Complaint registered'
      },
      { 
        step: 'assigned', 
        date: '15 Jan, 2024 10:00 AM', 
        completed: true,
        description: 'Assigned to electrical maintenance'
      },
      { 
        step: 'in_progress', 
        date: 'Pending', 
        completed: false,
        description: 'Scheduled for inspection'
      },
      { 
        step: 'resolved', 
        date: 'Pending', 
        completed: false,
        description: 'Not yet started'
      },
    ]
  },
  {
    id: 3,
    title: 'Water Pipeline Leakage Issue',
    complaint_id: 'CMP-2024-003',
    date: '2024-01-13',
    category: 'Water Supply',
    status: 'resolved',
    department: 'Water Department',
    location_address: 'River View Colony, Ward 7',
    urgency_level: 'High',
    submitted_on: '13 Jan, 2024 09:15 AM',
    resolved_on: '14 Jan, 2024 10:00 AM',
    officer_assigned: 'Robert Chen',
    timeline: [
      { 
        step: 'submitted', 
        date: '13 Jan, 2024 09:15 AM', 
        completed: true,
        description: 'Emergency complaint registered'
      },
      { 
        step: 'assigned', 
        date: '13 Jan, 2024 11:30 AM', 
        completed: true,
        description: 'Assigned to water maintenance team'
      },
      { 
        step: 'in_progress', 
        date: '13 Jan, 2024 02:15 PM', 
        completed: true,
        description: 'Repair work completed'
      },
      { 
        step: 'resolved', 
        date: '14 Jan, 2024 10:00 AM', 
        completed: true,
        description: 'Issue resolved and verified'
      },
    ]
  },
  {
    id: 4,
    title: 'Pothole Repair - National Highway 48',
    complaint_id: 'CMP-2024-004',
    date: '2024-01-12',
    category: 'Road Maintenance',
    status: 'submitted',
    department: 'Public Works Department',
    location_address: 'National Highway 48, KM 25',
    urgency_level: 'Medium',
    submitted_on: '12 Jan, 2024 11:20 AM',
    estimated_resolution: '25 Jan, 2024',
    officer_assigned: 'Pending',
    timeline: [
      { 
        step: 'submitted', 
        date: '12 Jan, 2024 11:20 AM', 
        completed: true,
        description: 'Complaint registered'
      },
      { 
        step: 'assigned', 
        date: 'Pending', 
        completed: false,
        description: 'Awaiting assignment'
      },
      { 
        step: 'in_progress', 
        date: 'Pending', 
        completed: false,
        description: 'Not yet started'
      },
      { 
        step: 'resolved', 
        date: 'Pending', 
        completed: false,
        description: 'Not yet started'
      },
    ]
  },
  {
    id: 5,
    title: 'Sewage Blockage in Old Market',
    complaint_id: 'CMP-2024-005',
    date: '2024-01-11',
    category: 'Sanitation',
    status: 'in_progress',
    department: 'Public Works Department',
    location_address: 'Old Market Area, Central Zone',
    urgency_level: 'High',
    submitted_on: '11 Jan, 2024 04:30 PM',
    estimated_resolution: '15 Jan, 2024',
    officer_assigned: 'Michael Rodriguez',
    timeline: [
      { 
        step: 'submitted', 
        date: '11 Jan, 2024 04:30 PM', 
        completed: true,
        description: 'Emergency complaint registered'
      },
      { 
        step: 'assigned', 
        date: '12 Jan, 2024 10:15 AM', 
        completed: true,
        description: 'Assigned to sanitation team'
      },
      { 
        step: 'in_progress', 
        date: '12 Jan, 2024 02:00 PM', 
        completed: true,
        description: 'Clearing work in progress'
      },
      { 
        step: 'resolved', 
        date: 'Pending', 
        completed: false,
        description: 'Work 70% completed'
      },
    ]
  },
];

// Stats Component
const StatsOverview = () => {
  const totalComplaints = MOCK_REPORTS.length;
  const resolved = MOCK_REPORTS.filter(r => r.status === 'resolved').length;
  const inProgress = MOCK_REPORTS.filter(r => r.status === 'in_progress').length;
  const pending = MOCK_REPORTS.filter(r => r.status === 'submitted' || r.status === 'assigned').length;

  const stats = [
    { label: 'Total\nComplaints', value: totalComplaints, color: COLORS.primary, icon: FileText },
    { label: 'Resolved', value: resolved, color: COLORS.success, icon: CheckSquare },
    { label: 'In Progress', value: inProgress, color: COLORS.warning, icon: Clock4 },
    { label: 'Pending', value: pending, color: COLORS.pending, icon: Users },
  ];

  return (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
            <stat.icon size={20} color={stat.color} />
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

// Enhanced Header Component with government seal effect
const EnhancedHeader = ({ onProfile, onHome }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(titleAnim, {
        toValue: 1,
        tension: 100,
        friction: 10,
        delay: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const titleScale = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1]
  });

  const titleOpacity = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View 
      style={[
        styles.headerContainer,
        { opacity: fadeAnim }
      ]}
    >
      {/* Government Seal Background */}
      <View style={styles.govSealContainer}>
        <LinearGradient
          colors={['rgba(30, 58, 138, 0.9)', 'rgba(30, 64, 175, 0.95)']}
          style={styles.govSeal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.sealInner}>
            <FileCheck size={40} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.headerContent}>
        <View style={styles.headerTopRow}>
          <Pressable
            onPress={onProfile}
            style={({ pressed }) => [
              styles.headerButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] }
            ]}
          >
            <User size={22} color={COLORS.textLight} />
          </Pressable>

          <Pressable
            onPress={onHome}
            style={({ pressed }) => [
              styles.headerButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] }
            ]}
          >
            <Home size={22} color={COLORS.textLight} />
          </Pressable>
        </View>

        <View style={styles.headerMain}>
          <Animated.View style={{
            transform: [{ scale: titleScale }],
            opacity: titleOpacity
          }}>
            <Text style={styles.headerTitle}>Track Issues Here !</Text>
            <Text style={styles.headerSubtitle}>Monitor Your Complaint Status</Text>
          </Animated.View>
          
          <View style={styles.govBadge}>
            <Shield size={16} color={COLORS.govGold} />
            <Text style={styles.govBadgeText}></Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search complaints by ID, location, or category..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </Animated.View>
  );
};

// Enhanced Filter Chips Component
const FilterChips = ({ currentFilter, onFilterChange }: any) => {
  const filters = [
    { id: 'all', label: 'All Complaints', color: COLORS.primary },
    { id: 'active', label: 'Active', color: COLORS.warning },
    { id: 'resolved', label: 'Resolved', color: COLORS.success },
    { id: 'pending', label: 'Pending', color: COLORS.pending },
  ];

  return (
    <View style={styles.filterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter.id}
            onPress={() => onFilterChange(filter.id)}
            style={({ pressed }) => [
              styles.filterChip,
              currentFilter === filter.id && [
                styles.filterChipSelected,
                { backgroundColor: `${filter.color}10`, borderColor: filter.color }
              ],
              { transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]}
          >
            <View style={[
              styles.filterDot,
              { backgroundColor: currentFilter === filter.id ? filter.color : '#9CA3AF' }
            ]} />
            <Text style={[
              styles.filterChipText,
              currentFilter === filter.id && [
                styles.filterChipTextSelected,
                { color: filter.color }
              ]
            ]}>
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

// Enhanced Timeline Component matching the image
const TimelineComponent = ({ timeline, statusColor, showTimeline }: any) => {
  const timelineAnim = useRef(new Animated.Value(0)).current;
  const dotAnimations = useRef(timeline.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (showTimeline) {
      Animated.sequence([
        Animated.timing(timelineAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.stagger(150, dotAnimations.map((anim: Animated.Value) => 
          Animated.spring(anim, {
            toValue: 1,
            tension: 200,
            friction: 20,
            useNativeDriver: true,
          })
        ))
      ]).start();
    } else {
      Animated.timing(timelineAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      dotAnimations.forEach((anim: Animated.Value) => anim.setValue(0));
    }
  }, [showTimeline]);

  const timelineOpacity = timelineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const timelineTranslateY = timelineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  return (
    <AnimatedView style={[
      styles.timelineContainer,
      {
        opacity: timelineOpacity,
        transform: [{ translateY: timelineTranslateY }]
      }
    ]}>
      <Text style={styles.timelineTitle}>Complaint Timeline</Text>
      
      <View style={styles.timelineWrapper}>
        {timeline.map((item: any, index: number) => {
          const dotScale = dotAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          });

          const dotOpacity = dotAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          });

          return (
            <View key={item.step} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <AnimatedView style={[
                  styles.timelineDotWrapper,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity
                  }
                ]}>
                  <View style={[
                    styles.timelineDot,
                    item.completed && { backgroundColor: statusColor }
                  ]}>
                    {item.completed ? (
                      <CheckCircle size={12} color="#FFFFFF" />
                    ) : (
                      <Circle size={8} color={item.completed ? '#FFFFFF' : '#D1D5DB'} />
                    )}
                  </View>
                </AnimatedView>
                
                {index < timeline.length - 1 && (
                  <View style={[
                    styles.timelineConnector,
                    item.completed && { backgroundColor: statusColor }
                  ]} />
                )}
              </View>
              
              <View style={styles.timelineRight}>
                <View style={styles.timelineContent}>
                  <Text style={[
                    styles.timelineStepText,
                    item.completed && { color: COLORS.textPrimary, fontWeight: '700' }
                  ]}>
                    {item.step === 'submitted' ? 'Submitted' : 
                     item.step === 'assigned' ? 'Assigned' : 
                     item.step === 'in_progress' ? 'In Progress' : 'Resolved'}
                  </Text>
                  
                  <Text style={[
                    styles.timelineDateText,
                    item.completed ? { color: statusColor } : { color: '#9CA3AF' }
                  ]}>
                    {item.date}
                  </Text>
                  
                  {item.description && (
                    <Text style={styles.timelineDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </AnimatedView>
  );
};

// Enhanced Complaint Card Component
const ComplaintCard = ({ report, onPress }: any) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const cardAnim = useRef(new Animated.Value(0)).current;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'submitted':
        return { 
          text: 'Submitted', 
          color: '#6B7280',
          icon: FileText,
          bgColor: '#F3F4F6'
        };
      case 'assigned':
        return { 
          text: 'Assigned', 
          color: '#2563EB',
          icon: Users,
          bgColor: '#DBEAFE'
        };
      case 'in_progress':
        return { 
          text: 'In Progress', 
          color: '#D97706',
          icon: Clock4,
          bgColor: '#FEF3C7'
        };
      case 'resolved':
        return { 
          text: 'Resolved', 
          color: '#059669',
          icon: CheckSquare,
          bgColor: '#D1FAE5'
        };
      default:
        return { 
          text: 'Submitted', 
          color: '#6B7280',
          icon: FileText,
          bgColor: '#F3F4F6'
        };
    }
  };

  const getUrgencyConfig = (level: string) => {
    switch (level) {
      case 'High':
        return { color: '#DC2626', bgColor: '#FEE2E2', icon: AlertCircle };
      case 'Medium':
        return { color: '#D97706', bgColor: '#FEF3C7', icon: AlertCircle };
      default:
        return { color: '#059669', bgColor: '#D1FAE5', icon: AlertCircle };
    }
  };

  const statusConfig = getStatusConfig(report.status);
  const urgencyConfig = getUrgencyConfig(report.urgency_level);

  const handlePress = () => {
    const toValue = showTimeline ? 0 : 1;
    setShowTimeline(!showTimeline);
    
    Animated.spring(cardAnim, {
      toValue,
      tension: 200,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const cardScale = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.01]
  });

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        styles.complaintCard,
        { transform: [{ scale: cardScale }] }
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.complaintIdBadge}>
          <Fingerprint size={14} color={COLORS.primary} />
          <Text style={styles.complaintId}>{report.complaint_id}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
          <statusConfig.icon size={14} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.text}
          </Text>
        </View>
      </View>

      <Text style={styles.complaintTitle} numberOfLines={2}>
        {report.title}
      </Text>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Tag size={16} color={COLORS.textMuted} />
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{report.category}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Calendar size={16} color={COLORS.textMuted} />
          <Text style={styles.detailLabel}>Submitted:</Text>
          <Text style={styles.detailValue}>{report.submitted_on}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Building size={16} color={COLORS.textMuted} />
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>{report.department}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MapPin size={16} color={COLORS.textMuted} />
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={[styles.detailValue, { color: COLORS.primary }]}>
            {report.location_address}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.urgencyBadge, { backgroundColor: urgencyConfig.bgColor }]}>
          <urgencyConfig.icon size={14} color={urgencyConfig.color} />
          <Text style={[styles.urgencyText, { color: urgencyConfig.color }]}>
            {report.urgency_level} Priority
          </Text>
        </View>
        
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.actionButton,
            { transform: [{ scale: pressed ? 0.95 : 1 }] }
          ]}
        >
          <Text style={styles.actionButtonText}>
            {showTimeline ? 'Hide Timeline' : 'View Timeline'}
          </Text>
          <ChevronRight size={16} color={COLORS.primary} style={{
            transform: [{ rotate: showTimeline ? '90deg' : '0deg' }],
            marginLeft: 4
          }} />
        </Pressable>
      </View>

      {/* Enhanced Timeline Component */}
      {showTimeline && (
        <TimelineComponent 
          timeline={report.timeline}
          statusColor={statusConfig.color}
          showTimeline={showTimeline}
        />
      )}
    </AnimatedPressable>
  );
};

// Main Screen Component
export default function UserReportsScreen() {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [filteredReports, setFilteredReports] = useState(MOCK_REPORTS);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      filterReports();
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentFilter, searchQuery]);

  const filterReports = () => {
    let filtered = [...MOCK_REPORTS];

    if (currentFilter === 'active') {
      filtered = filtered.filter(r => r.status !== 'resolved');
    } else if (currentFilter === 'resolved') {
      filtered = filtered.filter(r => r.status === 'resolved');
    } else if (currentFilter === 'pending') {
      filtered = filtered.filter(r => r.status === 'submitted' || r.status === 'assigned');
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.complaint_id.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.location_address.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleReportPress = (report: any) => {
    console.log('Navigate to report details:', report.id);
  };

  const handleHomePress = () => {
    console.log('Navigate to home');
  };

  const handleProfilePress = () => {
    console.log('Navigate to profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Header (now scrollable with content) */}
        <EnhancedHeader
          onHome={handleHomePress}
          onProfile={handleProfilePress}
        />
        
        {/* Stats Overview */}
        <StatsOverview />
        
        {/* Filter Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Complaints</Text>
          <Text style={styles.sectionSubtitle}>
            {filteredReports.length} complaint{filteredReports.length !== 1 ? 's' : ''} found
          </Text>
        </View>
        
        <FilterChips
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Loading State */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.spinner} />
            <Text style={styles.loadingText}>Loading complaints...</Text>
          </View>
        ) : filteredReports.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FileText size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No complaints found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different search term' : 'No complaints match the selected filter'}
            </Text>
          </View>
        ) : (
          <View style={styles.reportsList}>
            {filteredReports.map((report) => (
              <ComplaintCard
                key={report.id}
                report={report}
                onPress={() => handleReportPress(report)}
              />
            ))}
          </View>
        )}
        
        {/* Footer Information */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerTitle}>Need Help?</Text>
          <Text style={styles.footerText}>
            Contact our Public Grievance Department at grievance@government.gov
            or call 1800-XXX-XXXX during office hours (9 AM - 6 PM)
          </Text>
          <Text style={styles.footerNote}>
            Average resolution time: 3-5 working days
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Report Details Screen Component
export function ReportDetailsScreen({ route, navigation }: any) {
  const { reportId } = route.params || { reportId: 1 };
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundReport = MOCK_REPORTS.find(r => r.id === reportId) || MOCK_REPORTS[0];
      setReport(foundReport);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [reportId]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'submitted': return { text: 'Submitted', color: '#6B7280', bgColor: '#F3F4F6' };
      case 'assigned': return { text: 'Assigned', color: '#2563EB', bgColor: '#DBEAFE' };
      case 'in_progress': return { text: 'In Progress', color: '#D97706', bgColor: '#FEF3C7' };
      case 'resolved': return { text: 'Resolved', color: '#059669', bgColor: '#D1FAE5' };
      default: return { text: 'Submitted', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  if (isLoading) {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.loadingContainer}>
          <View style={styles.spinner} />
          <Text style={styles.loadingText}>Loading complaint details...</Text>
        </View>
      </View>
    );
  }

  const statusConfig = getStatusConfig(report.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            { transform: [{ scale: pressed ? 0.95 : 1 }] }
          ]}
        >
          <ArrowLeft size={24} color={COLORS.textLight} />
        </Pressable>
        <Text style={styles.detailsHeaderTitle}>Complaint Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.detailsScrollView}
        contentContainerStyle={styles.detailsScrollContent}
      >
        {report && (
          <View style={styles.detailsCard}>
            <View style={styles.detailsCardHeader}>
              <Text style={styles.detailsTitle}>{report.title}</Text>
              <View style={[styles.detailsStatusBadge, { backgroundColor: statusConfig.bgColor }]}>
                <Text style={[styles.detailsStatusText, { color: statusConfig.color }]}>
                  {statusConfig.text}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailsInfoGrid}>
              <View style={styles.detailInfoRow}>
                <Fingerprint size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Complaint ID:</Text>
                <Text style={styles.detailInfoValue}>{report.complaint_id}</Text>
              </View>
              
              <View style={styles.detailInfoRow}>
                <Calendar size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Submitted on:</Text>
                <Text style={styles.detailInfoValue}>{report.submitted_on}</Text>
              </View>
              
              <View style={styles.detailInfoRow}>
                <Tag size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Category:</Text>
                <Text style={styles.detailInfoValue}>{report.category}</Text>
              </View>
              
              <View style={styles.detailInfoRow}>
                <Building size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Department:</Text>
                <Text style={styles.detailInfoValue}>{report.department}</Text>
              </View>
              
              <View style={styles.detailInfoRow}>
                <MapPin size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Location:</Text>
                <Text style={[styles.detailInfoValue, { color: COLORS.primary }]}>
                  {report.location_address}
                </Text>
              </View>
              
              <View style={styles.detailInfoRow}>
                <AlertCircle size={18} color={COLORS.primary} />
                <Text style={styles.detailInfoLabel}>Urgency Level:</Text>
                <Text style={[
                  styles.detailInfoValue,
                  { 
                    color: report.urgency_level === 'High' ? '#DC2626' : 
                           report.urgency_level === 'Medium' ? '#D97706' : '#059669',
                    fontWeight: '600'
                  }
                ]}>
                  {report.urgency_level}
                </Text>
              </View>
              
              {report.officer_assigned && report.officer_assigned !== 'Pending' && (
                <View style={styles.detailInfoRow}>
                  <User size={18} color={COLORS.primary} />
                  <Text style={styles.detailInfoLabel}>Officer Assigned:</Text>
                  <Text style={styles.detailInfoValue}>{report.officer_assigned}</Text>
                </View>
              )}
              
              {report.estimated_resolution && (
                <View style={styles.detailInfoRow}>
                  <Clock size={18} color={COLORS.primary} />
                  <Text style={styles.detailInfoLabel}>Estimated Resolution:</Text>
                  <Text style={styles.detailInfoValue}>{report.estimated_resolution}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header Styles
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingTop: Constants.statusBarHeight + 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  govSealContainer: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    opacity: 0.1,
  },
  govSeal: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: -0.5,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  govBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: 6,
  },
  govBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  searchContainer: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 8,
    color: COLORS.textMuted,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Section Header
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  // Filter Styles
  filterContainer: {
    marginBottom: 20,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 8,
  },
  filterChipSelected: {
    borderWidth: 1.5,
  },
  filterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  filterChipTextSelected: {
    fontWeight: '600',
  },
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Loading States
  loadingContainer: {
    padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderTopColor: 'transparent',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  // Empty State
  emptyContainer: {
    padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Complaint Card
  reportsList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  complaintIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  complaintId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  complaintTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    minWidth: 70,
  },
  detailValue: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  // Timeline Styles (Matching Image)
  timelineContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  timelineWrapper: {
    marginLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    minHeight: 60,
  },
  timelineLeft: {
    width: 32,
    alignItems: 'center',
    position: 'relative',
  },
  timelineDotWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    zIndex: 2,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineConnector: {
    position: 'absolute',
    top: 28,
    left: 13,
    width: 2,
    height: '100%',
    backgroundColor: '#E5E7EB',
    zIndex: 1,
  },
  timelineRight: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 8,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStepText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  timelineDateText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  timelineDescription: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  // Footer Info
  footerInfo: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 8,
  },
  footerNote: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  // Details Screen
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  detailsScrollView: {
    flex: 1,
  },
  detailsScrollContent: {
    padding: 16,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  detailsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 16,
    lineHeight: 28,
  },
  detailsStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  detailsStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsInfoGrid: {
    gap: 16,
  },
  detailInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    width: 140,
  },
  detailInfoValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
});