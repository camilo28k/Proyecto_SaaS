import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function LoginForm() {
  return (
    <form className="grid gap-4">
      <Input type="email" placeholder="Correo electronico" required />
      <Input type="password" placeholder="Contrasena" required />
      <Button className="w-full">Iniciar sesion</Button>
    </form>
  );
}
