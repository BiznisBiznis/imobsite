import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  Eye,
  MousePointer,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  Globe,
} from "lucide-react";
import { analyticsService } from "@/services/api";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

// Format date for display
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, 'PPpp', { locale: ro });
  } catch (error) {
    return dateString; // Return original string if date parsing fails
  }
};

// Format duration in seconds to MM:SS
const formatDuration = (seconds: number) => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch analytics data
  const { 
    data: analyticsData, 
    isLoading, 
    refetch: refreshAnalytics 
  } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => analyticsService.getStats(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch visitor logs
  const { 
    data: logsData, 
    isLoading: isLoadingLogs, 
    refetch: refreshLogs 
  } = useQuery({
    queryKey: ['visitor-logs'],
    queryFn: () => analyticsService.getVisitorLogs(1, 50),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch daily stats
  const { 
    data: dailyStatsData, 
    isLoading: isLoadingDailyStats 
  } = useQuery({
    queryKey: ['daily-stats', timeRange],
    queryFn: () => analyticsService.getDailyStats(parseInt(timeRange)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: timeRange !== '1d', // Don't fetch for 'today' view
  });

  // Fetch page stats
  const { 
    data: pageStatsData, 
    isLoading: isLoadingPageStats 
  } = useQuery({
    queryKey: ['page-stats'],
    queryFn: () => analyticsService.getPageStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  // Handle refresh
  const refreshData = () => {
    refreshAnalytics();
    refreshLogs();
  };

  // Calculate totals from analytics data
  const totalVisitors = analyticsData?.data?.totalVisitors || 0;
  const uniqueVisitors = analyticsData?.data?.uniqueVisitors || 0;
  const pageViews = analyticsData?.data?.pageViews || 0;
  const avgSessionDuration = analyticsData?.data?.avgSessionDuration || '0:00';
  const bounceRate = analyticsData?.data?.bounceRate || '0%';
  const topCountry = analyticsData?.data?.topCountry || 'N/A';
  
  // Prepare chart data
  const chartData = dailyStatsData?.data?.map(day => ({
    date: format(new Date(day.date), 'MMM d'),
    visitors: day.uniqueVisitors,
    pageViews: day.pageViews
  })) || [];

  // Prepare page stats
  const pageStats = pageStatsData?.data?.map(page => ({
    page: page.path,
    views: page.views,
    uniqueViews: page.uniqueVisitors,
    avgTime: formatDuration(page.avgTimeOnPage)
  })) || [];

  // Prepare visitor logs
  const visitorLogs = (logsData?.data?.data || []).map((log: any) => ({
    id: log.id,
    ip: log.ipAddress,
    page: log.page,
    referrer: log.referrer || 'Direct',
    date: formatDate(log.visitedAt),
    duration: formatDuration(log.duration)
  }));

  // Handle CSV export
  const handleExport = () => {
    const header = "Timestamp,IP,Page,Referrer,Duration\n";
    const csvContent = visitorLogs
      .map(log => 
        `"${log.date}",${log.ip},"${log.page}","${log.referrer}",${log.duration}`
      )
      .join("\n");
    
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitor-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return "📱";
      case "tablet":
        return "📱";
      case "desktop":
        return "💻";
      default:
        return "💻";
    }
  };

  // Tabs for different views
  const tabs = [
    { id: 'overview', label: 'Prezentare generală' },
    { id: 'pages', label: 'Pagini' },
    { id: 'visitors', label: 'Vizitatori' },
  ];

  if (isLoading || isLoadingLogs || isLoadingDailyStats || isLoadingPageStats) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Monitorizează performanța site-ului și activitatea vizitatorilor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Perioadă" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Astăzi</SelectItem>
              <SelectItem value="7">Ultimele 7 zile</SelectItem>
              <SelectItem value="30">Ultimele 30 de zile</SelectItem>
              <SelectItem value="90">Ultimele 90 de zile</SelectItem>
              <SelectItem value="365">Ultimul an</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={refreshData} 
            disabled={isLoading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            Actualizează
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={visitorLogs.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportă CSV
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vizitatori Totali</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVisitors}</div>
                <p className="text-xs text-muted-foreground">
                  {uniqueVisitors} vizitatori unici
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagini Vizualizate</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pageViews}</div>
                <p className="text-xs text-muted-foreground">
                  {pageStats.length} pagini urmărite
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durată Medie</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSessionDuration}</div>
                <p className="text-xs text-muted-foreground">
                  per vizită
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Țară Top</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{topCountry}</div>
                <p className="text-xs text-muted-foreground">
                  {bounceRate} rată de respingere
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Trafic</CardTitle>
              <CardDescription>
                Evoluția traficului în perioada selectată
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="visitors"
                      name="Vizitatori"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="pageViews"
                      name="Pagini vizualizate"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span>Nu există date pentru perioada selectată</span>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <Card>
          <CardHeader>
            <CardTitle>Statistici pagini</CardTitle>
            <CardDescription>
              Cele mai vizualizate pagini și performanța acestora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pagină</TableHead>
                  <TableHead className="text-right">Vizualizări</TableHead>
                  <TableHead className="text-right">Vizitatori Unici</TableHead>
                  <TableHead className="text-right">Timp Mediu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageStats.map((page) => (
                  <TableRow key={page.page}>
                    <TableCell className="whitespace-nowrap">
                      {page.page}
                    </TableCell>
                    <TableCell className="text-right">
                      {page.views}
                    </TableCell>
                    <TableCell className="text-right">
                      {page.uniqueViews}
                    </TableCell>
                    <TableCell className="text-right">
                      {page.avgTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Visitors Tab */}
      {activeTab === 'visitors' && (
        <Card>
          <CardHeader>
            <CardTitle>Vizitatori</CardTitle>
            <CardDescription>
              Informații despre vizitatori și activitatea acestora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dată</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Pagină</TableHead>
                  <TableHead>Referință</TableHead>
                  <TableHead className="text-right">Durată</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitorLogs.length > 0 ? (
                  visitorLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
                        {log.date}
                      </TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {log.page}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {log.referrer}
                      </TableCell>
                      <TableCell className="text-right">
                        {log.duration}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={5} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="h-8 w-8" />
                        <span>Nu există date disponibile</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAnalytics;
