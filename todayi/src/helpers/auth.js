import axios from 'axios';
import history from './history'
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
        console.log(this.isAuth);
    },
    async getAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        axios
      .post('http://localhost:5000/api/auth/refreshToken', config)
      .then(res => {
            if(res.data.message === 'Token expired' || res.data.message === 'No cookie'){
                this.signout();
                console.log('Token expired');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                history.push('/login');
            } else if(res.data.message === 'Please continue'){
                console.log('Please continue');
                this.authenticate();
            } else if(res.data.token){
                localStorage.setItem('token', res.data.token);
                console.log('token');
                this.authenticate();
            } else  {
                this.signout();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                history.push('/login');
            }
        }
      ).catch(err => {
        this.signout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
      });
     return await this.isAuth;
    }
};


export default Auth;