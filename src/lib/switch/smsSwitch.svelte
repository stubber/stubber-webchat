<script>
  export let socket;
  export let orguuid;
  export let chatPath;

  let number = "";

  let sendParams = (params) => {
    console.log(params);
    socket.emit("params", {
      orguuid,
      chatPath,
      params,
    });
  };
  
  let handleEnterPress = (event) => {
    if (event.key === "Enter" && number != "") {
      sendParams();
    }
  };
</script>

<input
  type="text"
  class="stubber_message_input"
  id="stubber_message_input"
  placeholder="Enter Details"
  bind:value={number}
  on:keydown={handleEnterPress}
/>
<button class="stubber_message_send_button" id="stubber_message_send_button" on:click={sendParams}>
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="stubber_message_send_button_svg"
    id="stubber_message_send_button_svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 12h14M12 5l7 7-7 7"
    />
  </svg>
</button>
