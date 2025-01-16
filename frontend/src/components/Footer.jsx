const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Quiz Builder. All Rights Reserved.
        </p>

        {/* Right Section */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
