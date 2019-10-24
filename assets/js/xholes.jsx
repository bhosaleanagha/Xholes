import React from 'react';
import ReactDOM from 'react-dom';
import Card from './KH.png';
import Car from './car.jpg';
import Cover from './CV2.png';
import Empty from './MT.png';
import loadImages from './images';
import loadValues from './values';
import $ from 'jquery';



export default function xholes_init(root,channel) {
ReactDOM.render(<Xholes channel={channel}/>, root);
}

class Xholes extends React.Component {
  constructor(props) {
  
      super(props);
      
      const play = window.playerName;  
      console.log("Player is:" + window.playerName);
	  this.channel = props.channel;
	  this.channel.payload = window.playerName;
	  console.log(this.channel.payload);
	  const imagelist = loadImages();
	  const values = loadValues();
	 
	  this.state = {
		  curr: 10,
		  player1: "",
		  player2: "",
		  images: imagelist,
		  shuf: [],
		  cards: [],
		  deck: [],
		  ids: values,
		  prev: "",
		  deckCount: 0,
		  drawn: 0,
		  turn: 0,
		  discarded: 0,
	  }
	  
	 
	  this.channel.join()
                .receive("ok", this.new_view.bind(this))
                .receive("error",resp => {console.log("Unable to join",resp);}); 
                
      this.channel.on("update", this.new_view.bind(this));
       
          

  }

  new_view(game) {

	console.log(game.game);
	this.setState(game.game,() => this.callMeBack(this));
	 console.log("play1 set to"+this.state.player1);
	  console.log("in view");
	  

  }
  componentDidMount() {
		
	  //const images = loadImages();
	  //console.log(this.state.images);
	  //this.setState({images},()=>this.tryme(this));
	  
  }

  callMeBack(env) {
		
		 console.log(this.state);
	}

  

  changeMe(evt) {
	 
	  
	   var ind = Number(evt.target.id);

	  if(evt.target.alt === "cover") {		  
		  
		  if(this.state.prev == "") {
		  	evt.target.alt = "NS";		  	
		  	this.channel.push("cvOpened", {cards: this.state.cards, pos1: ind, pos2: this.state.shuf[ind] })
			.receive("ok",this.new_view.bind(this));
			
			//
			//this.discard();  
		  }
		  
		  else {
		  
		    evt.target.alt = "NS";	
		  	var newop = this.state.deck[this.state.deckCount];  //
		    this.channel.push("swap", {cards: this.state.cards, pos1: ind, pos2: newop, deck: this.state.deck, deckPos: this.state.deckCount, newDPos: this.state.shuf[ind]})
			.receive("ok",this.new_view.bind(this));
		  				
		  }
		  
		  setTimeout(this.changeTurn.bind(this), 100);  

	  }

	  else if(evt.target.alt != "NS") {
			
 	  	if(this.state.prev != "") {
 	
 	  	
 	  		var newop = this.state.deck[this.state.deckCount];
		    this.channel.push("swap", {cards: this.state.cards, pos1: ind, pos2: newop, deck: this.state.deck, deckPos: this.state.deckCount, newDPos: this.state.cards[ind]})
			.receive("ok",this.new_view.bind(this));
			  		
			setTimeout(this.changeTurn.bind(this), 100);  
	  	}

	  }

		

  }
  

  openCard(evt) {
 
 			if(this.state.drawn!=1) {
		    this.channel.push("openCard", {prev: ""})
			.receive("ok",this.new_view.bind(this));
		 }
  }

