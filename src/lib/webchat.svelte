<svelte:options
  customElement={{
    tag: "stubber-webchat",
    shadow: "none", 
  }}
/>

<script>
  import Webchat from "./chat/webchat.svelte";

  export let orguuid;
  export let chatPath;
  export let connectOnLoad;

  let webchatEnable = false;
</script>

<svelte:head>
  <style>
    @import "../app.css";
  </style>
</svelte:head>

{#if !webchatEnable}
  <button class="stubber_webchat_enable_button" id="stubber_webchat_enable_button" on:click={() => webchatEnable = true }>
    Chat
  </button>
{/if}
{#if webchatEnable}
  <Webchat orguuid={orguuid} chatPath={chatPath} connectOnLoad={connectOnLoad}/>
{/if}