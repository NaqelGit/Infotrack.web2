import defaultUser from '../utils/default-user';

export async function signIn(email, password) {
  try {
    // Send request
    console.log(email, password);
    

    //const inputObject = { Username: '11444', password: '159' }
    const inputObject = { Username: email, password: password }

    const options = {

      method: 'post',

      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json',
        //  'Access-Control-Allow-Credentials': 'true',
        //  'Access-Control-Allow-Origin': '*'
      }
    }

    if (inputObject != null)
      options.body = JSON.stringify(inputObject)
 
    const url="http://34.18.77.113/pointer/auth"
    const response = await fetch(url,options)
    const res = await response.json();
    console.log("ANIL",res)
    if (res.status !== 401) {

      localStorage.setItem("infotrack_token",res.token);
      localStorage.setItem("infotrack_username",email);

      const myUser = {
        email: email,
        avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
        token:res.token
      }
      return {
        isOk: true,
        data: myUser
           };
    }
    else
    {
      return {
      isOk: false,
      message: "Authentication failed"
    };

    }
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser() {
  try {
    // Send request
     
    const token=localStorage.getItem('infotrack_token')
    const username=localStorage.getItem('infotrack_username')

    console.log("ANIL",token,username)
    if (token){
      const defaultUser = {
        email: username,
        avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
        token:token
      }

      return {
        isOk: true,
        data: defaultUser
      };
       
        }
      else{ 
        return {
          isOk: false,
          data: undefined
        };
    }
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}