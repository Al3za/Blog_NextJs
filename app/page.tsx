import Posts from "./components/Posts";
import { revalidateAll } from "@/lib/actions";

export const revalidate = 10000; // when you deploy the app the seconds as to be as one day (around 80 000 sec);
//revalidate can be writen only on page.tsx/jsx and layout.tsx/jsx and cover all the children of those page
// i think it revalidates <Post /> every 10 seconds because there is showing the data that we update
// a revalidate on a fetch method works on his own and doesnt get affected by the revalidate on the page like above in this page;

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Alessandro Calabro`</span>.
        </span>
      </p>
      <form action={revalidateAll}>
        {/* the form action (server action) is nice because we can write form as a client component but make it as a server component  */}
        <button style={{ color: "white" }}> revalidate home page </button>
      </form>
      {/*  */}
      <Posts />
    </main>
  );
}
