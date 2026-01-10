import cardLogo from "../assets/icons/card-logo.svg";
import bgCardFront from "../assets/images/bg-card-front.png";
import bgCardBack from "../assets/images/bg-card-back.png";
import "./CardPreview.css";

interface CardPreviewProps {
  cardNumber: string;
  name: string;
  mm: string;
  yy: string;
  cvc: string;
}

export default function CardPreview({
  cardNumber,
  name,
  mm,
  yy,
  cvc,
}: CardPreviewProps) {
  const formatCardNumber = (num: string | undefined) => {
    if (!num || num.trim() === "") return "0000 0000 0000 0000";
    const cleaned = num.replace(/\s/g, "").padEnd(16, "0");
    return cleaned.match(/.{1,4}/g)?.join(" ") || "0000 0000 0000 0000";
  };

  const formattedCardNumber = formatCardNumber(cardNumber);
  const displayName = name || "JANE APPLESEED";
  const displayMM = mm || "00";
  const displayYY = yy || "00";
  const displayCVC = cvc || "000";

  return (
    <div className="card-preview-container">
      {/* Card Front */}
      <div className="card-front">
        <img
          src={bgCardFront}
          alt="Card front background"
          className="card-bg"
        />
        <div className="card-front-content">
          <img src={cardLogo} alt="Card logo" className="card-logo" />
          <div className="card-number">{formattedCardNumber}</div>
          <div className="card-bottom">
            <div className="card-name">{displayName}</div>
            <div className="card-date">
              {displayMM}/{displayYY}
            </div>
          </div>
        </div>
      </div>

      {/* Card Back */}
      <div className="card-back">
        <img src={bgCardBack} alt="Card back background" className="card-bg" />
        <div className="card-back-content">
          <div className="card-cvc">{displayCVC}</div>
        </div>
      </div>
    </div>
  );
}
