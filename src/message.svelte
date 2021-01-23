<script>
  import { onMount } from "svelte";

  import Socket from "socket.io-client";

  import { myUsername } from "./store";

  let myId;

  let socket;

  let message;
  let messages = [];

  const onMessage = async (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendmessage", {
        message,
        senderId: myId,
        username: $myUsername,
      });
      message = "";
    }
  };

  onMount(() => {
    socket = Socket("http://localhost:8090/");
    socket.on("message", (data) => {
      messages = [...messages, data];
    });

    socket.on("connect", () => {
      myId = socket.id;
    });
  });
</script>

<div class="container">
  <div class="messages">
    {#each messages as message}
      {#if message.senderId === myId}
        <div class="to">
          <div class="message">{message.message}</div>
        </div>
      {:else}
        <div>
          <div class="username">{message.username}</div>
          <div class="from">
            <div class="message">{message.message}</div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <form on:submit={onMessage}>
    <input placeholder="Send Message..." bind:value={message} />
    <button on:click={onMessage}>Send Message</button>
  </form>
</div>

<style>
  .container {
    width: 90vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    background-color: white;
  }

  .messages {
    height: 80vh;
    width: 100%;
    overflow: auto;
    padding: 1.2rem;
  }

  .to,
  .from {
    margin-top: 0.5rem;
  }

  .to {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
  }

  .from .message {
    background: #aaaaaa;
  }

  .message {
    background-color: blue;
    border-radius: 5px;
    text-align: left;
    padding: 0.2rem 0.5rem;
    min-width: 30px;
    color: white;
    width: fit-content;
    max-width: 70%;
    word-break: break-all;
  }

  form {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: white;
  }

  input {
    box-sizing: border-box;
    margin-bottom: 0px;
    min-width: 60%;
  }

  button {
    min-width: 100px;
    width: 30%;
  }

  button,
  input {
    margin-top: 0.5rem;
    height: 100%;
  }
  .username {
    color: white;
  }
</style>
