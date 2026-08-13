import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export const INVITE_URL = "https://shre.ink/preparatorioexame";

const inviteText = `Estou a preparar o exame de admissão para Engenharia Informática com a LUANDA PREP. É gratuito e aberto a todos: ${INVITE_URL}`;

type ShareInviteButtonProps = {
  compact?: boolean;
  className?: string;
};

export function ShareInviteButton({ compact = false, className = "" }: ShareInviteButtonProps) {
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (!shared) return;
    const timer = window.setTimeout(() => setShared(false), 2600);
    return () => window.clearTimeout(timer);
  }, [shared]);

  const shareInvite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "LUANDA PREP", text: inviteText, url: INVITE_URL });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(inviteText);
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(inviteText)}`, "_blank", "noopener,noreferrer");
      }
      setShared(true);
    } catch {
      // Cancelar a folha nativa de partilha não deve apresentar um erro ao estudante.
    }
  };

  return (
    <Button
      type="button"
      onClick={shareInvite}
      aria-label="Convidar um amigo para usar a LUANDA PREP"
      title="Convidar um amigo"
      className={`rounded-xl ${compact ? "h-10 px-3" : "h-auto px-4 py-3"} ${className}`}
    >
      {shared ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
      {shared ? "Convite preparado" : compact ? "Convidar" : "Convidar um amigo"}
    </Button>
  );
}
