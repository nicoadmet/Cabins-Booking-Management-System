
export const validateRegister  = (data) => {
  const errors = {};
  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(data.name)) {
  errors.name = "El nombre debe tener al menos 3 letras y solo contener caracteres válidos";
    }

  if (!data.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "El email no es válido";
  }

  if (!data.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password)) {
    errors.password = "Mínimo 8 caracteres, incluyendo letras y números";
  }

  return errors 
}
