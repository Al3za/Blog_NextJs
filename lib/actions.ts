'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateAll() {
    revalidatePath('/');
    redirect('/')
}; // the path ('/) refears tho the main page of the app folder (app/page.tsx)

