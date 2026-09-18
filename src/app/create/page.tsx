import { redirect } from "next/navigation";

// /create → redirect to step 1
export default function CreatePage() {
  redirect("/create/steps/template");
}
