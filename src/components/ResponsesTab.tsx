import React from "react";
import { useAsyncFn } from "react-use";
import classNames from "classnames";

import { CalendarBlank, Clock } from "phosphor-react";

import { getData, separateDateAndTime } from "../scripts/utils";

interface Response {
  message: string;
  date: string;
}

const ResponsesTab = () => {
  const [responses, setResponses] = React.useState<Response[]>([]);
  const [access, setAccess] = React.useState<boolean | undefined>(undefined);

  const [status, data] = useAsyncFn(async () => {
    const response = await getData();

    setResponses(response as Response[]);
  }, []);

  React.useEffect(() => {
    const password = prompt("Ingrese la contraseña");

    if (password === import.meta.env.PUBLIC_PASSWORD) {
      data();
      setAccess(true);
    } else {
      alert("Contraseña incorrecta");
      setAccess(false);
    }
  }, []);

  return access ? (
    <div className="flex flex-col border-2 border-gray-400 rounded-lg last:rounded-b-lg">
      {status.loading && <p>Loading...</p>}
      {status.error && <p>Error!</p>}
      {responses.map((response, index) => {
        const { date, time } = separateDateAndTime(response.date);

        return (
          <div
            key={index}
            className={classNames(
              "grid gap-3 px-2 items-stretch grid-cols-mobile md:grid-cols-desktop",
              index % 2 === 0 && "bg-gray-200",
              index === 0 && "rounded-t-lg",
              index === responses.length - 1 && "rounded-b-lg"
            )}
          >
            <div className="flex flex-col items-start justify-center gap-2 border-r-2 border-gray-300 py-2">
              <div className="flex justify-center items-center">
                <CalendarBlank />
                <p className="text-xs">{date ?? "NA"}</p>
              </div>
              <div className="flex justify-center items-center">
                <Clock />
                <p className="text-xs">{time ?? "NA"}</p>
              </div>
            </div>
            <div className="flex justify-center items-center py-1">
              <p className="text-sm text-left pr-2 w-full">
                {response.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ) : access === false ? (
    <p>Anadate a tomar por culo 🖕</p>
  ) : (
    <p>Verificando acceso...</p>
  );
};

export default ResponsesTab;
