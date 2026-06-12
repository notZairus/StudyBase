import { useMutation } from "@tanstack/react-query";
import { extractTextFromDocument } from "../api/note.api";

export function useDocumentTextExtraction() {
  return useMutation({
    mutationFn: async (file: File) => {
      const data = await extractTextFromDocument(file);
      return data;
    },
  });
}
