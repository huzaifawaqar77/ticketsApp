"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

const DeleteButton = ({ title }) => {
  const router = useRouter();
  const handleDelete = async (title) => {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from("Tickets")
      .delete()
      .eq("title", title);
    if (error) {
      console.log(error);
      NextResponse.json({ error });
    }
    router.refresh();
    router.push("/tickets");
  };
  return (
    <button
      onClick={() => handleDelete(title)}
      className="bg-primary text-white font-semibold"
    >
      Delete Ticket
    </button>
  );
};

export default DeleteButton;
