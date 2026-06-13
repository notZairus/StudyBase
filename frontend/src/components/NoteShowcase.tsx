import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  handleKeyDown,
  shortcuts,
  TextAreaCommandOrchestrator,
  getCommands,
} from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";
import { PenBox, Trash, X } from "lucide-react";
import type { Note, NoteDTO } from "../schemas/note.schema";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useDeleteNote } from "../hooks/useDeleteNote";
import { useDebouncedCallback } from "use-debounce";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

function NoteShowcase({
  open,
  setOpen,
  note: noteProp,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  note: Note;
}) {
  const [allowEdit, setAllowEdit] = useState(false);
  const [allowEditSubject, setAllowEditSubject] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [note, setNote] = useState<
    NoteDTO & {
      id: string;
      createdAt?: Date;
    }
  >({
    title: noteProp.title,
    content: noteProp.content,
    subjects: noteProp.subjects.map((s) => s.name),
    id: noteProp.id,
    createdAt: noteProp.createdAt,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const orchestratorRef = useRef<TextAreaCommandOrchestrator>(null);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const debouncedUpdateNote = useDebouncedCallback(
    (noteId: string, field: Partial<NoteDTO>) => {
      updateNote.mutate({ id: noteId, data: field });
    },
    500,
  );

  useEffect(() => {
    if (textareaRef.current) {
      orchestratorRef.current = new TextAreaCommandOrchestrator(
        textareaRef.current,
      );
    }
  }, []);

  function emitUpdate(field: Partial<NoteDTO>) {
    setNote({
      ...note,
      ...field,
    });
    debouncedUpdateNote(note.id, field);
  }

  function handleRemoveSubject(subject: string) {
    const filtered = note.subjects.filter((s) => s !== subject);
    emitUpdate({ subjects: filtered });
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e, 2, false);
    if (orchestratorRef.current) {
      shortcuts(e, getCommands(), orchestratorRef.current);
    }
  };

  function handleDeleteNote() {
    deleteNote.mutate(note.id);
    console.log("deletinfgdasfasd");
  }
  return (
    <>
      <Dialog
        open={openConfirmDelete}
        onOpenChange={setOpenConfirmDelete}
        modal={false}
      >
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Task
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">"{note.title}"</span>?
            This action cannot be undone and will permanently remove all
            associated subtasks.
          </DialogDescription>
          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpenConfirmDelete(false);
                setOpen(true);
              }}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteNote}
              className="rounded-xl"
            >
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setAllowEdit(false);
          setAllowEditSubject(false);
        }}
        modal={false}
      >
        <DialogContent
          className="sm:max-w-4xl p-0 rounded-2xl overflow-hidden"
          showCloseButton={false}
        >
          <div className="max-w-5xl h-[80dvh] flex gap-1">
            {/* Sidebar */}

            <div className="min-w-1/10 sm:min-w-1/6" />
            <div className="fixed bg-sidebar sm:min-w-1/6 h-full border-r shadow-r flex flex-col justify-between">
              <div>
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="max-w-32 text-lg tracking-wider leading-5 hello wrap sr-only">
                    {note.title || "Untitled Note"}
                  </DialogTitle>
                  <Textarea
                    value={note.title}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      emitUpdate({ title: newValue });
                    }}
                    placeholder="Note title..."
                    className="w-32 bg-transparent border-0 p-0 md:text-lg tracking-tight leading-snug focus:outline-none focus:ring-0 font-heading placeholder:text-muted-foreground/40 transition-colors text-foreground h-min resize-none outline-none max-w-32 ring-0 focus-visible:ring-0 focus-visible:ring-ring/50 rounded-none max-h-40"
                  />
                </DialogHeader>

                <div className="p-4">
                  <div>
                    <p className="text-xs">
                      Subject/s:{" "}
                      <PenBox
                        className="inline w-3.5 text-muted-foreground"
                        onClick={() => setAllowEditSubject(!allowEditSubject)}
                      />
                    </p>
                    {allowEditSubject && (
                      <div>
                        <Input
                          type="text"
                          className="w-32 text-xs"
                          placeholder="Science"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const newSubject = e.currentTarget.value.trim();
                              if (
                                newSubject &&
                                !note.subjects.includes(newSubject)
                              ) {
                                const updatedSubjects = [
                                  ...note.subjects,
                                  newSubject,
                                ];
                                emitUpdate({ subjects: updatedSubjects });
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                        />
                        <p className="text-[10px] mt-1 w-32 text-muted-foreground">
                          Press Enter to add subject
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1 max-w-32">
                      {note.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 border rounded-full text-xs flex items-center"
                        >
                          {subject}
                          {note.subjects.length > 1 && (
                            <button
                              onClick={() => handleRemoveSubject(subject)}
                              className="text-muted-foreground/60 hover:text-foreground hover:bg-background/60 p-0.5 rounded transition-all focus:outline-none"
                            >
                              <X className="size-2.5" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 min-h-10  space-y-4">
                <Button
                  className="w-full  max-w-32"
                  onClick={() => setAllowEdit(!allowEdit)}
                >
                  {allowEdit ? "Exit Edit" : "Edit Content"}
                </Button>
              </div>
            </div>

            {/* content */}
            <div className="w-full h-full max-w-[calc(100%-8rem) flex">
              {allowEdit && (
                <div className="flex-1 border-2">
                  <textarea
                    ref={textareaRef}
                    value={note.content}
                    onKeyDown={onKeyDown}
                    onChange={(e) => {
                      emitUpdate({ content: e.target.value });
                    }}
                    className="w-full h-full p-5 wrap-break-word outline-none resize-none bg-white"
                  />
                </div>
              )}
              <div
                className="flex-1 border-t-2 relative   overflow-auto"
                data-color-mode="light"
              >
                <div className=" absolute top-2 right-2 space-x-2 hidden sm:flex">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setOpen(true);
                      setOpenConfirmDelete(true);
                    }}
                  >
                    <Trash />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </Button>
                </div>
                <MDEditor.Markdown
                  source={note.content}
                  className="h-full p-5 whitespace-pre-wrap text-sm"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteShowcase;
