export async function extractTextFromDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:3000/api/notes/extract", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data;
}
