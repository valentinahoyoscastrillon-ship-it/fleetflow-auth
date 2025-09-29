import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(currentUser));
      toast({
        title: "¡Sesión iniciada correctamente!",
        description: "Bienvenido al sistema de optimización de transporte.",
      });
    }
  }, [navigate, toast]);

  // Datos de ejemplo para la tabla de rutas
  const rutasEjemplo = [
    { id: "R001", origen: "Guayaquil", destino: "Quito" },
    { id: "R002", origen: "Cuenca", destino: "Guayaquil" },
    { id: "R003", origen: "Quito", destino: "Cuenca" },
    { id: "R004", origen: "Manta", destino: "Guayaquil" },
    { id: "R005", origen: "Loja", destino: "Cuenca" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <nav className="bg-secondary shadow-[var(--shadow-medium)] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Truck className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary-foreground">
                  Sistema de Transporte
                </h1>
                <p className="text-sm text-secondary-foreground/70">
                  Optimización y Distribución
                </p>
              </div>
            </div>

            <Button 
              className="flex items-center space-x-2"
              onClick={() => navigate("/logout-confirm")}
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)] border border-border mb-8">
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Bienvenido, {user.nombre} {user.apellido}
          </h2>
          <div className="space-y-1 text-muted-foreground">
            <p>
              <span className="font-semibold">Rol:</span> {user.rol}
            </p>
            <p>
              <span className="font-semibold">Cédula:</span> {user.cedula}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)] border border-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-secondary">
              Gestión de Rutas
            </h3>
          </div>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">ID de Ruta</TableHead>
                  <TableHead className="font-bold">Origen</TableHead>
                  <TableHead className="font-bold">Destino</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rutasEjemplo.map((ruta) => (
                  <TableRow key={ruta.id}>
                    <TableCell className="font-medium">{ruta.id}</TableCell>
                    <TableCell>{ruta.origen}</TableCell>
                    <TableCell>{ruta.destino}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
