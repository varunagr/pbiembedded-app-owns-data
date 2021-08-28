import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const Users = () => {
    const [message, setMessage] = useState("");

    const [idpUserId, setIdpUserId] = useState("");
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");

    const history = useHistory();
    const [showNewUser, setShowNewUser] = useState(false);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const callShowNewUser = () => {
        setShowNewUser(true);    
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            let userData = {
                userId: idpUserId,
                email: email,
                lastName: lastName,
                firstName: firstName 
            };
            const createUserResponse = await fetch(`${serverUrl}/users`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log('createUserResponse is ' + createUserResponse);
            const createUserResponseData = await createUserResponseData.json();
            console.log('createUserResponseData is ' + createUserResponseData);

            history.push("./admin");
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <div className="container">
                <h1>Users</h1>
            </div>
            <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={callShowNewUser}
                >
                New User
            </button>
            </div>
            {showNewUser &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    IDP User Id:
                    <input type="text" value={idpUserId} onChange={e => setIdpUserId(e.target.value)} />
                </label>
                <label>
                    Email Address:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={e => setEmail(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>}

        </div>
    );
}

export default Users;