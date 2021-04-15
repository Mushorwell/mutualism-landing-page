import React from "react";

export default function Register(){
    return(
        <div>
            <form action="" className="card">
                <div class="card-header">
                    Sign Me Up!
                </div>
                <div className="card-body">
                    <div className="form ">
                        <input type="text" className="form-element full_name" value="" name="" placeholder="Full Name"/>
                    </div>
                    <div className="form">
                        <input type="email" className="form-element email" value="" name="" placeholder="Email"/>
                    </div>
                    <div className="form">
                        <input type="text" className="form-element industry" value="" name="" placeholder="Industry"/>
                    </div>
                    <div className="form">
                        <input type="text" className="form-element asset" value="" name="" placeholder="Asset Need"/>
                    </div>
                    <div className="form">
                        <input type="submit" className="form-element submit-button"/>
                    </div>
                </div>

            </form>
        </div>
    );
}