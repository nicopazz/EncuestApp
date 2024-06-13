// Debe contener al menos una letra minúscula [a-z].
// Debe contener al menos una letra mayúscula [A-Z].
// Debe contener al menos un dígito.
// Debe contener al menos un carácter especial entre @, $, !, %, *, ? o &.
// La contraseña puede contener cualquier combinación de letras (mayúsculas y minúsculas), dígitos y los caracteres especiales mencionados.
// La longitud mínima de la contraseña debe ser de al menos 8 caracteres {8,}.
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

