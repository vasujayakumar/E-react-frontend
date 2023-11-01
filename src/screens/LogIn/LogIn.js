import React from 'react';
import { withRouter } from '../../withRouter';
import './LogIn.css';
import 'tachyons'

class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      logInEmail : '',
      logInPassword: '',
      selectedOption: null,
      wrongCredentials:false,
    }
  }
  onEmailChange = (event) =>{
    this.setState({logInEmail: event.target.value})
  }
  onPasswordChange = (event) =>{
    this.setState({logInPassword: event.target.value})
  }
  onOptionChange = (option) => {
    this.setState({ selectedOption: option });
  }

  onSubmitLogIn = () =>{
    if(!this.state.logInEmail.includes('@')){
      return alert("Please enter a valid email");
    }
    if(this.state.logInEmail === '' || this.state.logInPassword ==='' || this.state.selectedOption === null){
      return alert("Please enter valid credentials");
    //https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/login
    //http://localhost:8080/api/users/login
    }
    this.setState({ wrongCredentials: false });
    fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/login',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      email:this.state.logInEmail,
      password:this.state.logInPassword,
      selectedOption: this.state.selectedOption
    })
    }).then(response => {
      if(response.status === 400){throw new Error('Wrong credentials')}
      return response.json();
      }
    )
    .then(user => {
      if(this.state.selectedOption ==='Admin'){
        if(user.admin_id){
          let new_user = {
            type: 'Admin',
            id:user.admin_id,
            name: user.full_name,
            email:user.email,
          };
          this.props.loadUser(new_user);
          this.props.navigate('/services');
        }
      }
      else if(this.state.selectedOption==='Patient'){
        if(user.id){
          let new_user = {
            type:'Patient',
            id:user.id,
            name: user.FName,
            email:user.EmailId,
          };
          this.props.loadUser(new_user);
          this.props.navigate('/services');
        } 
      }
      else if(this.state.selectedOption==='Doctor'){
        console.log("doctor login", user);
        if(user.id){
          let new_user = {
            type:'Doctor',
            id:user.id,
            name: user.Fname,
            email:user.EmailId,
          };
          this.props.loadUser(new_user);
          this.props.navigate('/services');
        } 
      }
      else{
        if(user.id){
          let new_user = {
            id:user.id,
            name: user.Hospital_Name,
            email:user.Email_Id,
          };
          this.props.loadUser(new_user);
          this.props.navigate('/services');
        }
      }
    })
    .catch(error => {
      if (error.message === 'Wrong credentials') {
        this.setState({ wrongCredentials: true });
      } else {
        console.error('There was an error during the fetch:', error);
      }
    });
  }
  render(){
    return (
      <div className="main-container login-page">
        <div className="login-section b--transparent">
          <div className="login-container shadow-5 b--dark-gray br3 b--black-10 ba b--transparent">
            <h1 className='login'>Login</h1>
            Don't have an account? <a class="noHoverEffect" href='./signUp'>SignUp</a>
            <form>
              <div className="input-group">
                <label>Select an option</label>
                <div className="optionsContainer">
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Admin' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Admin')}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Patient' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Patient')}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Doctor' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Doctor')}
                  >
                    Doctor
                  </button>
                </div>
                <div className="optionsContainer">
                <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Hospital' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Hospital')}
                  >
                    Hospital
                  </button>
                </div>
                <label>Email Address</label>
                <input className=' input-reset  bg-transparent' placeholder="Email address..." type="email"  onChange={this.onEmailChange} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input className='bg-transparent' placeholder="********" type="password"   onChange={this.onPasswordChange}/>
              </div>
              <div className="remember-me">
                <input type="checkbox" id="remember" class="larger-checkbox " />
                <label htmlFor="remember">Remember Me</label>
              </div>
              {this.state.wrongCredentials && <div className="error-message"> ⚠️ Incorrect Email or Password</div>}
              <button className='grow login-button' type='button'  onClick={() => this.onSubmitLogIn()}>Log In</button>
            </form>
            <br></br>
            {/* <a className='test noHoverEffect' href="#">Forgot Your Password?</a> */}
          </div>
        </div>

        <div className="image-section">
        </div>
  
      </div>
    ); 
  }

}


export default withRouter(LogIn);
