const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function getSubjects(token: string) {
  const endpoint = `${serverUrl}/subjects`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.subjects;
}
