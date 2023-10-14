import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";
import { FaHashnode } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='footer footer-center p-10 bg-base-200 text-base-content rounded'>
      <nav>
        <div className=' flex items-center space-x-4'>
          <a>
            <AiFillLinkedin className=' text-2xl hover:cursor-pointer' />
          </a>
          <a>
            <AiFillTwitterCircle className=' text-2xl hover:cursor-pointer' />
          </a>
          <a>
            <FaHashnode className=' text-2xl hover:cursor-pointer' />
          </a>
          <a>
            <AiFillGithub className=' text-2xl hover:cursor-pointer' />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2023 - All right reserved by Maaz</p>
      </aside>
    </footer>
  );
};

export default Footer;
