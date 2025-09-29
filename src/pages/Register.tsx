import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roles = ["Administrador", "Operador", "Conductor", "Supervisor"];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cedula: "",
    celular: "",
    nombre: "",
    apellido: "",
    email: "",
    rol: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    // Validar que la contraseña tenga al menos 12 caracteres
    if (formData.password.length < 12) {
      toast({
        title: "¡Contraseña inválida!",
        description: "Debe tener mínimo 12 caracteres.",
        variant: "destructive",
      });
      return false;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "¡Confirmación de contraseña no coincide!",
        description: "Las contraseñas deben ser iguales.",
        variant: "destructive",
      });
      return false;
    }

    // Validar que el usuario no exista
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u: any) => u.email === formData.email || u.cedula === formData.cedula
    );

    if (existingUser) {
      toast({
        title: "¡Usuario ya existe!",
        description: "Asegúrese que el correo y cédula no hayan sido utilizados anteriormente.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Guardar usuario
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = {
      cedula: formData.cedula,
      celular: formData.celular,
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      rol: formData.rol,
      password: formData.password, // En producción, esto debería ser hasheado
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast({
      title: "¡El usuario fue registrado de forma exitosa!",
      description: `Usuario ${formData.nombre} ${formData.apellido} registrado correctamente.`,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
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
            <div className="bg-secondary/10 p-4 rounded-full inline-block mb-4">
              <UserPlus className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Registrar Usuario
            </h1>
            <p className="text-muted-foreground">
              Completa el formulario para crear una nueva cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cedula">Número de Cédula *</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="1234567890"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="celular">Número de Celular *</Label>
                <Input
                  id="celular"
                  type="tel"
                  placeholder="0987654321"
                  value={formData.celular}
                  onChange={(e) => handleInputChange("celular", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  type="text"
                  placeholder="Pérez"
                  value={formData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rol">Rol *</Label>
              <Select
                value={formData.rol}
                onValueChange={(value) => handleInputChange("rol", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((rol) => (
                    <SelectItem key={rol} value={rol}>
                      {rol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 12 caracteres"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                La contraseña debe tener al menos 12 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme su contraseña"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                required
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Usuario"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>¿Ya tienes cuenta?</p>
            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="text-primary"
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
