/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { apiBaseUrl } from "../api/api"

// custom hook
export const user = (token) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        if(!token) {
            return
        }

        fetch(apiBaseUrl + "/api/users/userinfo", {
            headers: {
                token: "JWT " + token
            }
        })
        .then(response => response.json())
        .then(userInfoResult => setUserInfo(userInfoResult))
    }, [token])
    
    return userInfo
}