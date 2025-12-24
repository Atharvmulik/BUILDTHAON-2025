import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import GlassCard from '../components/GlassCard';
import HoverButton from '../components/HoverButton';
import Icon, { IconName } from '../components/icon';


interface StatCard {
  title: string;
  value: number;
  change: string;
  color: string;
  icon: IconName;
}

interface MonthlyTrend {
  month: string;
  issues: number;
}

interface DepartmentPerformance {
  department: string;
  progress: number;
}

interface RecentReport {
  id: string;
  title: string;
  location: string;
  status: string;
  time_ago: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [totalIssues, setTotalIssues] = useState(0);
  const [resolvedIssues, setResolvedIssues] = useState(0);
  const [pendingIssues, setPendingIssues] = useState(0);
  const [userName, setUserName] = useState<string>('Admin User'); // ADD THIS LINE

  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([
    { month: "Jan", issues: 45 },
    { month: "Feb", issues: 52 },
    { month: "Mar", issues: 48 },
    { month: "Apr", issues: 61 },
    { month: "May", issues: 55 },
    { month: "Jun", issues: 58 },
  ]);

  const [departmentPerformance, setDepartmentPerformance] = useState<DepartmentPerformance[]>([
    { department: "Public Works", progress: 0.85 },
    { department: "Transportation", progress: 0.72 },
    { department: "Parks & Recreation", progress: 0.63 },
    { department: "Public Safety", progress: 0.91 },
  ]);

