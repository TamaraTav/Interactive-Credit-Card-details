import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Inputs } from "./types/form";
import { cardFormSchema } from "./utils/validation";
import CardPreview from "./components/CardPreview";
import CardForm from "./components/CardForm";
import SuccessState from "./components/SuccessState";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(cardFormSchema),
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
