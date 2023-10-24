import { experimental_useFormStatus as useFormStatus } from "react-dom";
export async function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-primary text-white font-bold">
      {pending && <span>Submitting...</span>}
      {!pending && <span>Submit</span>}
    </button>
  );
}
