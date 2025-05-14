import { useEffect } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
    useEffect(() => {
        // Ensure the footer logo stays the same for both light and dark modes
        document.querySelector(".tomatologofooter").style.filter = "none";
    }, []);

    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img
                        className="tomatologofooter"
                        src={assets.logo}
                        alt=""
                    />
                    <p>
                        Hangry Is A Food Ordering Website That Allows You To Order Food From Your Favorite Restaurants.
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="https://www.nishantworldiwde.in/" />
                        <img src={assets.twitter_icon} alt="https://www.nishantworldiwde.in/" />
                        <a
                            href="https://www.linkedin.com/in/divya-maheta-8b1b6a361/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={assets.linkedin_icon} alt="LinkedIn" />
                        </a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Links</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+1-213-456-7890</li>
                        <li>contact@hangry.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2025 © Hangry.com - All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;
