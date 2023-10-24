import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./deleteButton";

export const dynamicParams = true; //!default val = true

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from("Tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Dojo Helpdesk | ${ticket.title}`,
  };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id);
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userEmail = session.user.email;
  console.log("ticket title", ticket.title);
  return (
    <main>
      <nav className="flex">
        <h2>Ticket Details</h2>
        <div className={`ml-auto`}>
          {ticket.user_email === userEmail && (
            <DeleteButton title={ticket.title} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
