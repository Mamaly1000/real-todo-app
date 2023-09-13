import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  emailImage,
  gitHubImage,
  telegramImage,
  twitterImage,
  whatsAppImage,
} from "../../assets/contact/contacts";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center min-h-[100px]  relative   flex-wrap   gap-5 bg-modal_container p-2">
      <div className="w-fit flex [&>a>img]:max-w-[50px] flex-wrap justify-start items-center text-[1.3rem] capitalize font-bold text-modal_header gap-5 ">
        <Link
          legacyBehavior
          target="_blank"
          href="https://github.com/Mamaly1000"
        >
          <a className="w-fit h-fit hover:scale-110 transition-all drop-shadow-2xl">
            <Image src={gitHubImage} />
          </a>
        </Link>
        <Link legacyBehavior href="https://wa.me/989214508479" target="_blank">
          <a className="w-fit h-fit hover:scale-110 transition-all drop-shadow-2xl">
            <Image src={whatsAppImage} />
          </a>
        </Link>
        <Link
          legacyBehavior
          target="_blank"
          href="mailto:mamadmehdi.aziz.10@gmail.com"
        >
          <a className="w-fit h-fit hover:scale-110 transition-all drop-shadow-2xl">
            <Image src={emailImage} />
          </a>
        </Link>
        <Link legacyBehavior target="_blank" href="https://t.me/Mamaly1000">
          <a className="w-fit h-fit hover:scale-110 transition-all drop-shadow-2xl">
            <Image src={telegramImage} />
          </a>
        </Link>
        <Link
          legacyBehavior
          target="_blank"
          href="https://twitter.com/mamaly100"
        >
          <a className="w-fit h-fit hover:scale-110 transition-all drop-shadow-2xl">
            <Image src={twitterImage} />
          </a>
        </Link>
      </div>
      <p className="text-center w-fit   capitalize">
        Copyright © {new Date().getFullYear()}, All Rights Reserved for
        <Link
          legacyBehavior
          target="_blank"
          href="https://github.com/Mamaly1000"
        >
          <a className="font-bold text-btn_color"> MohammadMehdiAzizi</a>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
