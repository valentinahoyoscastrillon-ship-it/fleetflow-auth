import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LogoutConfirm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConfirmLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)] border border-border">
          <div className="text-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
              <LogOut className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-secondary mb-4">
              Cerrar Sesión
            </h1>
            <p className="text-muted-foreground text-lg">
              ¿Estás seguro de que quieres cerrar sesión?
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleConfirmLogout}
              className="w-full"
              size="lg"
            >
              Aceptar
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
