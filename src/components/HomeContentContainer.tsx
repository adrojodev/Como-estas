import React from "react";

import TextArea from "./TextArea";
import Submit from "./Submit";
import { getData } from "../scripts/utils";

const HomeContentContainer = () => {
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  React.useEffect(() => {
    getData().then((data) => {
      const randomResponse = Math.floor(Math.random() * data.length);

      setDate(data[randomResponse].date);
      setText(data[randomResponse].message);
    });
  }, []);

  return (
    <div className="flex max-w-[70vw] flex-col items-center gap-3">
      {!isSubmitted ? (
        <Submit date={date} text={text} />
      ) : (
        <TextArea setIsSubmitted={setIsSubmitted} />
      )}
    </div>
  );
};

export default HomeContentContainer;
