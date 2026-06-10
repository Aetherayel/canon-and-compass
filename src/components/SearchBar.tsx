type Props = {
    onSearchInput: (e: Event) => void;
    query: () => string;
    setQuery: (value: string) => void;
    placeholderText: string;
    accent?: "starlight" | "pine" | "ember" | "fig" | "moss";
};

function getAccentClasses(accent: NonNullable<Props["accent"]> = "starlight") {
    switch (accent) {
        case "pine":
            return {
                input: "hover:border-pine/35 hover:bg-bone/70 focus:border-pine focus:bg-bone/70 dark:focus:border-pine",
                clear: "hover:stroke-pine dark:hover:stroke-pine",
            };
        case "ember":
            return {
                input: "hover:border-ember/40 hover:bg-bone/70 focus:border-ember focus:bg-bone/70 dark:focus:border-ember",
                clear: "hover:stroke-ember dark:hover:stroke-ember",
            };
        case "fig":
            return {
                input: "hover:border-fig/40 hover:bg-bone/70 focus:border-fig focus:bg-bone/70 dark:focus:border-fig",
                clear: "hover:stroke-fig dark:hover:stroke-fig",
            };
        case "moss":
            return {
                input: "hover:border-moss/40 hover:bg-bone/70 focus:border-moss focus:bg-bone/70 dark:focus:border-moss",
                clear: "hover:stroke-moss dark:hover:stroke-moss",
            };
        default:
            return {
                input: "hover:border-starlight/35 hover:bg-bone/70 focus:border-starlight focus:bg-bone/70 dark:focus:border-starlight",
                clear: "hover:stroke-starlight dark:hover:stroke-starlight",
            };
    }
}

export default function SearchBar({ onSearchInput, query, setQuery, placeholderText, accent = "starlight" }: Props) {
    const accentClasses = getAccentClasses(accent);

    return (<div class="relative">
        <svg class="pointer-events-none absolute left-2 top-[0.45rem] size-6 stroke-ash dark:stroke-zinc-500">
            <use href={`/ui.svg#search`} />
        </svg>
        <input name="search" type="text" value={query()} onInput={onSearchInput} autocomplete="off" spellcheck={false} placeholder={placeholderText} class={`w-full rounded border border-ash/20 bg-paper px-10 py-1.5 text-ink outline-none placeholder-ash/70 dark:border-bone/15 dark:bg-white/10 dark:text-bone dark:placeholder-zinc-500 dark:hover:bg-white/15 dark:focus:bg-white/15 ${accentClasses.input}`} />
        {query().length > 0 && (
            <button
                onClick={() => setQuery("")}
                class={`absolute right-0 top-0 flex h-full w-10 items-center justify-center stroke-ash dark:stroke-zinc-500 ${accentClasses.clear}`}
            >
                <svg class="size-5">
                    <use href={`/ui.svg#x`} />
                </svg>
            </button>
        )}
    </div>)
}
