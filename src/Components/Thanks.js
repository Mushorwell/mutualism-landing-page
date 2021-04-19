import logo from "../images/mutualism-logo-white-no-text.svg";
import banner from "../images/Bottom-Banner2.jpg";
import video from "../video/play.mp4";

export default function Thanks() {
    return(
        <div className="content">
            <div className="container">
                <div className="body-content">
                    <div className="header">
                        <img src={logo} alt="Mutualism Logo" className="mutualism-logo"/>
                        <h1 style={{marginTop:"0"}}>Thank you for signing up for our newsletter!</h1>
                        <h2></h2>
                    </div>
                    <div className="mainbody">
                        <a href="https://mutualism.co.za" className="link">Visit our website</a>
                    </div>
                </div>
                <div className="footer">
                    <img src={banner} alt="Mutualism Footer Banner" className="banner"/>
                </div>
            </div>
        </div>
    )
}