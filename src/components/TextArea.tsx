import React from "react";
import { sendData } from "../scripts/utils";

const TextArea = () => {
  const [message, setMessage] = React.useState<string>("");

  function handleSendData(event: any) {
    event.preventDefault();
    sendData(message);
  }

  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={(event) => handleSendData(event)}
    >
      <textarea
        rows={4}
        cols={50}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Compartí lo que quieras..."
        className="max-w-[70vw] w-96 h-40 text-base p-4 rounded-xl border-black border-2 outline-none"
      ></textarea>
      <input
        className="cursor-pointer border-2 border-black text-base px-4 py-2 leading-none rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out"
        value="Enviar"
        type="submit"
      />
    </form>
  );
};

export default TextArea;
