<script>
  import { loggedIn, myUsername } from "./store";

  let username;

  const onSubmit = (e) => {
    e.preventDefault();
    if (username && username.length > 3) {
      loggedIn.update(() => true);
      myUsername.update(() => username);
    }
  };
</script>

<form on:submit={onSubmit}>
  <input placeholder="Your Username" bind:value={username} />
  <button on:click={onSubmit}>Submit</button>
</form>

<style>
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  :global(input:focus, button:focus) {
    outline: none;
    border: 1px solid #ccc;
  }
</style>
