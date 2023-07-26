import React from "react";
import { sendData } from "../scripts/utils";

interface TextAreaProps {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea = ({ setIsSubmitted }: TextAreaProps) => {
  const [message, setMessage] = React.useState<string>("");

  function handleSendData(event: any) {
    event.preventDefault();
    sendData(message);
    setIsSubmitted(true);
  }

  return (
    <div className="relative flex flex-col gap-6 justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">¿Cómo estás?</h1>
        <p>Respondé y descubrí como está otro.</p>
      </div>
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
          className="w-96 h-40 text-base p-4 rounded-xl border-black border-2 outline-none"
        ></textarea>
        <input
          className="cursor-pointer border-2 border-black text-base px-4 py-2 leading-none rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out"
          value="Enviar"
          type="submit"
        />
      </form>
      <p className="absolute text-center w-96 mt-auto mb-10 bottom-0">
        Tu respuesta es totalmente anónima y puede ser vista por otra persona
        que también responda
      </p>
    </div>
  );
};

export default TextArea;
