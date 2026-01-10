import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import CardPreview from "./components/CardPreview";
import CardForm from "./components/CardForm";
import SuccessState from "./components/SuccessState";

const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(2, "name must be at least 2 characters")
    .max(30, "name must be maximum 30 characters")
    .test(
      "includes-space",
      "You should include both first and last names",
      (value) => value.includes(" ")
    ),
  cardNumber: yup
    .string()
    .required("card number is required")
    .min(19, "card number must be 16 characters"),
  mm: yup
    .string()
    .required("mm is required")
    .min(2, "month must be at least 2 characters")
    .test(
      "month validation",
      "month must be valid",
      (value) => parseInt(value) > 0 && parseInt(value) <= 12
    ),
  yy: yup
    .string()
    .required("yy is required")
    .min(2, "year must be at least 2 characters")
    .test(
      "year validation",
      "year must be valid",
      (value) => parseInt(value) >= 25 && parseInt(value) <= 40
    ),
  cvc: yup
    .string()
    .required("cvc is required")
    .min(3, "cvc must be at least 3 characters"),
});

interface Inputs {
  name: string;
  cardNumber: string;
  mm: string;
  yy: string;
  cvc: string;
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setSubmitted(true);
    // const repsonse = await fetch("api link", {
    //   method: "POST",
    //   "Content-Type": "application/json",
    //   body: JSON.stringify(data),
    // });
  };

  const name = watch("name");
  const cardNumber = watch("cardNumber");
  const mm = watch("mm");
  const yy = watch("yy");
  const cvc = watch("cvc");

  const [submitted, setSubmitted] = useState(false);

  const clearInputs = () => {
    setValue("name", "");
    setValue("cardNumber", "");
    setValue("mm", "");
    setValue("yy", "");
    setValue("cvc", "");
  };

  return (
    <div className="app-container">
      {submitted ? (
        <SuccessState
          onContinue={() => {
            setSubmitted(false);
            clearInputs();
          }}
        />
      ) : (
        <>
          <CardPreview
            cardNumber={cardNumber}
            name={name}
            mm={mm}
            yy={yy}
            cvc={cvc}
          />
          <CardForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setValue={setValue}
            mm={mm}
          />
        </>
      )}
    </div>
  );
}

export default App;
