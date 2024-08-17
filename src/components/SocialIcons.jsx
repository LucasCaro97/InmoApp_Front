import React from "react";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";

const SocialIcons = () => {
  return (
    <div className="flex gap-2 mr-6">
      <WhatsAppIcon size={32} />
      <FacebookIcon size={32} />
      <InstagramIcon size={32} />
    </div>
  );
};

export { SocialIcons };
