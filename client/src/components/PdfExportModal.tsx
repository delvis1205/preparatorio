import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { Download, FileText, Sparkles, AlertCircle, Award } from "lucide-react";

interface PdfExportModalProps {
  defaultModuleId?: string;
  defaultType?: "guide" | "exam" | "errors";
  triggerButton?: React.ReactNode;
}

export function PdfExportModal({ defaultModuleId, defaultType = "guide", triggerButton }: PdfExportModalProps) {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState<string>(defaultType);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(defaultModuleId || "all");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [includeAnswers, setIncludeAnswers] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const catalog = trpc.learning.catalog.useQuery();
  const modules = catalog.data?.modules || [];

  const handleDownload = () => {
    setIsGenerating(true);
    const params = new URLSearchParams();
    params.append("type", exportType);

    if (exportType === "guide") {
      if (selectedModuleId !== "all") {
        params.append("moduleId", selectedModuleId);
      } else if (selectedDiscipline !== "all") {
        params.append("discipline", selectedDiscipline);
      }
    }
    params.append("answers", String(includeAnswers));

    const filenames: Record<string, string> = {
      guide: selectedModuleId !== "all" ? `luanda-prep-modulo-${selectedModuleId}.pdf` : "luanda-prep-guia-estudo.pdf",
      exam: "luanda-prep-simulado-prova.pdf",
      errors: "luanda-prep-ficha-erros.pdf",
    };

    const url = `/api/export/pdf?${params.toString()}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filenames[exportType] || "luanda-prep-documento.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setIsGenerating(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" className="gap-2 rounded-xl border-[#BFD0FF] bg-[#F1F5FF] text-[#0A36A8] hover:bg-[#E7EDFF]">
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-6">
        <DialogHeader>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7EDFF] text-[#0A36A8] mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <DialogTitle className="font-display text-2xl text-slate-950">Central de Exportação em PDF</DialogTitle>
          <DialogDescription className="text-slate-600 text-sm">
            Exporte guias de estudo oficiais, cadernos de simulados para exame impresso ou fichas de revisão focadas nas suas dificuldades.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="rounded-2xl border border-blue-200 bg-[#F4F7FF] p-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-bold text-[#0A36A8] mb-1">Como exportar e partilhar com amigos:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Escolha o formato pretendido (Guia, Prova ou Erros).</li>
              <li>Selecione o módulo ou disciplina caso deseje filtrar.</li>
              <li>Clique em <strong>Descarregar PDF</strong> para obter o documento no seu dispositivo e imprimi-lo ou enviá-lo.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-type-select" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tipo de Documento
            </Label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger id="export-type-select" className="rounded-xl border-slate-200">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guide">📖 Guia de Estudo (Teoria, Aulas e Exercícios)</SelectItem>
                <SelectItem value="exam">📝 Prova de Simulado (Formato para Exame Impresso)</SelectItem>
                <SelectItem value="errors">⚠️ Ficha de Erros Personalizada (Baseada nas suas tentativas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {exportType === "guide" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="module-select" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Módulo Específico ou Tema
                </Label>
                <Select value={selectedModuleId} onValueChange={(val) => { setSelectedModuleId(val); if (val !== "all") setSelectedDiscipline("all"); }}>
                  <SelectTrigger id="module-select" className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Todos os módulos (guia completo)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">🌟 Todos os módulos (Guia Geral)</SelectItem>
                    {modules.map((mod: any) => (
                      <SelectItem key={mod.id} value={mod.id}>
                        {mod.discipline}: {mod.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedModuleId === "all" && (
                <div className="space-y-2">
                  <Label htmlFor="discipline-select" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Ou Filtrar por Disciplina
                  </Label>
                  <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                    <SelectTrigger id="discipline-select" className="rounded-xl border-slate-200">
                      <SelectValue placeholder="Todas as disciplinas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as disciplinas</SelectItem>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                      <SelectItem value="Desenho e Geometria Descritiva">Desenho e Geometria Descritiva</SelectItem>
                      <SelectItem value="Língua Portuguesa">Língua Portuguesa</SelectItem>
                      <SelectItem value="Cultura Geral">Cultura Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {exportType === "exam" && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs text-blue-900 leading-relaxed">
              <strong>Simulado Impresso:</strong> Gera um caderno de exame com questões selecionadas, espaço para rascunho e cabeçalho oficial pronto para impressão.
            </div>
          )}

          {exportType === "errors" && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 leading-relaxed">
              <strong>Ficha de Revisão de Erros:</strong> Agrupa as questões em que registou respostas incorretas, incluindo o gabarito explicado e dicas contra erros comuns.
            </div>
          )}

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="include-answers" className="font-bold text-slate-900 text-sm">
                {exportType === "guide" ? "Incluir gabarito e explicações" : exportType === "exam" ? "Incluir folha de respostas no final" : "Incluir explicações detalhadas"}
              </Label>
              <p className="text-xs text-slate-500">
                Ative para incluir soluções e explicações. Desative para gerar um caderno limpo de rascunho.
              </p>
            </div>
            <Switch id="include-answers" checked={includeAnswers} onCheckedChange={setIncludeAnswers} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 leading-relaxed">
            <strong>Marca d’água e Autoria:</strong> Todos os documentos gerados incluem o timbre oficial do <strong>LUANDA PREP</strong>, criados por <strong>Delvis de Morais (Morásio Digital)</strong>.
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
            Cancelar
          </Button>
          <Button onClick={handleDownload} disabled={isGenerating} className="rounded-xl bg-[#0A36A8] text-white hover:bg-[#092e90]">
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "A gerar PDF..." : "Descarregar PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
