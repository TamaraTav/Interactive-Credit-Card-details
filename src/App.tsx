import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Inputs } from "./types/form";
import CardPreview from "./components/CardPreview";
import CardForm from "./components/CardForm";
import SuccessState from "./components/SuccessState";

// Dynamic year validation
// YY format: 2-digit year (00-99)
// % 100 აბრუნებს ბოლო 2 ციფრს (ნაშთს 100-ზე გაყოფისას)
// მაგალითად: 2024 % 100 = 24, 2100 % 100 = 0
const getCurrentYearYY = () => {
  return new Date().getFullYear() % 100;
};

const getMaxYearYY = () => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 15; // მომავალი 15 წელი (credit card expiration max)
  // პრაქტიკაში 2100, 2200, 2300 არ იქნება valid, რადგან ძალიან შორს არის
  // ამიტომ % 100 safe-ია ამ კონტექსტში
  return maxYear % 100;
};

const currentYearYY = getCurrentYearYY();
const maxYearYY = getMaxYearYY();

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
      `year must be between ${String(currentYearYY).padStart(
        2,
        "0"
      )} and ${String(maxYearYY).padStart(2, "0")}`,
      (value) => {
        const yearNum = parseInt(value);
        if (isNaN(yearNum)) return false;

        // Century transition case: მაგ. currentYearYY = 99, maxYearYY = 14 (2085-2100)
        // Valid years: 99, 00, 01, ..., 14 (სადაც 00 = 2100, არა 2200, რადგან მხოლოდ 15 წელი მომავალში)
        if (currentYearYY > maxYearYY) {
          return yearNum >= currentYearYY || yearNum <= maxYearYY;
        }

        // Normal case: მაგ. currentYearYY = 24, maxYearYY = 39 (2024-2039)
        // Valid years: 24-39
        return yearNum >= currentYearYY && yearNum <= maxYearYY;
      }
    ),
  cvc: yup
    .string()
    .required("cvc is required")
    .min(3, "cvc must be at least 3 characters"),
});

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
