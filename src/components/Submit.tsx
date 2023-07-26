import { TwitterLogo } from "phosphor-react";

import { getDayAndMonthFormatted } from "../scripts/utils";

interface SubmitProps {
  date: string;
  text: string;
}

const Submit = ({ date, text }: SubmitProps) => {
  const title = getDayAndMonthFormatted(date);

  const shareText = `Hoy descubrí como estaba otra persona:%0a%0a"${text}"%0a%0aCompartí como estás en https://comoestas.app y descubrí como está otro.`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Gracias por tu respuesta</h1>
        <p>Asi está otro:</p>
      </div>
      <div className="flex flex-col w-80 gap-2 items-center justify-center bg-black text-white py-6 px-6 rounded-2xl">
        <div className="flex items-center min-w-fit gap-2 w-full text-left">
          <div className="w-4 h-4 aspect-square bg-red-600 rounded-full"></div>
          <h1 className="font-bold">Buenos Aires, 1 de Noviembre</h1>
        </div>
        <p className="w-full text-left">{text}</p>
      </div>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText.replace(
          " ",
          "%20"
        )}`}
        className="flex items-center font-bold gap-2 cursor-pointer border-2 border-black text-base px-4 py-2 leading-none rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out "
      >
        <TwitterLogo size={24} />
        Compartir
      </a>
    </div>
  );
};

export default Submit;
