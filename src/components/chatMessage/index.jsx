import React , { useState } from "react";
import "./index.css"

function ImageWithFallback({ src, firstName, lastName, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const getAccentColor = (firstName, lastName) => {
    // Generate a random color based on the hash of the concatenated first and last name
    const hash = lastName + firstName;
    let color = '';
    
    for (let i = 0; i < hash.length; i++) {
      color += hash.charCodeAt(i).toString(16);
    }
    return '#' + color.slice(color.length - 6, color.length); // Limit to 6 characters to ensure a valid color code
  };

  const initials = (firstName.charAt(0)).toUpperCase();
  const accentColor = getAccentColor(firstName, lastName);

  return (
    <div>
      {imageLoaded ? (
        <img
          src={src}
          alt="Sender"
          className="rounded-circle"
          style={{ width: "30px", height: "30px" }}
        />
      ) : (
        <div
          style={{
            backgroundColor: accentColor,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '30px',
            color: '#fff',
          }}
        >
          {initials}
        </div>
      )}
      <img
          src={src}
          alt={alt}
          className="rounded-circle"
          style={{ width: "40px", height: "40px", display: "none" }}
          onLoad={handleImageLoaded}
          onError={handleImageError}
        />
    </div>
  );
}



const ChatMessage = ({ message, isMine, time, senderName, senderImage, firstName, lastName }) => {
  return (
    <div
      className={`d-flex ${
        isMine ? "justify-content-end" : "justify-content-start"
      } mb-2 mt-2 gap-2`}
    >
      {!isMine && senderImage && (
          <ImageWithFallback src={senderImage} alt="User Avatar" firstName={firstName} lastName={lastName} />
        )}
      <div
        className={`px-2 py-0 d-flex arrorPointer ${isMine ? "arrorPointerRight" : "arrorPointerLeft"}`}
        style={{ borderRadius: "2px", backgroundColor: isMine ? "#93baf8" : "#faa3a3", maxWidth: "70%", minWidth: "200px" }}
      >
        <div className="w-100 text-blck">

          <small className="text-white small">
            {!isMine && senderName && <strong>{senderName}</strong>}
          </small>
          <div className={`mb-0 ${isMine ? "mt-2" : ""}`}>{message}</div>
          <div className="small-right">
          <small className="text-white small">{time}</small>
          </div>
        </div>
      </div>
      {/* {isMine && senderImage && (
          <ImageWithFallback src={senderImage} alt="User Avatar" firstName={firstName} lastName={lastName} />
        )} */}
    </div>
  );
};

export default ChatMessage;
