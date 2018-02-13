import React from 'react';
import ReactDOM from 'react-dom';
import Image from './components/Image/Image';

class App extends React.Component {
    render(){
      return <Image/>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
