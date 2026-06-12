import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const cleanMarkdownFormat = z.object({
  title: z.string().trim(),
  content: z.string(),
});

const ai = new GoogleGenAI({});

export async function makeCleanMarkdown(text: string) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Read this distorted text and extract the title and content. Clean up the text formatting where necessary. The content should be in a clean markdown format. You should use space on the content instead of "backward slash n". \n\nText:\n${text}`,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: cleanMarkdownFormat.toJSONSchema(),
    },
  });

  console.log(res);
  console.log(res.text);

  const output = cleanMarkdownFormat.parse(JSON.parse(res.text as string));

  return output;
}
