<script>
  import Message from "./message.svelte";
  import Username from "./Username.svelte";
  import { loggedIn } from "./store";
</script>

{#if $loggedIn}
  <Message />
{:else}
  <Username />
{/if}

<style>
  :global(body, html) {
    overflow: hidden;
    background-color: #aaaa;
  }
</style>