  const [recentReports, setRecentReports] = useState<RecentReport[]>([
    { id: '1', title: "Pothole on Main St", location: "Downtown", status: "Resolved", time_ago: "2 hours ago" },
    { id: '2', title: "Street Light Out", location: "Northside", status: "In Progress", time_ago: "5 hours ago" },
    { id: '3', title: "Garbage Overflow", location: "East Park", status: "Pending", time_ago: "1 day ago" },
    { id: '4', title: "Broken Bench", location: "Central Square", status: "Resolved", time_ago: "3 days ago" },
  ]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setTotalIssues(156);
      setResolvedIssues(128);
      setPendingIssues(28);
      setUserName('Admin User'); // Set the username here if you get it from API

      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load dashboard data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return '#4CAF50';
      case 'in progress':
        return '#2196F3';
      case 'urgent':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getStatusIcon = (status: string): IconName => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'check-circle';
      case 'in progress':
        return 'build-circle';
      case 'urgent':
        return 'warning';
      default:
        return 'pending-actions';
    }
  };

  const getDepartmentColor = (progress: number): string => {
    if (progress >= 0.8) return '#4CAF50';
    if (progress >= 0.6) return '#2196F3';
    if (progress >= 0.4) return '#FF9800';
    return '#F44336';
  };

  const renderStatCard = (title: string, value: number, change: string, color: string, iconName: IconName) => (
    <GlassCard style={styles.statCard}>
      <View style={styles.statCardContent}>
        <Icon name={iconName} size={24} color={color} />
        <Text style={styles.statCardTitle}>{title}</Text>
        <Text style={[styles.statCardValue, { color }]}>{value}</Text>
        {change && <Text style={[styles.statCardChange, { color }]}>{change}</Text>}
      </View>
    </GlassCard>
  );

  const renderRecentReport = ({ item }: { item: RecentReport }) => (
    <GlassCard style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={[styles.statusIconContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Icon name={getStatusIcon(item.status)} size={20} color={getStatusColor(item.status)} />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{item.title}</Text>
          <Text style={styles.reportSubtitle}>{item.location} • {item.time_ago}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
    </GlassCard>
  );

  const renderDepartmentPerformance = ({ item, index }: { item: DepartmentPerformance, index: number }) => {
    const progressPercent = Math.round(item.progress * 100);
    const color = getDepartmentColor(item.progress);

    return (
      <View key={index} style={styles.deptRow}>
        <Text style={styles.deptName}>{item.department}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%`, backgroundColor: color }]} />
        </View>
        <Text style={[styles.progressPercent, { color }]}>{progressPercent}%</Text>
      </View>
    );
  };

  const renderMonthlyTrends = () => {
    const maxIssues = Math.max(...monthlyTrends.map(t => t.issues));
    const chartHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {monthlyTrends.map((trend, index) => {
            const barHeight = (trend.issues / maxIssues) * chartHeight;
            return (
              <View key={index} style={styles.chartBarGroup}>
                <View style={[styles.chartBar, { height: barHeight }]} />
                <Text style={styles.chartMonth}>{trend.month}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.chartYAxis}>
          {[0, 20, 40, 60].map((value, index) => (
            <Text key={index} style={styles.chartYLabel}>{value}</Text>
          ))}
        </View>
      </View>
    );
  };

  // Map navigation icons to valid icon names
  const getNavIconName = (iconKey: string): IconName => {
    switch (iconKey) {
      case 'dashboard':
        return 'dashboard';
      case 'analytics':
        return 'analytics'; // Use 'analytics' which exists in your IconName
      case 'report':
        return 'report'; // Use 'report' which exists in your IconName
      case 'map':
        return 'map';
      case 'person':
        return 'person';
      default:
        return 'dashboard';
    }
  };

  if (errorMessage && !isLoading) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorTitle}>Error Loading Dashboard</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <HoverButton
          title="Retry"
          onPress={loadDashboardData}
          icon="refresh"
          style={styles.retryButton}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleRow}>
            <Icon name="admin-panel-settings" size={24} color="#FFFFFF" />
            <Text style={styles.headerTitle}>UrbanSim AI</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={loadDashboardData} style={styles.headerButton}>
              <Icon name="refresh" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="logout" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.welcomeCard}>
            <View style={styles.welcomeContent}>
              <View style={styles.avatarContainer}>
                <Icon name="admin-panel-settings" size={36} color="#6C63FF" />
              </View>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeTitle}>
                  Hello, {userName?.split(' ').pop()} 👋
                </Text>
                <Text style={styles.welcomeSubtitle}>
                  Monitor and manage city issues efficiently
                </Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.statsSection}>
            {isLoading ? (
              <View style={styles.loadingStats}>
                {[1, 2, 3].map((_, index) => (
                  <GlassCard key={index} style={styles.loadingCard}>
                    <ActivityIndicator size="small" color="#6C63FF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                  </GlassCard>
                ))}
              </View>
            ) : (
              <View style={styles.statsGrid}>
                {renderStatCard("Total Issues", totalIssues, "+15% vs last month", "#6C63FF", "task-alt")}
                {renderStatCard("Resolved", resolvedIssues, "+20%", "#4CAF50", "verified")}
                {renderStatCard("Pending", pendingIssues, "-5%", "#FF9800", "pending-actions")}
              </View>
            )}
          </View>

          <Text style={styles.sectionTitle}>Monthly Trends</Text>
          <GlassCard style={styles.trendsCard}>
            {isLoading ? (
              <View style={styles.chartLoading}>
                <ActivityIndicator size="large" color="#6C63FF" />
                <Text style={styles.loadingText}>Loading trends...</Text>
              </View>
            ) : (
              renderMonthlyTrends()
            )}
          </GlassCard>

          <Text style={styles.sectionTitle}>Department Performance</Text>
          <GlassCard style={styles.deptCard}>
            {departmentPerformance.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No department data available</Text>
              </View>
            ) : (
              <View style={styles.deptList}>
                {departmentPerformance.map((dept, index) =>
                  renderDepartmentPerformance({ item: dept, index })
                )}
              </View>
            )}
          </GlassCard>

          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {recentReports.length === 0 ? (
            <GlassCard style={styles.emptyReportsCard}>
              <Text style={styles.emptyText}>No recent reports available</Text>
            </GlassCard>
          ) : (
            <FlatList
              data={recentReports}
              renderItem={renderRecentReport}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.reportsList}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {['dashboard', 'analytics', 'report', 'map', 'person'].map((icon, index) => (
          <TouchableOpacity
            key={icon}
            style={[styles.navItem, selectedIndex === index && styles.navItemActive]}
            onPress={() => setSelectedIndex(index)}
          >
            <Icon
              name={getNavIconName(icon)} // Fixed: using mapped icon names
              size={24}
              color={selectedIndex === index ? '#6C63FF' : '#9E9E9E'}
            />
            <Text style={[
              styles.navLabel,
              { color: selectedIndex === index ? '#6C63FF' : '#9E9E9E' }
            ]}>
              {['Dashboard', 'Dept Analysis', 'Issue Reports', 'Map View', 'Profile'][index]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  // ... (ALL YOUR EXISTING STYLES REMAIN THE SAME)
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 24,
    borderRadius: 20,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#6C63FF20',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#666666',
    fontStyle: 'italic',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statCardContent: {
    padding: 16,
    alignItems: 'center',
  },
  statCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  statCardChange: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadingCard: {
    width: '48%',
    marginBottom: 12,
    padding: 16,
    alignItems: 'center',
    borderRadius: 18,
  },
  loadingText: {
    marginTop: 8,
    color: '#9E9E9E',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6C63FF',
    marginBottom: 10,
    marginTop: 4,
  },
  trendsCard: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 18,
    height: 220,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  chartYAxis: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  chartYLabel: {
    fontSize: 12,
    color: '#666666',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  chartBarGroup: {
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    backgroundColor: '#6C63FF',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 8,
  },
  chartMonth: {
    fontSize: 12,
    color: '#666666',
  },
  chartLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deptCard: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 18,
  },
  deptList: {
    marginTop: 8,
  },
  deptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  deptName: {
    flex: 2,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  progressBarContainer: {
    flex: 4,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: 'bold',
    minWidth: 36,
    textAlign: 'right',
  },
  reportsList: {
    paddingBottom: 20,
  },
  reportCard: {
    marginBottom: 8,
    borderRadius: 18,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  reportSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyReportsCard: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    minHeight: 120,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {},
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F5F5F5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default AdminDashboard;