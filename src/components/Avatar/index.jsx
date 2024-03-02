import { Avatar } from "@mui/material";
import { useState } from "react";
import { checkImageURL } from "../../helper/util";

function stringToColor(string="initials") {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name="initials name", size) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: size || '100%',
      width: size || '100%',
      fontSize: size/1.7 +"px",
      paddingTop: size/6 + "px"
    },
    children: `${name.split(' ')?.[0]?.[0]?.toLocaleUpperCase()}`,
  };
}

export function CustomAvatar({ src, firstName, lastName, alt, size }) {
  const newSrc = checkImageURL(src);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div>
      {imageLoaded ? (
        <img
          src={newSrc}
          alt="Sender"
          className="rounded-circle"
          style={{ width: size ? `${size}px` : '100%', aspectRatio: 1, objectFit: "contain"}}
        />
      ) : (
        <Avatar {...stringAvatar([firstName, lastName].filter(a => a).join(" "), size) } />
      )}
      <img
          src={newSrc}
          alt={alt}
          className="rounded-circle"
          style={{ width: "40px", height: "40px", display: "none" }}
          onLoad={handleImageLoaded}
          onError={handleImageError}
        />
    </div>
  );
}