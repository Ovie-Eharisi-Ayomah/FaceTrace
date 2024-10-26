import './App.css';
import { Component } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';






const initialState = {
  input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  loadUser =(data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col.toFixed(3) * width,
      topRow:clarifaiFace.top_row.toFixed(3) * height,
      rightCol: width - (clarifaiFace.right_col.toFixed(3) * width),
      bottomRow: height - (clarifaiFace.bottom_row.toFixed(3) * height),
    }
}

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://facetrace-backend.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response =>
        response.json()
      )
      .then(response => {
        if (response) {
          fetch('https://facetrace-backend.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => 
              response.json()
            )
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        console.log(response);
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
    



  onRouteChange = (route) => {
    if (route === 'register') {
      this.setState({isSignedIn: false})
    } else if (route === 'signIn') {
      this.setState(initialState);
      this.setState({isSignedIn: false})
    } else {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  

  render(){
    return (

      <div className="App">
        {/* <Particles className='particles'
          options={options}
        /> */}
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
          ? <div>
          <Logo/>
          <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
          : (
            this.state.route === 'signIn'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
            
        }
        </div>
    );
  }
}

export default App;
