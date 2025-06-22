import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  Users,
  TrendingUp,
  Eye,
  Plus,
  BarChart3,
  Settings,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock statistics - in a real app, this would come from an API
  const stats = [
    {
      title: "Total Proprietăți",
      value: "6",
      description: "Proprietăți active în portofoliu",
      icon: Building,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Membri Echipă",
      value: "6",
      description: "Agenți imobiliari activi",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Valoare Totală",
      value: "€1.8M",
      description: "Valoarea totală a proprietăților",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Vizitatori Astăzi",
      value: "127",
      description: "Vizitatori unici pe site",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivities = [
    'Proprietatea "Garsonieră ultracentral" a fost vizualizată de 15 ori',
    "Alexandra Trâmbițașu a fost contactată pentru proprietatea #3",
    'Nouă căutare: "apartament 3 camere București"',
    'Proprietatea "Teren Chiaoda" a fost adăugată în favorite',
    'Contact nou de la pagina "Echipa"',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-2">
          Bine ai venit! Aici poți gestiona proprietățile și echipa.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Rapide</CardTitle>
            <CardDescription>Operațiuni frecvent utilizate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => navigate("/admin/properties")}
              className="w-full justify-start bg-red-600 hover:bg-red-700 text-white h-auto p-4"
            >
              <Plus className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Adaugă Proprietate Nouă</div>
                <div className="text-sm opacity-90">
                  Creează o nouă listare de proprietate
                </div>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/admin/team")}
              variant="outline"
              className="w-full justify-start h-auto p-4"
            >
              <Users className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Adaugă Membru Echipă</div>
                <div className="text-sm text-gray-600">
                  Înregistrează un nou agent imobiliar
                </div>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/admin/analytics")}
              variant="outline"
              className="w-full justify-start h-auto p-4"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Vizualizează Analytics</div>
                <div className="text-sm text-gray-600">
                  Accesează statistici și loguri detaliate
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activitate Recentă</CardTitle>
            <CardDescription>Ultimele evenimente din sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Proprietăți Recente</CardTitle>
          <CardDescription>
            Ultimele proprietăți adăugate în sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  Garsonieră dublă ultracentral - Bulevardul Carol Nr. 62
                </div>
                <div className="text-sm text-gray-600">
                  €61,000 • 35 mp • Apartament
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">Azi</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin/properties")}
                  className="text-red-600 hover:text-red-700"
                >
                  Vezi
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  Apartament 3 camere Pipera Școala Americană
                </div>
                <div className="text-sm text-gray-600">
                  €150,000 • 85 mp • Apartament
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">Ieri</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin/properties")}
                  className="text-red-600 hover:text-red-700"
                >
                  Vezi
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  Teren pentru construcție bloc | sau duplexuri | 710 mp
                </div>
                <div className="text-sm text-gray-600">
                  €69,900 • 710 mp • Teren
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">Acum 2 zile</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin/properties")}
                  className="text-red-600 hover:text-red-700"
                >
                  Vezi
                </Button>
              </div>
            </div>

            <div className="pt-3 border-t">
              <Button
                onClick={() => navigate("/admin/properties")}
                variant="outline"
                className="w-full"
              >
                Vezi Toate Proprietățile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
