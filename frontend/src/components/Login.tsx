import React, { useState } from 'react';

const app_name = 'yoniworks.net';
function buildPath(route: string): string {
    if (process.env.NODE_ENV !== 'development') {
        return 'http://' + app_name + ':5000/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

function Login() {

  const [message,setMessage] = useState('');
  const [loginName,setLoginName] = React.useState('');
  const [loginPassword,setPassword] = React.useState('');

  async function doLogin(event:any) : Promise<void>
  {
      event.preventDefault();

      var obj = {login:loginName,password:loginPassword};
      var js = JSON.stringify(obj);

      try
      {    
        const response = await fetch(buildPath('api/login'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        

          var res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
              var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/cards';
            }
        }
        catch(error:any)
        {
            alert(error.toString());
            return;
        }    
      };


  function handleSetLoginName( e: any ) : void
    {
      setLoginName( e.target.value );
    }

  
    function handleSetPassword( e: any ) : void
    {
      setPassword( e.target.value );
    }


//   return (
//     <div id="loginDiv">
//       <span id="inner-title">PLEASE LOG IN</span>
//       <br />
//       Login: <input type="text" id="loginName" placeholder="Username" 
//           onChange={handleSetLoginName} />

//       <br />
//       Password: <input type="password" id="loginPassword" placeholder="Password" 
//           onChange={handleSetPassword} />

//       <br />
//       <input
//         type="submit"
//         id="loginButton"
//         className="buttons"
//         value="Do It"
//         onClick={doLogin}
//       />
//      <span id="loginResult">{message}</span>
//     </div>
//   );
// }
return (
  <div className="flex flex-col items-center">

    <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">

      <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

      <form onSubmit={doLogin} className="space-y-4">

        <input
          type="text"
          placeholder="Username"
          className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={loginName}
          onChange={handleSetLoginName}
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={loginPassword}
          onChange={handleSetPassword}
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
        >
          LOGIN
        </button>
      </form>


      {message && (
        <p className="text-red-500 text-sm text-center mt-2">{message}</p>
      )}


      <p className="text-center text-base text-gray-600 mt-4">
        Not registered?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Create an account.
        </a>
      </p>
    </div>
  </div>
);


};
export default Login;
