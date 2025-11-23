

export default function Register({
    user,
    onRegister
}){
    //const [user, setUser] = useState(null);
    const registerSubmit = (formData) => {

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        //Validation

        if(!email || !password){
        return alert('All fields are required!');
        };

        if(password !== confirmPassword){
        return alert('Passwords don\'t match!');
        }

        //Register user
        onRegister(email);

    }

    return (
        <section id="register-page" className="content auth">
            <form id="register" action={registerSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>
    {user && <p>Registered as: {user.email}</p>}
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your Email"/>
    
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" placeholder="Password"/>
    
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Repeat Password"/>
    
                    <input className="btn submit" type="submit" value="Register"/>
                </div>
            </form>
        </section>
    );
}