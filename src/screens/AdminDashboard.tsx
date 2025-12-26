import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon, { IconName } from '../components/icon';

const { width } = Dimensions.get('window');
const router = useRouter();

interface StatCard {
  title: string;
  value: number;
  change: string;
  icon: IconName;
  color: readonly [string, string];
}

interface MonthlyTrend {
  month: string;
  issues: number;
}

interface DepartmentPerformance {
  department: string;
  progress: number;
  icon: IconName;
}

interface RecentReport {
  id: string;
  title: string;
  location: string;
  time: string;
  status: string;
  icon: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [slideAnim] = useState(new Animated.Value(50));

  const [totalIssues] = useState(156);
  const [resolvedIssues] = useState(128);
  const [pendingIssues] = useState(28);
  const [citizenScore] = useState(89);

  const monthlyTrends: MonthlyTrend[] = [
    { month: "Jan", issues: 45 },
    { month: "Feb", issues: 52 },
    { month: "Mar", issues: 48 },
    { month: "Apr", issues: 61 },
    { month: "May", issues: 55 },
    { month: "Jun", issues: 58 },
  ];

  const departmentPerformance: DepartmentPerformance[] = [
    { department: "Sanitation Dept", progress: 0.91, icon: "clean-hands" },
    { department: "Road Dept", progress: 0.85, icon: "road" },
    { department: "Water Dept", progress: 0.78, icon: "water-drop" },
    { department: "Electricity Dept", progress: 0.82, icon: "flash-on" },
    { department: "Other", progress: 0.67, icon: "more-horiz" },
  ];

