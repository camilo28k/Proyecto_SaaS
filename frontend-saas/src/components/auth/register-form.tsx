import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function RegisterForm() {
  return (
    <form className="grid gap-4">
      <Input type="text" placeholder="Nombre completo" required />
      <Input type="email" placeholder="Correo electronico" required />
      <Input type="password" placeholder="Contrasena" required />
      <Button className="w-full">Registrarse</Button>
    </form>
  );
}
