import { NextResponse } from "next/server";
import { getPromptByBoardId } from "@/services"; // Ensure this path is correct
export const dynamic = "force-dynamic"; 
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
    }

    const result = await getPromptByBoardId(id);
    getPromptByBoardId(id).then((res) => {
      console.log(res)
    
  })

    if (result.errRes) {
      return NextResponse.json({ error: result.errRes }, { status: 500 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
