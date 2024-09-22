import { revalidatePath } from "next/cache";
export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.MY_SECRET_TOKEN) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }

  try {
    revalidatePath("/blog");
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), {
      status: 500,
    });
  }
}
