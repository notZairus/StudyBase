import { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  handleKeyDown,
  shortcuts,
  TextAreaCommandOrchestrator,
  getCommands,
} from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";
import FileInput from "./FileInput";
import { useForm } from "react-hook-form";
import { AlertCircle, Tag, X, FileText } from "lucide-react";
import type { NoteDTO } from "../schemas/note.schema";
import { createNoteSchema } from "../schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useDocumentTextExtraction } from "../hooks/useDocumentTextExtraction";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useCreateNote } from "../hooks/useCreateNote";

function AddNoteModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const orchestratorRef = useRef<TextAreaCommandOrchestrator>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<NoteDTO>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      subjects: [],
      content: "",
    },
  });
  const documentExtraction = useDocumentTextExtraction();
  const createNote = useCreateNote();

  const [subjectInput, setSubjectInput] = useState("");

  const title = watch("title");
  const subjects = watch("subjects");
  const content = watch("content");

  useEffect(() => {
    if (textareaRef.current) {
      orchestratorRef.current = new TextAreaCommandOrchestrator(
        textareaRef.current,
      );
    }
  }, []);

  function handleAddSubject() {
    const trimmedSubject = subjectInput.trim();
    if (trimmedSubject && !subjects.includes(trimmedSubject)) {
      setValue("subjects", [...subjects, trimmedSubject]);
      setSubjectInput("");
    }
  }

  function removeSubject(index: number) {
    setValue(
      "subjects",
      subjects.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e, 2, false);
    if (orchestratorRef.current) {
      shortcuts(e, getCommands(), orchestratorRef.current);
    }
  };

  function onSubmit(data: NoteDTO) {
    createNote.mutate(data);
    reset();
    setOpen(false);
  }

  async function handleExtractTextFromDocument(file: File) {
    const data = await documentExtraction.mutateAsync(file);
    setValue("title", data.title);
    setValue("content", data.content);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl p-0 rounded-2xl overflow-hidden border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[90dvh] sm:max-h-[85vh]"
        >
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20 shrink-0">
            <DialogTitle className="text-md font-semibold tracking-tight text-foreground/90">
              Add Note
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden min-h-0">
            <div className="sm:w-56 sm:min-w-56 shrink-0 flex flex-col overflow-y-auto border-b sm:border-b-0 sm:border-r border-border/40 bg-muted/10">
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                    <FileText className="size-3" /> Import Document
                  </Label>
                  {documentExtraction.isPending ? (
                    <div className="rounded-xl border border-border/60 bg-card/40 px-3 py-3 text-xs text-primary text-center">
                      Extracting…
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden p-3">
                      <Label className="text-muted-foreground font-medium text-xs">
                        Text Extraction from PDF, DOC, PPT up to 10MB
                      </Label>
                      <FileInput onFileSelect={handleExtractTextFromDocument} />
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/40 text-sm overflow-hidden">
                  <div className="p-3 space-y-1.5">
                    <Label className="text-muted-foreground font-medium text-xs">
                      Note Title
                    </Label>
                    <Input
                      value={title}
                      {...register("title")}
                      placeholder="Arithmetic Sequences…"
                      className="h-8 text-xs font-medium border-border/50 bg-background/50 shadow-none focus-visible:ring-1"
                    />
                    {errors.title && (
                      <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                        <AlertCircle className="size-3" />
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                    <Tag className="size-3" /> Tags / Subjects
                  </Label>
                  <Input
                    placeholder="Press Enter to add…"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                    className="h-9 text-sm bg-muted/20 border-border/50 placeholder:text-muted-foreground/40 focus-visible:ring-1"
                  />

                  {errors.subjects && (
                    <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {errors.subjects.message}
                    </p>
                  )}

                  {subjects.length === 0 && !errors.subjects && (
                    <p className="text-xs text-muted-foreground/50">
                      Press Enter to attach a subject tag
                    </p>
                  )}

                  {subjects.length > 0 && (
                    <ScrollArea className="w-full">
                      <ScrollBar orientation="horizontal" />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {subjects.map((subject, index) => (
                          <span
                            key={`${subject}-${index}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-medium border border-border/40 transition-all"
                          >
                            <span>{subject}</span>
                            <button
                              type="button"
                              onClick={() => removeSubject(index)}
                              className="text-muted-foreground/60 hover:text-rose-500 rounded p-0.5 focus:outline-none"
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 flex flex-col min-h-[200px] sm:min-h-0 border-b sm:border-b-0 sm:border-r border-border/40">
                <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                    Editor
                  </span>
                </div>
                <textarea
                  ref={textareaRef}
                  onChange={(e) => setValue("content", e.target.value)}
                  value={content}
                  onKeyDown={onKeyDown}
                  placeholder="Start writing your note in Markdown…"
                  className="flex-1 w-full p-4 text-sm leading-relaxed break-words outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground/40"
                />
              </div>

              <div
                className="hidden sm:flex flex-col flex-1 min-h-0 overflow-hidden"
                data-color-mode="light"
              >
                <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                    Preview
                  </span>
                </div>
                <div className="flex-1 overflow-auto">
                  <MDEditor.Markdown
                    source={content}
                    className="h-full p-4 whitespace-pre-wrap text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createNote.isPending}
              className="text-xs font-medium px-4 text-white shadow-sm"
            >
              {createNote.isPending ? "Saving…" : "Add Note"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNoteModal;
