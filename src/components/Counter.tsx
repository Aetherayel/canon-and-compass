import { createSignal } from "solid-js"

function CounterButton() {
  const [count, setCount] = createSignal(0)

  const increment = () => setCount(count() + 1)

  return (
    <div class="flex gap-4 items-center">
      <button onClick={increment} class="blend rounded border border-ash/20 bg-paper px-3 py-1 text-ink hover:border-starlight/35 hover:bg-bone/70 dark:border-bone/15 dark:bg-white/10 dark:text-bone dark:hover:bg-white/15">
        Increment
      </button>
      <div>
       Clicked {count()} {count() === 1 ? "time" : "times"}
      </div>
    </div>

  )
}

export default CounterButton
