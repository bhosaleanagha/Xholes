import React from 'react';
import ReactDOM from 'react-dom';
import Card from './KH.png';
import Car from './car.jpg';
import Cover from './CV2.png';
import Empty from './MT.png';
import loadImages from './images';
import loadValues from './images';



export default function xholes_init(root,channel) {
ReactDOM.render(<Xholes channel={channel}/>, root);
}

class Xholes extends React.Component {
  constructor(props) {
    super(props);
	  this.channel = props.channel;
	  const imagelist = loadImages();
	  const values = loadValues();
	  //console.log(imagelist.length);
	  //console.log(imagelist[0].id);
	  //var i;
	  //const ids=[];
	  //const images1=[];

	  //for(i=0;i<imagelist.length;i++) {
	//	ids[i]=imagelist[i].id;
	//	images1[i]=imagelist[i].img;  
	//	console.log(images1[i]);  
	 // }
	  this.state = {
		  index: 0,
		  curr: 10,
		  ready: 0,
		  images: imagelist,
		  ids: values,
		  prev: "",
		  deckCount: 12,
		  turn: 0
	  }
	this.channel.join()
                .receive("ok",this.new_view.bind(this))
                .receive("error",resp => {console.log("Unable to join",resp);}); 
                console.log("check");

  }

  new_view(env){
	console.log("in view");

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
	 
	  console.log(evt.target.alt);

	  if(evt.target.alt === "cover") {
		  alert("Its a cover");
		  console.log(evt.target.id);
		  evt.target.alt = "NC";		 
		  evt.target.src = this.state.images[7];

	  }

	  if(evt.target.alt != "NC") {
			
 	  	if(this.state.prev == "") {
			  this.setState({prev: evt.target.id});
	  	}

	  	else {
			  var temp = evt.target.src;
		  	  var old = document.getElementById(this.state.prev);
			  //old.src = {temp};
			  evt.target.src = old.src;
			  old.src = temp;
		 	
			
			this.setState({prev: ""});



	  	}

	  }

  }

 discard(evt) {
	
	 //var play = document.getElementById("P2");
	 //play.disabled = true;

	 var discarded = document.getElementById("empty");
	 discarded.src = document.getElementById("deck").src;
	 var deckCard = document.getElementById("deck");
	 deckCard.src = Cover;

	 //if(this.state.deckCount == 53) {

		 
	// }
	 

	 
/*return(
<fieldset disabled>
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
</fieldset>);*/

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


  changeDeck(env) {
	
	env.target.src = this.state.images[this.state.deckCount];
	
	if(this.state.deckCount!=53) {
	  this.setState({deckCount: this.state.deckCount+1});
	}
	else {
	  //var deckCard = document.getElementById("deck");
	  //deckCard.src=	this.state.images[12];
	  this.setState({deckCount: 12});
	}


  }


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
 			
			 
		  		<img id="A0" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover" />
	    	  		<img id="A2" src={this.state.images[2]} onClick= {this.changeMe.bind(this)} /> 
	    	 		<img id="A4" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover" />
		  
			
	    		</div>

	    		<div className="row">
			
	    			<img id="A1" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover" />
	    			<img id="A3" src={this.state.images[3]} onClick= {this.changeMe.bind(this)} />
	    			<img id="A5" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover" />
	    		
	    		</div>
		</div>

	    	<div className="column" align="center">
	    		<div className="row">
	   		 <p>
	    			<img id="deck" src={Cover} onClick={this.changeDeck.bind(this)}/>
	    			<img id="empty" src={Empty} />
	    		</p>
	    		</div>

	    		< div className="row">
	    		<em>
	    			<button id="discard" onClick={this.discard.bind(this)}>Discard</button>
	    		</em>
	    		</div>
	    			
	    		
	    	</div> 
		

		   	
	    	<div className="column">
	    	<fieldset id="P2">
	    		<div className="row">
	    		
	    			<img id="B0" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			<img id="B2" src={this.state.images[8]} onClick= {this.changeMe.bind(this)} />
	    			<img id="B4" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    		
	    		</div>

	    		<div className="row">
	    			<img id="B1" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			<img id="B3" src={this.state.images[9]} onClick= {this.changeMe.bind(this)} />
	    			<img id="B5" src={Cover} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    		</div>
	    	</fieldset>
	    	</div> 
	    	
	    	
    	</div>
    
    	<div className="row">
	    <h1>New Row</h1>
	</div>

	</div>
    );

  }
}


