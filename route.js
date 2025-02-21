import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ operation_code: 1 });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const inputArray = data.data || [];
    const numbers = inputArray.filter((item) => !isNaN(item));
    const alphabets = inputArray.filter((item) => /^[a-zA-Z]$/.test(item));
    const highestAlphabet =
      alphabets.length > 0
        ? alphabets.sort((a, b) => b.localeCompare(a))[0]
        : null;

    const response = {
      is_success: true,
      user_id: "john_doe_17091999", // Replace with your actual user ID
      email: "john@xyz.com", // Replace with your actual email
      roll_number: "ABCD123", // Replace with your actual roll number
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { is_success: false, error: error.message },
      { status: 400 }
    );
  }
}
