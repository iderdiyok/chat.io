import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import logo from "../logo.png"

const StartPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const loginUser = (event) => {
        event.preventDefault()

        fetch(apiBaseUrl + "/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                props.loginSuccess(data.token)
                return
            }else{
                setError(data.error.message)
            }
      })
  }

    return ( 
        <main className="form-signin col-sm-8 col-md-4 text-center mx-auto">
            <form className="w-100 mt-5 pt-3">
                <img className="my-4 w-50" src={logo} alt="" />
                <h1 className="h3 mb-1 fw-normal">Willkommen</h1>
                <p className="mb-4">Melden Sie sich bei Ihrem <span className="fw-bold">chat.io</span> Konto an, um mit dem Tech Team zu chatten.</p>    
                <div className="form-floating mb-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoComplete="off" />
                    <label for="floatingInput">E-Mail-Adresse</label>
                </div>
                <div className="form-floating mb-4">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="off" />
                    <label for="floatingPassword">Passwort</label>
                </div>

                <button className="w-100 btn btn-lg App-link mb-2" type="submit" onClick={loginUser}>Fortfahren</button>
                <p className="mb-3 text-muted">
                    Sie haben noch kein Konto? 
                    <span>
                        {" "}
                        <Link to="/signup" className="App-text">Registrieren</Link>{" "}
                    </span>
                </p>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </main>
    );
}

export default StartPage;