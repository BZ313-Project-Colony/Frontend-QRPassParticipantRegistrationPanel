import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FormInput from "./components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import formatTimestamp from "./DateUtils";
import ErrorPage from "./ErrorPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let { event_id } = useParams();
  const link = "https://www.resmigazete.gov.tr/eskiler/2018/03/20180310-5.htm";
  const [values, setValues] = useState({ name: "", surname: "", email: "" });
  const [eventDetail, setEventDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputs = [
    {
      id: 1,
      name: "name",
      label: "Adınız",
      type: "text",
      pattern: "^[A-Za-zğüşöçıİĞÜŞÖÇ\\s]{2,32}$",
      errorMessage: "adınız herhangi bir özel karakter içermemelidir! ",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      label: "Soyadınız",
      type: "text",
      pattern: "^[A-Za-zğüşöçıİĞÜŞÖÇ\\s]{1,32}$",
      errorMessage: "soyadınız herhangi bir özel karakter içermemelidir! ",
      required: true,
    },
    {
      id: 3,
      name: "email",
      label: "E-posta",
      type: "text",
      pattern: "\\S+@\\S+\\.\\S+",
      errorMessage: "geçerli bir e-posta adresi olmalı",
      required: true,
    },
  ];

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://qr-pass-service-9363756ce9d4.herokuapp.com/v1/events/${event_id}`
        );
        setEventDetail(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchEventDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
      toast.error("KVKK metnini onaylamadan işleme devam edemezsiniz");
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://qr-pass-service-9363756ce9d4.herokuapp.com/v1/events/register`,

          {
            eventId: event_id,
            name: values.name,
            surname: values.surname,
            email: values.email,
          }
        );
        setIsLoading(false);
        toast.success("Başarıyla kayıt oldunuz!");
      } catch (error) {
        toast.error(error.response.data);
        setIsLoading(false);
      }
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="div3">
          <div className="div1">
            <h3 className="h3">
              Etkinlik Adı :
              <label id="lb1" className="lb">
                {" "}
                {eventDetail && eventDetail.title}
              </label>
            </h3>
            <h3 className="h3">
              Tarih-Saat:
              <label id="lb2" className="lb">
                {" "}
                {eventDetail && formatTimestamp(eventDetail.time)}
              </label>
            </h3>
            <h3 className="h3">
              Yer :
              <label id="lb4" className="lb">
                {" "}
                {eventDetail && eventDetail.place}
              </label>
            </h3>
          </div>
          <div className="div2">
            <img src="QRsiyah.svg" alt="QR" className="img" />
          </div>
        </div>
        <h1>Kayıt Formu</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} onChange={onChange} {...input} />
        ))}
        <label className="lbl2">
          <input id="checkbox" rel="noreferrer" type="checkbox" />
          <a href={link} target="_blank" rel="noreferrer">
            {" "}
            KVKK
          </a>{" "}
          metnini okudum onaylıyorum
        </label>
        <button>{isLoading ? "Loading" : "Kaydol"}</button>
      </form>
    </div>
  );
}

export default App;
