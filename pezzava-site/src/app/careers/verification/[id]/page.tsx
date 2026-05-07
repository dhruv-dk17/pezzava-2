async function getStudent(id: string) {
  const res = await fetch(
    `https://ajzgfoinhvzcvkgvsjpd.supabase.co/rest/v1/interns?ref=eq.${id}`,
    {
      headers: {
        apikey: "sb_publishable_-O5wGlq9yBRSPwjZxOqPsw_TPDMItj5",
        Authorization: "Bearer sb_publishable_-O5wGlq9yBRSPwjZxOqPsw_TPDMItj5",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data[0];
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudent(params.id);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        Verification Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[400px]">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Verified Internship
        </h1>

        <div className="space-y-2">
  <p><strong>Name:</strong> {student.name}</p>
  <p><strong>Father Name:</strong> {student.father_name}</p>
  <p><strong>College:</strong> {student.college}</p>
  <p><strong>Reference ID:</strong> {student.ref}</p>
</div>
      </div>
    </div>
  );
}
