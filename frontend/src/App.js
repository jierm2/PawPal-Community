import logo from "./logo.svg";
import "./App.css";

import SignUp from "./signUp";
import SignIn from "./signIn";

function App() {
  // return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
