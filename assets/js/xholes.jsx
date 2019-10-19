import React from 'react';
import ReactDOM from 'react-dom';
import Car from './KH.png';
import loadImages from './images';



export default function xholes_init(root) {
  ReactDOM.render(<Xholes />, root);
}

class Xholes extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {images:[]}
  }


  componentDidMount() {
		
	  const images = loadImages();
	  console.log(images);
	  this.setState({images},()=>this.tryme(this));
	  
  }

tryme(env)
	{
	console.log(this.state.images[0].src);
	}

  showimg(_ev) {
	  console.log(this.state.images[1].src);
	  console.log(_ev.target.id);
	  _ev.target.src="KH.png";
	  var img=document.getElementById("img");
	  
	  //console.log(img);
	  
	  var newimg = this.state.images[1].src;
	  console.log(newimg);
	  img.src = newimg;
	  img.display = 'block';
	
	  //_ev.target.innerHTML = _ev.target.id;
  }

  render() {
    return (<div>
        <h2>Xholes loaded.</h2>
	<p> 
		 <button id="King" onClick = {this.showimg.bind(this)} >
		  </button>
		  <img id="img" src={Car}/>
		  <input type="input"></input>
	</p>
    	</div>);
  }
}
