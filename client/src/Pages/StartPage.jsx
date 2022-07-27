import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api";

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
                <img className="my-4 w-50" src="data:image/png;base64,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" alt="" />
                <h1 className="h3 mb-1 fw-normal">Willkommen</h1>
                <p className="mb-4">Melden Sie sich bei Ihrem <span className="fw-bold">matched.io</span> Konto an, um mit dem Tech Team zu chatten.</p>    
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