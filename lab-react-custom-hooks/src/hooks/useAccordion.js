// Iteration 5 (BONUS)
import { useState } from "react";

const useAccordion = (initialValue = false) => {
  // Definimos si el acordeón está abierto o cerrado.
  // Por defecto es 'false' (cerrado).
  const [isOpen, setIsOpen] = useState(initialValue);
  
  // Función para alternar el estado del acordeón
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };


  // controles de open y close
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close};


};

export default useAccordion;

// yo no use la función de REACT useCallback.. Se usa para evitar que se renderize innnecesariamente
// se añaden en las const open = useCallback(); la función arrow