import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutos

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLocked) {
      toast({
        title: "Cuenta bloqueada temporalmente",
        description: "Por favor, espere 5 minutos antes de intentar nuevamente.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      // Login exitoso
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: `Bienvenido, ${user.nombre} ${user.apellido}`,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      // Login fallido
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        toast({
          title: "Demasiados intentos fallidos",
          description: "Su cuenta ha sido bloqueada temporalmente por 5 minutos.",
          variant: "destructive",
        });

        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, LOCKOUT_TIME);
      } else {
        toast({
          title: "Credenciales incorrectas",
          description: `La información no es correcta. Intentos restantes: ${MAX_ATTEMPTS - newAttempts}`,
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>

        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)] border border-border">
          <div className="text-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
              <LogIn className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLocked}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLocked}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading || isLocked}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>¿No tienes cuenta?</p>
            <Button
              variant="link"
              onClick={() => navigate("/register")}
              className="text-primary"
            >
              Registrar nuevo usuario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
