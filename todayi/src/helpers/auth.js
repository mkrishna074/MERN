import axios from 'axios';
axios.defaults.withCredentials = true;

// Headers
const config = {
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:5000'
    }
};

const Auth = {
    isAuth: false,
    authenticate() {
        this.isAuth = true;
        console.log('test');
    },
    signout() {
        this.isAuth = false;
    },
    async getAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        axios
      .post('http://localhost:5000/api/auth/refreshToken', config)
      .then(res => {
          console.log(res.data);
            if(res.data.message === 'Token expired' || res.data.message === 'No cookie'){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.log('Token expired');
                this.signout();
            } else if(res.data.message === 'Please continue'){
                console.log('Please continue');
                this.authenticate();
            } else {
                localStorage.setItem('token', res.data.token);
                console.log('else');
                this.authenticate();
            }
        }
      );
     return await this.isAuth;
    }
};


export default Auth;