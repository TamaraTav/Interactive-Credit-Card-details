import iconComplete from "../assets/icons/icon-complete.svg";
import "./SuccessState.css";

interface SuccessStateProps {
  onContinue: () => void;
}

export default function SuccessState({ onContinue }: SuccessStateProps) {
  return (
    <div className="success-state">
      <img src={iconComplete} alt="Complete" className="success-icon" />
      <h1 className="success-title">THANK YOU!</h1>
      <p className="success-message">We've added your card details</p>
      <button onClick={onContinue} className="continue-button">
        Continue
      </button>
    </div>
  );
}
