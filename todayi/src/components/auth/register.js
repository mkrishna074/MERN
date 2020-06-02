import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Register extends Component {
    state = {
      name: '',
      email: '',
      password: '',
      msg: null
    };
  
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      register: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
    };
  
    componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props;
      if (error !== prevProps.error) {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }
  
      // If authenticated, close modal
      if (this.state.modal) {
        if (isAuthenticated) {
            this.props.clearErrors();
        }
      }
    }
  
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    onSubmit = e => {
      e.preventDefault();
  
      const { name, email, password } = this.state;
  
      // Create user object
      const newUser = {
        name,
        email,
        password
      };
  
      // Attempt to register
      this.props.register(newUser);
    };
  
    render() {
      return (<>
      <h2>Register</h2>
      {this.state.msg ? (
              <alert color='danger'>{this.state.msg}</alert>
            ) : null}
            <form onSubmit={this.onSubmit}>
                <label for='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  onChange={this.onChange}
                />

                <label for='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={this.onChange}
                />

                <label for='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.onChange}
                />
                <button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </button>
            </form></>)
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);