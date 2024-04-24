function Footer() {
  return (
    <footer className="flex-shrink-0 w-full h-24 bg-footer sm:basis-24 flex items-center justify-center">
      <p className="text-white font-robotoslab ">
        &copy;{new Date().getFullYear()} NourishLink. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
