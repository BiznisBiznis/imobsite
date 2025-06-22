import { useState, useEffect } from "react";
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
} from "lucide-react";

// Mock analytics data
const mockVisitorLogs = [
  {
    id: 1,
    ip: "192.168.1.45",
    location: "București, România",
    device: "Desktop",
    browser: "Chrome 120",
    page: "/proprietati",
    timestamp: "2024-01-15 14:30:25",
    duration: "2:45",
    referrer: "Google Search",
  },
  {
    id: 2,
    ip: "10.0.0.123",
    location: "Cluj-Napoca, România",
    device: "Mobile",
    browser: "Safari 17",
    page: "/",
    timestamp: "2024-01-15 14:28:12",
    duration: "1:23",
    referrer: "Direct",
  },
  {
    id: 3,
    ip: "172.16.0.89",
    location: "Timișoara, România",
    device: "Tablet",
    browser: "Firefox 121",
    page: "/echipa",
    timestamp: "2024-01-15 14:25:45",
    duration: "3:12",
    referrer: "Facebook",
  },
  {
    id: 4,
    ip: "203.45.123.78",
    location: "Constanța, România",
    device: "Desktop",
    browser: "Edge 120",
    page: "/proprietate/1",
    timestamp: "2024-01-15 14:22:33",
    duration: "4:56",
    referrer: "Google Ads",
  },
  {
    id: 5,
    ip: "192.168.0.201",
    location: "Iași, România",
    device: "Mobile",
    browser: "Chrome 120",
    page: "/contact",
    timestamp: "2024-01-15 14:18:09",
    duration: "1:55",
    referrer: "Instagram",
  },
];

const mockDailyStats = [
  { date: "2024-01-09", visitors: 45, pageViews: 123, newUsers: 23 },
  { date: "2024-01-10", visitors: 52, pageViews: 145, newUsers: 28 },
  { date: "2024-01-11", visitors: 48, pageViews: 132, newUsers: 22 },
  { date: "2024-01-12", visitors: 61, pageViews: 167, newUsers: 34 },
  { date: "2024-01-13", visitors: 58, pageViews: 159, newUsers: 31 },
  { date: "2024-01-14", visitors: 67, pageViews: 189, newUsers: 38 },
  { date: "2024-01-15", visitors: 73, pageViews: 201, newUsers: 42 },
];

const mockPageStats = [
  { page: "/", views: 1245, uniqueViews: 892 },
  { page: "/proprietati", views: 987, uniqueViews: 743 },
  { page: "/proprietate/*", views: 654, uniqueViews: 521 },
  { page: "/echipa", views: 432, uniqueViews: 356 },
  { page: "/contact", views: 289, uniqueViews: 234 },
];

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [visitorLogs, setVisitorLogs] = useState(mockVisitorLogs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const todaysStats = {
    totalVisitors: 127,
    uniqueVisitors: 89,
    pageViews: 324,
    avgSessionDuration: "2:34",
    bounceRate: "45.2%",
    topCountry: "România",
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Simulate CSV export
    const csvContent = visitorLogs
      .map(
        (log) =>
          `${log.timestamp},${log.ip},${log.location},${log.device},${log.browser},${log.page},${log.duration},${log.referrer}`,
      )
      .join("\n");

    const header =
      "Timestamp,IP,Location,Device,Browser,Page,Duration,Referrer\n";
    const blob = new Blob([header + csvContent], { type: "text/csv" });
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics & Loguri
          </h1>
          <p className="text-gray-600 mt-2">
            Monitorizează traficul și comportamentul vizitatorilor
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Ultimele 24h</SelectItem>
              <SelectItem value="7d">Ultimele 7 zile</SelectItem>
              <SelectItem value="30d">Ultimele 30 zile</SelectItem>
              <SelectItem value="90d">Ultimele 90 zile</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Se actualizează..." : "Actualizează"}
          </Button>
          <Button
            onClick={handleExport}
            className="bg-red-600 hover:bg-red-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Today's Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vizitatori Totali
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysStats.totalVisitors}
            </div>
            <p className="text-xs text-green-600">+12% față de ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vizitatori Unici
            </CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysStats.uniqueVisitors}
            </div>
            <p className="text-xs text-green-600">+8% față de ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vizualizări</CardTitle>
            <MousePointer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.pageViews}</div>
            <p className="text-xs text-green-600">+15% față de ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durata Medie</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysStats.avgSessionDuration}
            </div>
            <p className="text-xs text-green-600">+5% față de ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rata de Respingere
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.bounceRate}</div>
            <p className="text-xs text-red-600">+2% față de ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Țara Principală
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">🇷🇴</div>
            <p className="text-xs text-gray-600">{todaysStats.topCountry}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trafic Zilnic</CardTitle>
            <CardDescription>
              Vizitatori și vizualizări în ultimele 7 zile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockDailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("ro-RO", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Vizitatori"
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name="Vizualizări"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagini Populare</CardTitle>
            <CardDescription>Cele mai vizitate pagini</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockPageStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#dc2626" name="Vizualizări Totale" />
                <Bar
                  dataKey="uniqueViews"
                  fill="#16a34a"
                  name="Vizualizări Unice"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visitor Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Loguri Vizitatori în Timp Real</CardTitle>
          <CardDescription>
            Ultimele sesiuni de vizitatori pe site (actualizat automat)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Locație</TableHead>
                <TableHead>Dispozitiv</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Pagină</TableHead>
                <TableHead>Durata</TableHead>
                <TableHead>Sursă</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitorLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm font-mono">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🇷🇴</span>
                      <span className="text-sm">{log.location}</span>
                    </div>
                    <div className="text-xs text-gray-500">{log.ip}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{getDeviceIcon(log.device)}</span>
                      <span className="text-sm">{log.device}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.browser}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {log.page}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {log.duration}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.referrer === "Direct"
                          ? "secondary"
                          : log.referrer.includes("Google")
                            ? "default"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {log.referrer}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
