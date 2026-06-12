import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useSubjects } from "../hooks/useSubjects";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";

function NoteCard() {
  const { data: subjects } = useSubjects();
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  return (
    <>
      <AddNoteModal open={showAddNoteModal} setOpen={setShowAddNoteModal} />

      <Card className="w-full h-full">
        <CardHeader className="flex justify-between ">
          <CardTitle>NOTES</CardTitle>
          <Button size="icon-sm" onClick={() => setShowAddNoteModal(true)}>
            +
          </Button>
        </CardHeader>
        <CardContent className="h-full flex gap-4">
          <div className="w-40 ">
            <p>Subjects: </p>
            <ScrollArea className="border mt-2 w-full h-[calc(100dvh-503px)] rounded-md">
              <ScrollBar />
              <div className="space-y-1 w-full">
                <div className="py-2 px-4 rounded-lg bg-white border w-full cursor-pointer">
                  All
                </div>
                {subjects?.map((subject) => (
                  <div
                    key={subject.id}
                    className="py-2 px-4 rounded-lg bg-white border w-full cursor-pointer"
                  >
                    {subject.name}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <ScrollArea className="flex-1 h-[calc(100dvh-475px)] bg-accent rounded-md">
            <ScrollBar />
            <div className="p-4"></div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default NoteCard;