  const recentReports: RecentReport[] = [
    { id: '1', title: "Pothole on Main St", location: "Downtown", time: "2 hours ago", status: "New", icon: "🚧" },
    { id: '2', title: "Street Light Out", location: "Northside", time: "5 hours ago", status: "In Progress", icon: "💡" },
    { id: '3', title: "Garbage Overflow", location: "East Park", time: "1 day ago", status: "Pending", icon: "🗑️" },
    { id: '4', title: "Broken Bench", location: "Central Square", time: "3 days ago", status: "Resolved", icon: "🪑" },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderFooter = () => (
    <Animated.View
      style={[
        styles.footer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <TouchableOpacity
        style={[styles.footerButton, selectedIndex === 0 && styles.activeFooterButton]}
        onPress={() => setSelectedIndex(0)}
      >
        <Icon
          name="dashboard"
          size={22}
          color={selectedIndex === 0 ? '#667EEA' : '#8F92A1'}
        />
        <Text style={[styles.footerText, selectedIndex === 0 && styles.activeFooterText]}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.footerButton, selectedIndex === 1 && styles.activeFooterButton]}
        onPress={() => {
          setSelectedIndex(1);
          router.push("/admin/dept-analysis");
        }}

      >
        <Icon
          name="analytics"
          size={22}
          color={selectedIndex === 1 ? '#667EEA' : '#8F92A1'}
        />
        <Text style={[styles.footerText, selectedIndex === 1 && styles.activeFooterText]}>
          Dept Analysis
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.footerButton, selectedIndex === 2 && styles.activeFooterButton]}
        // Issue Reports
        onPress={() => {
          setSelectedIndex(2);
          router.push("/admin/issues");
        }}
      >
        <Icon
          name="description"
          size={22}
          color={selectedIndex === 2 ? '#667EEA' : '#8F92A1'}
        />
        <Text style={[styles.footerText, selectedIndex === 2 && styles.activeFooterText]}>
          Issue Reports
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.footerButton, selectedIndex === 3 && styles.activeFooterButton]}
        // Map View
        onPress={() => {
          setSelectedIndex(3);
          router.push("/admin/map-view");
        }}
      >
        <Icon
          name="map"
          size={22}
          color={selectedIndex === 3 ? '#667EEA' : '#8F92A1'}
        />
        <Text style={[styles.footerText, selectedIndex === 3 && styles.activeFooterText]}>
          Map View
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.footerButton, selectedIndex === 4 && styles.activeFooterButton]}
        // Profile
        onPress={() => {
          setSelectedIndex(4);
          router.push("/admin/profile");
        }}
      >
        <Icon
          name="person"
          size={22}
          color={selectedIndex === 4 ? '#667EEA' : '#8F92A1'}
        />
        <Text style={[styles.footerText, selectedIndex === 4 && styles.activeFooterText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderStatCard = (stat: StatCard, index: number) => (
    <Animated.View
      key={index}
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: slideAnim }
          ],
        },
      ]}
    >
      <LinearGradient colors={stat.color} style={styles.statCardGradient}>
        <View style={styles.statHeader}>
          <Icon name={stat.icon} size={24} color="#FFFFFF" />
          <Text style={styles.statChange}>{stat.change}</Text>
        </View>
        <Text style={styles.statCardValue}>{stat.value}</Text>
        <Text style={styles.statCardTitle}>{stat.title}</Text>
      </LinearGradient>
    </Animated.View>
  );

  const renderMonthlyGraph = () => {
    const maxIssues = Math.max(...monthlyTrends.map(t => t.issues));

    return (
      <View style={styles.graphContainer}>
        <View style={styles.monthLabels}>
          {monthlyTrends.map((trend, index) => (
            <Text key={index} style={styles.monthLabel}>{trend.month}</Text>
          ))}
        </View>
        <View style={styles.graphBars}>
          {monthlyTrends.map((trend, index) => {
            const barHeight = (trend.issues / maxIssues) * 60;
            return (
              <Animated.View
                key={index}
                style={styles.graphBar}
              >
                <View style={[styles.bar, { height: barHeight }]}>
                  <LinearGradient
                    colors={['#00E5A0', '#00D9F5'] as const}
                    style={styles.barGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  />
                </View>
              </Animated.View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderDepartmentCard = (dept: DepartmentPerformance, index: number) => {
    const progressPercent = Math.round(dept.progress * 100);

    return (
      <Animated.View
        key={index}
        style={[
          styles.deptCard,
          {
            opacity: fadeAnim,
            transform: [
              { translateX: slideAnim },
              { scale: scaleAnim }
            ],
          }
        ]}
      >
        <View style={styles.deptIconContainer}>
          <LinearGradient colors={['#667EEA', '#764BA2'] as const} style={styles.deptIcon}>
            <Icon name={dept.icon} size={20} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={styles.deptInfo}>
          <Text style={styles.deptName}>{dept.department}</Text>
          <View style={styles.deptProgressBar}>
            <Animated.View
              style={[
                styles.deptProgress,
                {
                  width: `${progressPercent}%`,
                  opacity: fadeAnim,
                }
              ]}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2'] as const}
                style={styles.deptProgressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
        </View>
        <Text style={styles.deptPercent}>{progressPercent}%</Text>
      </Animated.View>
    );
  };

  const renderRecentReport = (report: RecentReport, index: number) => {
    let statusColor = '#FFA726';
    if (report.status === 'Resolved') statusColor = '#00E5A0';
    if (report.status === 'New') statusColor = '#667EEA';
    if (report.status === 'Pending') statusColor = '#FF7043';

    return (
      <Animated.View
        key={report.id}
        style={[
          styles.reportCard,
          {
            opacity: fadeAnim,
            transform: [
              { translateX: slideAnim },
              {
                scale: scaleAnim.interpolate({
                  inputRange: [0.95, 1],
                  outputRange: [0.98, 1]
                })
              }
            ],
          }
        ]}
      >
        <View style={styles.reportIcon}>
          <Text style={styles.reportIconText}>{report.icon}</Text>
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <View style={styles.reportMeta}>
            <Text style={styles.reportLocation}>{report.location}</Text>
            <Text style={styles.reportTime}>{report.time}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{report.status}</Text>
        </View>
      </Animated.View>
    );
  };

  // Use 'as const' for color arrays
  const stats: StatCard[] = [
    { title: "Total Issues", value: totalIssues, change: "+15%", icon: "task-alt", color: ['#667EEA', '#764BA2'] as const },
    { title: "Resolved", value: resolvedIssues, change: "+20%", icon: "verified", color: ['#F093FB', '#F5576C'] as const },
    { title: "Pending", value: pendingIssues, change: "", icon: "pending-actions", color: ['#4FACFE', '#00F2FE'] as const },
  ];

  const citizenScoreColor = citizenScore >= 80 ? ['#00E5A0', '#00D9F5'] as const :
    citizenScore >= 60 ? ['#FFB74D', '#FF9800'] as const :
      ['#F44336', '#D32F2F'] as const;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>UrbanSim AI</Text>
          <Text style={styles.headerSubtitle}>Monitor and manage city issues efficiently</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <LinearGradient colors={['#E0C3FC', '#8EC5FC'] as const} style={styles.profileGradient}>
            <Icon name={"person" as IconName} size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Greeting Card */}
          <Animated.View
            style={[
              styles.greetingCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient colors={['#667EEA', '#764BA2'] as const} style={styles.greetingGradient}>
              <Text style={styles.greetingText}>Hello, User</Text>
              <Text style={styles.greetingSubtext}>Welcome back to your dashboard</Text>
            </LinearGradient>
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => renderStatCard(stat, index))}
          </View>

          {/* Citizen Score Section */}
          <Animated.View
            style={[
              styles.scoreSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient colors={citizenScoreColor} style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <Icon name="star" size={24} color="#FFFFFF" />
                <Text style={styles.scoreLabel}>Citizen Reputation / Trust Score</Text>
              </View>
              <Text style={styles.scoreValue}>{citizenScore}</Text>
              <Text style={styles.scoreDescription}>
                Based on {totalIssues} submitted issues with {resolvedIssues} resolved
              </Text>
              <View style={styles.scoreProgress}>
                <View style={[styles.scoreProgressFill, { width: `${citizenScore}%` }]} />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Monthly Trends */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Monthly Trends</Text>
            </View>
            {renderMonthlyGraph()}
          </Animated.View>

          {/* Department Performance */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Department Performance</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            {departmentPerformance.map((dept, index) => renderDepartmentCard(dept, index))}
          </View>

          {/* Recent Reports */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Reports</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            {recentReports.map((report, index) => renderRecentReport(report, index))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8F92A1',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for footer
  },
  greetingCard: {
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  greetingGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  greetingSubtext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },

  statCardGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  statCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
  },
  scoreSection: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  scoreCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreProgress: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667EEA',
  },
  graphContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  monthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8F92A1',
    flex: 1,
    textAlign: 'center',
  },
  graphBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  graphBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barGradient: {
    flex: 1,
  },
  deptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  deptIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  deptIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deptInfo: {
    flex: 1,
  },
  deptName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  deptProgressBar: {
    height: 6,
    backgroundColor: '#F0F0F5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  deptProgress: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  deptProgressGradient: {
    flex: 1,
  },
  deptPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667EEA',
    marginLeft: 12,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportIconText: {
    fontSize: 20,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportLocation: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F92A1',
  },
  reportTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F92A1',
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeFooterButton: {
    transform: [{ translateY: -4 }],
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8F92A1',
    marginTop: 4,
  },
  activeFooterText: {
    color: '#667EEA',
  },
});

export default AdminDashboard;