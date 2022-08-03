import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import logo from "../logo.png"

const Registration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState()
  const [error, setError] = useState("")
  let navigate = useNavigate();

  const doRegistration = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("password", password)
    formData.set("avatar", avatar)

    fetch(apiBaseUrl + "/api/users/register", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (!data.err) {
          navigate("/")
          return
        }

        if (data.err.validationErrors) {
          const firstError = data.err.validationErrors[0]
          setError(firstError.msg + ": " + firstError.param)
          return
        }

        setError(data.err)
      })
  }

  return (
    <main className="form-signin col-sm-8 col-md-4 text-center mx-auto">
            <form className="w-100 mt-5 pt-3">
                <img className="my-4 w-50" src={logo} alt="" />
                <h1 className="h3 mb-1 fw-normal">Willkommen</h1>
                <p className="mb-4">Erstellen Sie zum Fortfahren ein <span className="fw-bold">chat.io</span> Konto</p>    
                
                <div className="form-floating mb-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" autoComplete="off" />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoComplete="off" />
                    <label for="floatingInput">E-Mail-Adresse</label>
                </div>
                <div class="form-floating mb-3">
                  <input onChange={(e) => setAvatar(e.target.files[0])} type="file" class="form-control" id="floatingInputFile"/>
                  <label class="floatingInput" for="floatingInput">Profilbild</label>
                </div>
                <div className="form-floating mb-4">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="off" />
                    <label for="floatingPassword">Passwort</label>
                </div>

                <button className="w-100 btn btn-lg App-link mb-2" type="submit" onClick={doRegistration}>Fortfahren</button>
                <p className="mb-3 text-muted">
                    Sie haben bereits ein Konto? 
                    <span>
                        {" "}
                        <Link to="/" className="App-text">Anmelden</Link>{" "}
                    </span>
                </p>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </main>
  );
}

export default Registration;