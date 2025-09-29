import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Truck, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
    navigate("/");
  };

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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                  <AlertDialogDescription>
                    ¿Estás seguro que deseas cerrar tu sesión actual? Deberás
                    iniciar sesión nuevamente para acceder al sistema.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Cerrar Sesión
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)] border border-border mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                Bienvenido, {user.nombre} {user.apellido}
              </h2>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <span className="font-semibold">Rol:</span> {user.rol}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold">Cédula:</span> {user.cedula}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">
              Seguridad
            </h3>
            <p className="text-muted-foreground">
              Sistema con autenticación segura y control de accesos
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">
              Gestión de Transporte
            </h3>
            <p className="text-muted-foreground">
              Optimización de rutas y distribución de mercancías
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">
              Gestión de Usuarios
            </h3>
            <p className="text-muted-foreground">
              Control total sobre permisos y roles del sistema
            </p>
          </div>
        </div>

        <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-secondary mb-2">
            Módulos disponibles próximamente
          </h3>
          <p className="text-muted-foreground">
            Pronto estarán disponibles más funcionalidades para optimizar tus
            operaciones de transporte y distribución.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
