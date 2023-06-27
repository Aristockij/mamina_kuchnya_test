import React from 'react';


const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer ">
            <div className='footer-container cols cols--acenter'>
                <div className='footer-left cols cols--acenter'>
                    <div>
                        <span>
                            Хлебозаводcкой проезд, 22
                        </span>
                    </div>
                    <div>
                        <span>
                            <a href="tel:8 (8332) 760-630">8 (8332) 760-630</a>
                        </span>
                    </div>
                </div>

                <div>
                    мы открыты с 8:00 до 20:00
                </div>
            </div>

        </footer>
    )
}

export default Footer;