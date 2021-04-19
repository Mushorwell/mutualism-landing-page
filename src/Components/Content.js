import React from 'react';
import Register from './Register';
import {AiFillDollarCircle, AiFillInfoCircle, AiFillBook} from 'react-icons/ai';
import banner from "../images/Bottom-Banner2.jpg";
import logo from "../images/mutualism-logo-white-no-text.svg";
import izandlaZiyagezana from "../images/IzandlaGraphic-black-bg.svg";
import { Redirect } from "react-router-dom";


export default function Content() {
    return(
        <div className="content">
            <div className="container">
                <div className="body-content">
                    <div className="header">
                        <img src={logo} alt="Mutualism Logo" className="mutualism-logo"/>
                        <h1 style={{marginTop:"0"}}>Be the first to hear when funding is available!</h1>
                        <h2>Hi! We're Mutualism, we're here to help your business grow. </h2>
                    </div>
                    <div className="mainbody">
                        <div className="body-element">
                            <h1 className="sub">MUTUALISM NE KASI</h1>
                            <h2 className="hashtag">#IzandlaZiyagezana</h2>
                            <h3 style={{fontWeight:100}}><AiFillDollarCircle color={"#46A16E"}/> Funding for an asset or machine that your business needs</h3>
                            <h3 style={{fontWeight:100}}><AiFillInfoCircle color={"#46A16E"}/>Consulting services to keep</h3>
                            <h3 style={{fontWeight:100}}><AiFillBook color={"#46A16E"}/>Education material to help you better manage your business</h3>
                            <img src={izandlaZiyagezana} alt="Izandla Ziyagezana: One hand washes the other." className="izandla"/>
                        </div>
                        <div className="body-element">
                            <Register/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <img src={banner} alt="Mutualism Footer Banner" className="banner"/>
                </div>
            </div>
        </div>
    )
}