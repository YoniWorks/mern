// function LoggedInName()
// {

//     var user={}

//     function doLogout(event:any) : void
//     {
// 	    event.preventDefault();
		
//         alert('doLogout');
//     };    

//     return(
//       <div id="loggedInDiv">
//         <span id="userName">Logged In As John Doe </span><br />
//         <button type="button" id="logoutButton" className="buttons" 
//            onClick={doLogout}> Log Out </button>
//       </div>
//     );
// };

function LoggedInName()
{
	
    // var _ud = localStorage.getItem('user_data');
    // var ud = JSON.parse(_ud);
    // var userId = ud.id;
    // var firstName = ud.firstName;
    // var lastName = ud.lastName;
    var _ud = localStorage.getItem('user_data');
    
    if (!_ud) {
        return <div id="loggedInDiv">Not Logged In</div>; 
    }

    var ud;
    try {
        ud = JSON.parse(_ud);
    } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user_data");
        return <div id="loggedInDiv">Not Logged In</div>;
    }

    var userId = ud?.id;
    console.log("User ID:", userId);
    var firstName = ud?.firstName;
    var lastName = ud?.lastName;

    const doLogout =  (event: React.MouseEvent<HTMLButtonElement>) => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {firstName} {lastName}</span><br />
   <button type="button" id="logoutButton" className="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );

};

export default LoggedInName;

