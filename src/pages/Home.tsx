import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, Shield } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Truck className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Sistema de Optimización de Transporte
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestión integral de distribución y logística empresarial
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 border border-border">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">
                  Iniciar Sesión
                </h2>
                <p className="text-muted-foreground mb-6">
                  Accede a tu cuenta con tus credenciales
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="w-full max-w-xs"
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 border border-border">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">
                  Registrar Usuario
                </h2>
                <p className="text-muted-foreground mb-6">
                  Crear una nueva cuenta en el sistema
                </p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/register")}
                className="w-full max-w-xs"
              >
                Registrar Usuario
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Sistema seguro con encriptación de datos y control de accesos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
