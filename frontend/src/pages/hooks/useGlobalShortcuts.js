import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useGlobalShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      // Don't trigger while typing
      const tag = document.activeElement?.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      if (!e.altKey) return;

      switch (e.key.toLowerCase()) {
        case "d":
          e.preventDefault();
          navigate("/dashboard");
          break;

        case "c":
          e.preventDefault();
          navigate("/customer");
          break;

        case "s":
          e.preventDefault();
          navigate("/supplier");
          break;

        case "i":
          e.preventDefault();
          navigate("/stock");
          break;

        case "p":
          e.preventDefault();
          navigate("/purchase");
          break;

        case "l":
          e.preventDefault();
          navigate("/sales");
          break;

        case "r":
          e.preventDefault();
          navigate("/reports");
          break;

        case "u":
          e.preventDefault();
          navigate("/users");
          break;

        case "g":
          e.preventDefault();
          navigate("/groups");
          break;

        case "k":
          e.preventDefault();
          navigate("/ledgers");
          break;

        case "q":
          e.preventDefault();

          localStorage.clear();

          navigate("/");

          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener(
        "keydown",
        handler
      );
    };
  }, [navigate]);
}

export default useGlobalShortcuts;