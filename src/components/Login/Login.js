import React from 'react';
//import { PropTypes } from 'prop-types';


class Login extends React.Component {

    render()
    {
        return (
            <React.Fragment>

                <h2>Chatroom</h2>
                <form>
                    <div class="container">
                        <label for="username"><b>Username</b></label>
                        <input type="text" placeholder="Choose Username" name="username" required/>

                        <button type="submit" >Login</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }


}

export default Login;