  changeTurn(evt) {
  	

	 if(this.state.turn === 0) {
	 	
	 	var P1 = document.getElementById("P1");
	 	P1.disabled = true;
	 	P1.style.opacity = "0.5";
	 	var P2 = document.getElementById("P2");
	 	P2.disabled = false;
	 	P2.style.opacity = "1.0";
	 }
	 
	 else {
	   
	 	var P2 = document.getElementById("P2");
	 	P2.disabled = true;
	 	P2.style.opacity = "0.5";
	 	var P1 = document.getElementById("P1");
	 	P1.disabled = false;
	 	P1.style.opacity = "1.0";
	 }
	 
	 var val1 = this.state.ids[this.state.cards[0]];
	 var val2 = this.state.ids[this.state.cards[1]];
	 var val3 = this.state.ids[this.state.cards[2]];
	 var val4 = this.state.ids[this.state.cards[3]];
	 var val5 = this.state.ids[this.state.cards[4]];
	 var val6 = this.state.ids[this.state.cards[5]];
	 
	 var val7 = this.state.ids[this.state.cards[6]];
	 var val8 = this.state.ids[this.state.cards[7]];
	 var val9 = this.state.ids[this.state.cards[8]];
	 var val10 = this.state.ids[this.state.cards[9]];
	 var val11 = this.state.ids[this.state.cards[10]];
	 var val12 = this.state.ids[this.state.cards[11]];
	 
	 if(val1 == val2 && val1!=-1) 
	 {alert("Col1 Match");
	  $('#C1').addClass('disabledClicks');
	 }
	 
	 if(val3 == val4 && val3!=-1)
	 {alert("Col2 Match");
	 $('#C2').addClass('disabledClicks');
	 }
	 	
	 
	 if(val5 == val6 && val5!=-1)
	 {alert("Col3 Match");
	 $('#C3').addClass('disabledClicks');
	 }
	 
	 if(val7 == val8 && val7!=-1)
	 {alert("Col4 Match");
	 $('#C4').addClass('disabledClicks');
	 }
	 
	 if(val9 == val10 && val9!=-1)
	 {alert("Col5 Match");
	 $('#C5').addClass('disabledClicks');
	 }
	 
	 if(val11 == val12 && val11!=-1)
	 {alert("Col6 Match");
	 $('#C6').addClass('disabledClicks');
	 }
	 
	 
	 
	 
	 if(this.state.drawn == 1) {
	 this.channel.push("resetDrawn", {drawn: this.state.drawn, deckPos: this.state.deckCount})
			.receive("ok",this.new_view.bind(this));}
	
	console.log(this.state.turn);
	 this.channel.push("changeTurn", {cards: this.state.cards, deck: this.state.deck, turn: this.state.turn})
			.receive("ok",this.new_view.bind(this));
	 
			
  }
		

  discard(evt) {
  
  	 if(this.state.drawn == 1) {
  
	 this.channel.push("resetDiscarded", {discarded: this.state.discarded, prev: this.state.prev})
			.receive("ok",this.new_view.bind(this));
	     			
	 setTimeout(this.changeTurn.bind(this), 100);
	 }
  }


  changeDeck(env) {
		
	  if(this.state.drawn == 0) {
	  
	  	this.channel.push("cardDrawn", {deckCount: this.state.deckCount, drawn: this.state.drawn, prev: "empty" })
			.receive("ok",this.new_view.bind(this));
			
	  	var draw = document.getElementById("empty");
	  	draw.src = this.state.images[this.state.deck[this.state.deckCount]];
	  	document.getElementById("discard").disabled = false;
	  }
  }
  
  
  on_chat(env){
	console.log("i m in onchat");
	let chatInput         = document.querySelector("#chat-input")
	let messagesContainer = document.querySelector("#messages")
	console.log(env.target.value);
	chatInput.addEventListener("keypress", event => {
	console.log(chatInput.value)
  		if(event.keyCode === 13) {
    		this.channel.push("new_msg", {body: chatInput.value})
    		chatInput.value = ""
  		}
	});

	this.channel.on("new_msg", payload => {
	console.log(payload)
  	let messageItem = document.createElement("li")
  	messageItem.innerText = `[${Date()}] ${payload.body}`
  	messagesContainer.appendChild(messageItem)
	});


}


