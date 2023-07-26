import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  addDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGE_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function getDate() {
  var today = new Date();
  var date =
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  return date;
}

export function sendData(message: string) {
  const date = getDate();
  addDoc(collection(db, "data"), {
    date: date,
    message: message,
  })
    .then(() => {
      alert("Se ha enviado, gracias 🙂");
    })
    .catch((error) => {
      alert("No se pudo mandar tu respuesta, intenta de nuevo 😭");
      console.error("Error writing document: ", error);
    });
}

export async function getData() {
  const allData: any = [];

  const dbQuery = query(collection(db, "data"));

  const getData = await getDocs(dbQuery);

  const data = getData.docs.map((doc) => doc.data());

  return data;
}

export function separateDateAndTime(date: string) {
  if (!date) return { date: null, time: null };

  const [dateString, timeString] = date.split(" ");
  // get the array of the date with the format dd/mm/yy
  const dateArray = dateString.split("/");
  // get the array of the time with the format hh:mm:ss
  const timeArray = timeString.split(":");
  // get the year from the date array
  const year = dateArray[2];
  // get the month from the date array
  const month = parseInt(dateArray[1]) < 10 ? `0${dateArray[1]}` : dateArray[1];
  // get the day from the date array and if is less than 10 add a 0 before the number
  const day = parseInt(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
  // get the hour from the time array
  const hour = parseInt(timeArray[0]) < 10 ? `0${dateArray[1]}` : dateArray[1];
  // get the minutes from the time array
  const minutes =
    parseInt(timeArray[1]) < 10 ? `0${timeArray[1]}` : timeArray[1];
  // get the seconds from the time array
  const seconds =
    parseInt(timeArray[2]) < 10 ? `0${timeArray[2]}` : timeArray[2];
  // return the date and time with the format dd/mm/yy hh:mm
  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minutes}:${seconds}`,
  };
}

export function getDayAndMonthFormatted(date: string) {
  const dateWithoutHour = date.split(" ")[0];
  const [day, month] = dateWithoutHour.split("/");
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return `Buenos Aires, ${day} de ${months[Number(month) - 1]}`;
}
