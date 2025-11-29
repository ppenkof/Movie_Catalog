import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const {registerHandler} = useContext(UserContext); 

  // After second exerise way with formData without real state management
  // const registerSubmit = (formData) => {

  //     const email = formData.get('email');
  //     const password = formData.get('password');
  //     const confirmPassword = formData.get('confirm-password');

  //     //Validation

  //     if(!email || !password){
  //     return alert('All fields are required!');
  //     };

  //     if(password !== confirmPassword){
  //     return alert('Passwords don\'t match!');
  //     }

  //     try {
  //         //Register user
  //         onRegister(email, password);
  //         navigate('/');
  //     } catch (error) {
  //         alert(error.message);
  //     }

  // }

  const registerSubmitHandler = async (values) => {
    const { email, password, confirmPassword: confirmPassword } = values;
    //Validation

    if (!email || !password) {
      return alert("All fields are required!");
    }

    if (password !== confirmPassword) {
      return alert("Passwords don't match!");
    }

    try {
      //Register user
      await registerHandler(email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const { 
    register,
    formAction, 
} = useForm(registerSubmitHandler, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <section id="register-page" className="content auth">
      <form id="register" action={formAction}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Your Email"
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="new-password"
            {...register("password")}
            id="register-password"
            placeholder="Password"
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="new-password"
            {...register("confirmPassword")}
            id="confirm-password"
            placeholder="Repeat Password"
          />

          <input className="btn submit" type="submit" value="Register" />
        </div>
      </form>
    </section>
  );
}
