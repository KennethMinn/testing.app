import { useState } from "react";

const OtpInput = ({ length, onChangeOTP, verified = false }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    onChangeOTP(newOtp.join(""));

    // Focus next input if the current one has a value
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace and move focus to the previous input
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      newOtp[index] = ""; // Clear current input
      setOtp(newOtp);
      onChangeOTP(newOtp.join(""));

      if (index > 0 && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          name="otp"
          // onFocus={() => console.log(index)}
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-10 h-10 text-center border-[3px] rounded-[10px] bg-secondary outline-none border-secondary-border ${
            verified && " text-success"
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
