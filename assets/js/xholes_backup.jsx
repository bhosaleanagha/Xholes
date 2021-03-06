import React from 'react';
import ReactDOM from 'react-dom';
import Card from './KH.png';
import Car from './car.jpg';
import Cover from './CV2.png';
import loadImages from './images';
import loadValues from './images';



export default function xholes_init(root,channel) {
  ReactDOM.render(<Xholes channel={channel}/>, root);
}

class Xholes extends React.Component {
  constructor(props) {
    super(props);
	  const imagelist = loadImages();
	  const values = loadValues();
	  console.log(this.channel);
                this.channel=props.channel;
                console.log("Channel"+this.channel);
	  //console.log(imagelist[0].id);
	  //var i;
	  //const ids=[];
	  //const images1=[];

	  //for(i=0;i<imagelist.length;i++) {
	//	ids[i]=imagelist[i].id;
	//	images1[i]=imagelist[i].img;  
	//	console.log(images1];  
	 // }
	  this.state = {
		  index: 0,
		  curr: 10,
		  ready: 0,
		  images: imagelist,
		  ids: values,
		  p1name:"",
		  p2name:"",
		  p1score: 0,
		  p2score: 0,
		  position: [],

	  }
	  this.channel.join()
                .receive("ok",this.new_view.bind(this))
                .receive("error",resp => {console.log("Unable to join",resp);});
	  console.log("In constructor "+this.state.images);
  }

new_view(view){
        console.log("new view", view.game);
                this.setState(view.game);
        }

  componentDidMount() {
		
	  //const images = loadImages();
	  //console.log(this.state.images);
	  //this.setState({images},()=>this.tryme(this));
	  
  }

tryme(env)
	{
	console.log(this.state.curr + " " + this.state.index);
	}

  showimg(_ev) {
	  console.log(this.state.images[1].src);
	  console.log(_ev.target.id);
	 	
	  /*
	  var ele = _ev.target.childNodes;
	  console.log(ele[0]);
	  ele[0].src={Car};
	  */
	  //_ev.target.src="car.jpg";
	  var img=document.getElementById("img");
	  
	  //console.log(img);
	  
	  if(this.state.index!=5) {
	  	this.setState({index: this.state.index+1});
  	  }
	  else {
		this.setState({index: 0});
	  }
	  
	  
	  
	  //var newimg = this.state.images[1];
	  //console.log(newimg);
	  //img.src = newimg;
	  //img.display = 'block';
	
	  //_ev.target.innerHTML = _ev.target.id;
  }

  changeMe(evt) {

	  console.log(this.state.ready);
		
	  if(this.state.ready == 1) {
		  var temp = this.state.index;
		  this.setState({index: this.state.curr});
		  this.setState({curr: temp});
		  this.setState({ready: 0});
	  		
	  }
	  else {
		  evt.target.disabled=true;
		  this.setState({ready: 1});
	  }
  }

  
/*
  columns() {
	  var imageGrid = [];
	  var keyimg1;
	  var keyimmg2;
	  
		  imageGrid.push(<img src={this.state.images[this.state.index]} />);
		  imageGrid.push(<br><br/>);
		  imageGrid.push(<img src={this.state.images[this.state.curr]} />);
	  
	
	  return imageGrid;

  }
	*/


  render() {
    return( 
	    <div>
	    
	    <div className="row">
		<div className="column" >
		<h1>Player1</h1>
	    	</div>
		<div className="column">
	    	</div>
	    	<div className="column">
	    	<h1>Player2</h1>
	    	</div>
	    </div>

	    <div className="row">
		<div className="column">
	    		<div className="row">
 			
			 
		  		<img id="img" src={this.state.images[this.state.index]} onClick= {this.changeMe.bind(this)} />
	    	  		<img id="other" src={this.state.images[1]} onClick= {this.changeMe.bind(this)} /> 
	    	 		<img id="A3" src={this.state.images[2]} onClick= {this.changeMe.bind(this)} />
		  
			
	    		</div>

	    		<div className="row">
			
	    			<img id="A4" src={this.state.images[3]} onClick= {this.changeMe.bind(this)} />
	    			<img id="A5" src={this.state.images[4]} onClick= {this.changeMe.bind(this)} />
	    			<img id="A6" src={this.state.images[5]} onClick= {this.changeMe.bind(this)} />
	    		
	    		</div>
		</div>

	    	<div className="column" align="center">
	    		<div className="row">
	   		 <p>
	    			<img id="cover" src={Cover}/>
	    		</p>
	    		</div>

	    		< div className="row">
	    			
	    		</div>
	    	</div> 

	    	<div className="column">
	    		<div className="row">
	    		
	    			<img id="B1" src={this.state.images[0]} onClick= {this.changeMe.bind(this)}/>
	    			<img id="B2" src={this.state.images[6]} onClick= {this.changeMe.bind(this)} />
	    			<img id="B3" src={this.state.images[7]} onClick= {this.changeMe.bind(this)} />
	    		
	    		</div>

	    		<div className="row">
	    			<img id="B4" src={this.state.images[0]} onClick= {this.changeMe.bind(this)} />
	    			<img id="B5" src={this.state.images[1]} onClick= {this.changeMe.bind(this)} />
	    			<img id="B6" src={this.state.images[2]} onClick= {this.changeMe.bind(this)} />
	    		</div>
	    	</div>
    	</div>
    
    	<div className="row">
	    <h1>New Row</h1>
	</div>

	</div>
    );

  }
}