 get_Cards(ev) {

	 if(window.playerName == this.state.player1) {
	 var play2 = document.getElementById("P2");
	 play2.disabled = true;
	 }
	 
	 else 
	 if(window.playerName == this.state.player2) {
	 var play1 = document.getElementById("P1");
	 play1.disabled = true;
	 }
	 
	  
	  
    return( 
	    <div>
	    
	    <div className="row">
		<div className="column" >
		<h1>{this.state.player1}</h1>
	    	</div>
		<div className="column">
	    	</div>
	    	<div className="column">
	    	<h1>{this.state.player2}</h1>
	    	</div>
	    </div>

	    <div className="row">
	    	
	    	
		<div className="column" id="PL1">
				<fieldset id="P1">
	    		<div className="row">
 					
 					<fieldset id="C1">
			 		<div className="column">
		  				<img id= "0" src={this.state.images[this.state.cards[0]]} onClick= {this.changeMe.bind(this)} alt="cover" />
		  				<img id= "1" src={this.state.images[this.state.cards[1]]} onClick= {this.changeMe.bind(this)} alt="cover" />
		  			</div>
		  			</fieldset>
		  			
		  			<fieldset id="C2">
		  			<div className="column">
	    	  			<img id= "2" src={this.state.images[this.state.cards[2]]} onClick= {this.changeMe.bind(this)} />
	    	  			<img id= "3" src={this.state.images[this.state.cards[3]]} onClick= {this.changeMe.bind(this)} /> 
	    	  		</div>
	    	  		</fieldset>
	    	  		
	    	  		<fieldset id="C3">
	    	  		<div className="column">
	    	 			<img id= "4" src={this.state.images[this.state.cards[4]]} onClick= {this.changeMe.bind(this)} alt="cover" />
		  				<img id= "5" src={this.state.images[this.state.cards[5]]} onClick= {this.changeMe.bind(this)} alt="cover" />
					</div>
	    		    </fieldset>		
	    		
	    		</div>
	    		</fieldset>
		</div>
		
	    	<div className="column" align="center">
	    		
	    		<fieldset id="deck">
	    		<div className="row">
	   		 	<p>
	    			<img id="deck" src={Cover} onClick={this.changeDeck.bind(this)}/>
	    			<img id="empty" src={this.state.images[this.state.deck[this.state.deckCount]]} alt=""/>
	    		</p>
	    		</div>

	    		< div className="row">
	    		<em>
	    			<button id="discard" onClick={this.discard.bind(this)}>Discard</button>
	    			<button id="open card" onClick={this.openCard.bind(this)}>Open Card</button>
	    		</em>
	    		</div>
	    		</fieldset>	
	    		
	    	</div> 
		

		   	
	    	<div className="column" id="PL2">
	    	<fieldset id="P2">
	    		<div className="row">
	    		
	    			<fieldset id="C4">	
	    			<div className="column" id="c4">
	    				<img id= "6" src={this.state.images[this.state.cards[6]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    				<img id= "7" src={this.state.images[this.state.cards[7]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			</div>
	    			</fieldset>
	    			
	    			<fieldset id="C5">	
	    			<div className="column" id="c5">
	    				<img id= "8" src={this.state.images[this.state.cards[8]]} onClick= {this.changeMe.bind(this)} />
	    				<img id= "9" src={this.state.images[this.state.cards[9]]} onClick= {this.changeMe.bind(this)} />
	    			</div>	
	    			</fieldset>
	    				
	    			<fieldset id="C6">	
	    			<div className="column">
	    				<img id= "10" src={this.state.images[this.state.cards[10]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    				<img id= "11" src={this.state.images[this.state.cards[11]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			</div>
	    			</fieldset>
	    			
	    		</div>
	    	</fieldset>
	    	</div> 
	    	
	    	
    	</div>
    
    	<div className="row">
	    <h1>New Row</h1>
	</div>
		<div id="column">
		<ChatInput on_chat={this.on_chat.bind(this)} />
		</div>
	</div>
    );

}

  render() {
	return (
	<div className="row"> {
	this.get_Cards()
	}
	</div>);
  }
}

  function ChatInput(params) {
  	let {on_chat} = params;
  	return ( <div id="messages">
    			<p><b>Chat Box</b></p>
    			<p><input id ="chat-input" type="text" value="" onChange={on_chat} /></p>
  			</div> );
}


