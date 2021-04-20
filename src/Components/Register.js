import React,{useState, useEffect} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from 'react-loader-spinner';

export default function Register(){
    const [signUpDetails, setSignUpDetails] = useState({
        fName: '',
        lName: '',
        email: '',
        confirmEmail: ''
    });

    const [formValid, setFormValid] = useState({
        fNameStatus:null,
        lNameStatus:null,
        email:null,
        confirmEmail:null
    });

    const [formStatus, setFormStatus] = useState("");

    const [errors, setErrors] = useState({
        fNameErr:'',
        lNameErr:'',
        emailErr:'',
    });
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [submissionError, setSubmissionError] = useState("");

    const emailRegex = /\S+@\S+\.\S+/;

    const handleChange = event => {
        setSignUpDetails({
           ...signUpDetails,
           [event.target.name]: event.target.value.trim()
        });

        debouncedValidate(event.target.name, event.target.value);
    }

    const loading = ()=> {
        if(formStatus === ""){
            setFormStatus(<Loader type="Grid" color="#212529" height={20} width={20}/>);
        }
    }

    const validate = (name, val) => {
        switch(name){
            case 'fName':
                if(signUpDetails.fName===''){
                    setErrors({
                        ...errors,
                        fNameErr: 'Please enter a first name.'
                    })
                }
                else{
                    setErrors({
                        ...errors,
                        fNameErr: ''
                    })
                }
                break;
            case 'lName':
                if(signUpDetails.lName===''){
                    setErrors({
                        ...errors,
                        lNameErr: 'Please enter a last name.'
                    })
                }
                else{
                    setErrors({
                        ...errors,
                        lNameErr: ''
                    })
                }
                break;
            case 'email':
                if((!emailRegex.test(val))||val===''){
                    setErrors({
                        ...errors,
                        emailErr: 'Please enter an email address.'
                    })
                }
                else{
                    setErrors({
                        ...errors,
                        emailErr: ''
                    })
                }
                break;
            case 'confirmEmail':
                if(val===''){

                }
                else if(signUpDetails.email!==val){
                    setErrors({
                        ...errors,
                        emailErr: 'Please enter matching emails.'
                    });
                }
                else{
                    setErrors({
                        ...errors,
                        emailErr: ''
                    });
                }
                break;
        }
    }

    const clearForm = () => {
        setSignUpDetails({
            fName: "",
            lName: "",
            email: "",
            confirmEmail: ""
        });
    }

    const resetForm = () => {
        // ensure the form is clear
        setFormStatus("");
        setErrors({
            fNameErr:'',
            lNameErr:'',
            emailErr:'',
        });
        setSubmissionComplete(false);
        setSubmissionError("");
        setFormValid(false);
        clearForm();
    }

    const submit = (e) =>{
        e.preventDefault();
        loading();
        let message;
        if ((errors.fNameErr!=='') || (errors.lNameErr!=='') || (errors.emailErr!=='') || (signUpDetails.lName==='') || (signUpDetails.fName==='') ||
            (signUpDetails.email==='') || signUpDetails.confirmEmail==='') {
            // setFormValid(false);
            setSubmissionComplete(false);
            message = "Please fill in all the fields and make sure your email matches.";
            // setSubmissionError(message);
            setFormStatus(<div className="errorMessage" style={{borderRadius:"5px",padding:"15px",border:"1px solid red"}} role="alert">{message}</div>);
            // console.log(message);
        }else{
            //Configurations
            const apiUrl = `https://mutualism-test.herokuapp.com/api/mailchimp`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `email=${signUpDetails.email.trim()}&name=${signUpDetails.fName.trim()}&last_name=${signUpDetails.lName.trim()}`
            }
            // console.log(options.body);
            //API fetch method for mailchimp
            fetch(apiUrl, options)
                .then(res => {
                    if(!res.ok){
                        throw new Error(res.status);
                    }
                    return res.json();
                })
                .then(re=>{
                    setSubmissionComplete(true);
                    setSubmissionError("");
                    message = "Thank you for your details, we'll be in touch.";
                    resetForm();
                    setFormStatus(<div className="successMessage" style={{borderRadius:"5px",padding:"15px",border:"1px solid #46A16E"}} role="alert">{message}</div>);
                    document.location='/mailinglist/#/thank_you';
                    // console.log(re);
                })
                .catch(err => {
                    console.log(err);
                    if (err.message === "500"){
                        // setSubmissionError(err);
                        message = "Email already submitted."
                        setSubmissionError(err);
                        setFormStatus(<div className="errorMessage" style={{borderRadius:"5px",padding:"15px",border:"1px solid red"}} role="alert">{message}</div>);
                    }else{
                        message = "Unsuccessful, please try again later. If the error persists contact site admin."
                        setSubmissionError(err);
                        setFormStatus(<div className="errorMessage" style={{borderRadius:"5px",padding:"15px",border:"1px solid red"}} role="alert">{message}</div>);
                    }

                });
        }
    };

    const debounce = (callback, delay) => {
        let timer;
        return( ...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(...args), delay)
        };
    }

    const debouncedValidate = debounce((name, val) => validate(name, val), 1000);

    useEffect(() => {

    }, [signUpDetails, errors]);


    const onRecaptchaChange = (value)=>{
        // console.log((value)? true: false)
        if(value === "" || value === null){
            setFormValid(false);
            toggleButtonEnabled();
            // console.log(formValid);
        }else{
            setFormValid(true);
            toggleButtonEnabled();
            // console.log(formValid);
        }
    }

    const toggleButtonEnabled = () => document
        .getElementById("signUp")
        .toggleAttribute("disabled");


    return(
        <div>
            <form action="?" className="card" onSubmit={submit}>
                <div className="card-header">
                    Sign Me Up!
                </div>
                <div className="card-body">
                    <div className="form " >
                        <input type="text" className="form-element first_name" value={signUpDetails.fName} name="fName" placeholder="Full Name" onChange={handleChange}/>
                    </div>
                    <span className="errorMessage" style={errors.fNameErr?null:{display:"none"}}>{errors.fNameErr}</span>
                    <div className="form ">
                        <input type="text" className="form-element last_name" value={signUpDetails.lName} name="lName" placeholder="Last Name" onChange={handleChange}/>
                    </div>
                    <span className="errorMessage" style={errors.lNameErr?null:{display:"none"}}>{errors.lNameErr}</span>
                    <div className="form">
                        <input type="email" className="form-element email" value={signUpDetails.email} name="email" placeholder="Email" onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <input type="email" className="form-element email" value={signUpDetails.confirmEmail} name="confirmEmail" placeholder="Confirm Email" onChange={handleChange}/>
                    </div>
                    <span className="errorMessage" style={errors.emailErr?null:{display:"none"}}>{errors.emailErr}</span>
                    <ReCAPTCHA
                        sitekey="6LdSVlEaAAAAAGHJ-lrPRKC411-z5rXbdlbMVdWN"
                        onChange={onRecaptchaChange}
                    />
                    <div className="form">
                        <input type="submit" value="Submit" id="signUp" className="form-element submit-button" disabled/>
                    </div>
                    <span style={(formStatus==="")?{display:"none"}:{textAlign:"center"}}>
                        {formStatus}
                    </span>
                </div>

            </form>
        </div>
    );
}