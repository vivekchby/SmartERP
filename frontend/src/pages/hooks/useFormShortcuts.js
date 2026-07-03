import { useEffect } from "react";

function useFormShortcuts({
  onSave,
  onNew,
  onClose,
  searchRef,
}) {
  useEffect(() => {
    const handler = (e) => {
      // Ctrl + S
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave?.();
      }

      // Ctrl + N
      if (e.ctrlKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        onNew?.();
      }

      // Ctrl + F
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchRef?.current?.focus();
      }

      // Esc
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [onSave, onNew, onClose, searchRef]);
}

export default useFormShortcuts;