"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData);
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("Tickets")
    .insert({ ...ticket, user_email: session.user.email })
    .select()
    .single();

  if (error) {
    console.log(error);
  }
  if (data) {
    revalidatePath("/tickets");
    redirect("/tickets");
  }
}
