import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import InputMask from "react-input-mask";
import { SubmitHandler } from "react-hook-form";
import "./CardForm.css";

interface Inputs {
  name: string;
  cardNumber: string;
  mm: string;
  yy: string;
  cvc: string;
}

interface CardFormProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  handleSubmit: (
    onSubmit: SubmitHandler<Inputs>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  mm: string;
}

export default function CardForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  setValue,
  mm,
}: CardFormProps) {
  return (
    <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">CARDHOLDER NAME</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Jane Appleseed"
          className={errors.name ? "input-error" : ""}
          {...register("name")}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="cardNumber">CARD NUMBER</label>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=""
          type="text"
          id="cardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          className={errors.cardNumber ? "input-error" : ""}
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <span className="error-message">{errors.cardNumber.message}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group form-group-small">
          <label htmlFor="mm">EXP. DATE (MM/YY)</label>
          <div className="date-inputs">
            <InputMask
              type="text"
              id="mm"
              placeholder="MM"
              className={errors.mm ? "input-error" : ""}
              {...register("mm")}
              mask="99"
              maskChar=""
              onBlur={() => {
                if (mm && mm.length > 0) {
                  setValue("mm", mm.padStart(2, "0"));
                }
              }}
            />
            <InputMask
              type="text"
              id="yy"
              placeholder="YY"
              className={errors.yy ? "input-error" : ""}
              {...register("yy")}
              mask="99"
              maskChar=""
            />
          </div>
          {(errors.mm || errors.yy) && (
            <span className="error-message">
              {errors.mm?.message || errors.yy?.message}
            </span>
          )}
        </div>

        <div className="form-group form-group-small">
          <label htmlFor="cvc">CVC</label>
          <InputMask
            type="text"
            id="cvc"
            placeholder="e.g. 123"
            className={errors.cvc ? "input-error" : ""}
            {...register("cvc")}
            mask="999"
            maskChar=""
          />
          {errors.cvc && (
            <span className="error-message">{errors.cvc.message}</span>
          )}
        </div>
      </div>

      <button type="submit" className="submit-button">
        Confirm
      </button>
    </form>
  );
}
