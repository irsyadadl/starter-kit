import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-9xl text-muted-fg tracking-tight">It works!</h1>

        <div className="mt-6 flex items-center justify-center">
          <a
            className="group rounded-full border bg-overlay px-4 py-2 font-medium text-sm/6 hover:bg-secondary/50"
            target="_blank"
            href="https://irsyad.co/blocks"
            rel="noopener"
          >
            Browse blocks
            <ArrowRightIcon className="ml-2 inline-block size-4 text-muted-fg transition-transform duration-400 group-hover:translate-x-1 group-hover:text-fg" />
          </a>
        </div>
      </div>
    </div>
  );
}
