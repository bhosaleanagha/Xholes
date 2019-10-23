import React from 'react';
import ReactDOM from 'react-dom';
import Card from './KH.png';
import Car from './car.jpg';
import Cover from './CV2.png';
import Empty from './MT.png';
import loadImages from './images';
import loadValues from './images';
import $ from 'jquery';



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
		  curr: 10,
		  ready: 0,
		  player1: "ruchit",
		  player2: "anagha",
		  images: imagelist,
		  shuf: [],
		  cards: [],
		  deck: [],
		  ids: values,
		  prev: "",
		  deckCount: 0,
		  drawn: 0,
		  turn: 0,
		  chat: ""
	  }
	this.channel.join()
                .receive("ok", this.new_view.bind(this))
                .receive("error",resp => {console.log("Unable to join",resp);}); 
                console.log("check");

  }

  new_view(game){

	console.log(game.game);
	  
	//this.setState({cards: game.game.cards},{deckCount: game.game.deckCount}, {drawn: game.game.drawn}, ()=> this.tryme(game));
	this.setState(game.game,() => this.tryme(this));
	  //var newGame = {game};
	//console.log("this is the state"+this.state);
	//for (let [key, value] of Object.entries(game)) {
  	//console.log(`${key}: ${value}`);
	//}
	  console.log(this.state);
	  //console.log(this.state.turn);
	  console.log("in view");

  }
  componentDidMount() {
		
	  //const images = loadImages();
	  //console.log(this.state.images);
	  //this.setState({images},()=>this.tryme(this));
	  
  }

tryme(env)
	{
	
	//this.setState(this.state.cards);
	console.log("DeckCount: " + this.state.deckCount);
	}

  

  changeMe(evt) {
	 
	  console.log(evt.target.alt);

	  if(evt.target.alt === "cover") {
		  
		  var ind = Number(evt.target.id);
		  
		  if(this.state.prev == "") {
		  	alert("Its a cover");
		  	console.log(evt.target.id);
		  	evt.target.alt = "NS";
		  	//evt.target.src = this.state.images[this.state.shuf[ind]];
		  	
		  	
		  	this.channel.push("cvOpened", {cards: this.state.cards, pos1: ind, pos2: this.state.shuf[ind] })
			.receive("ok",this.new_view.bind(this));
			
			//
			//this.discard();  
		  }
		  
		  else {
		  	var newop = this.state.deck[this.state.deckCount];  //
		    this.channel.push("swap", {cards: this.state.cards, pos1: ind, pos2: newop, deck: this.state.deck, deckPos: this.state.deckCount, newDPos: this.state.shuf[ind]})
			.receive("ok",this.new_view.bind(this));
		  	
		  	//var temp = this.state.images[this.state.shuf[ind]];
		  	//var old = document.getElementById(this.state.prev);
		  	//evt.target.src = old.src;
			//old.src = temp;	
			//evt.target.alt = "NS";
			
			
		  }

	  }

	  else if(evt.target.alt != "NS") {
			
 	  	if(this.state.prev != "") {
			  
			  var temp = evt.target.src;
		  	  var old = document.getElementById(this.state.prev);
			  //old.src = {temp};
			  evt.target.src = old.src;
			  old.src = temp;			

	  	}

	  }

	  //var disButton = document.getElementById("discard");
	  //disButton.disabled = false;
	  //this.discard(this);

  }

 openCard(evt) {
	  var disButton = document.getElementById("discard");
	  disButton.disabled = true;
		 
 }

 discard(evt) {
	
	 //var play = document.getElementById("P2");
	 //play.disabled = true;
	 console.log("disabling P1/P2");
	 if(this.state.turn === 0) {
	 console.log("disabling P1");
	 			var P1 = document.getElementById("PL1");
	 			P1.disabled = true;
	 			P1.style.opacity = "0.5";
	 			var P2 = document.getElementById("PL2");
	 			P2.disabled = false;
	 			P2.style.opacity = "1.0";
	 //$("#P1").addClass("disabledClicks");
	 //$("#P2").addClass("enableClicks");
	 
	 }
	 
	 else {
	 var P2 = document.getElementById("PL2");
	 P2.disabled = true;
	 P2.style.opacity = "0.5";
	 var P1 = document.getElementById("PL1");
	 P1.disabled = false;
	 P1.style.opacity = "1.0";
	 }
	
	 console.log(this.state.turn);
	 this.channel.push("changeTurn", {cards: this.state.cards, deck: this.state.deck, turn: this.state.turn })
			.receive("ok",this.new_view.bind(this));

		
	 //var discarded = document.getElementById("empty");
	 //discarded.src = document.getElementById("deck").src;
	 //var deckCard = document.getElementById("deck");
	// deckCard.src = Cover;
	
	


  }


  changeDeck(env) {
		
	  if(this.state.drawn == 0) {
	  
	  	this.channel.push("cardDrawn", {deckCount: this.state.deckCount, drawn: this.state.drawn, prev: "empty" })
			.receive("ok",this.new_view.bind(this));
			
	  	var draw = document.getElementById("empty");
	  	draw.src = this.state.images[this.state.deck[this.state.deckCount]];
	  
	  }
  }
  
on_chat(env){
console.log("i m in onchat");
let chatInput         = document.querySelector("#chat-input")
let messagesContainer = document.querySelector("#messages")
console.log(env.target.value);
chatInput.addEventListener("keypress", event => {
console.log(chatInput.value)
  if(event.keyCode === 13){
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


 try_me(ev) {

	  let pos2 = this.state.cards[2];
	  console.log("Try_me:"+ pos2);
	  
	
	  
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
	    	
	    	
		<div className="column" id="PL1">
				<fieldset id="P1">
	    		<div className="row">
 			
			 
		  			<img id= "0" src={this.state.images[this.state.cards[0]]} onClick= {this.changeMe.bind(this)} alt="cover" />
	    	  		<img id= "2" src={this.state.images[this.state.cards[2]]} onClick= {this.changeMe.bind(this)} /> 
	    	 		<img id= "4" src={this.state.images[this.state.cards[4]]} onClick= {this.changeMe.bind(this)} alt="cover" />
		  
			
	    		</div>

	    		<div className="row">
			
	    			<img id="1" src={this.state.images[this.state.cards[1]]} onClick= {this.changeMe.bind(this)} alt="cover" />
	    			<img id="3" src={this.state.images[this.state.cards[3]]} onClick= {this.changeMe.bind(this)} />
	    			<img id="5" src={this.state.images[this.state.cards[5]]} onClick= {this.changeMe.bind(this)} alt="cover" />
	    		
	    		</div>
	    		</fieldset>
		</div>
		
	    	<div className="column" align="center">
	    	
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
	    			
	    		
	    	</div> 
		

		   	
	    	<div className="column" id="PL2">
	    	<fieldset id="P2">
	    		<div className="row">
	    		
	    			<img id="6" src={this.state.images[this.state.cards[6]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			<img id="8" src={this.state.images[this.state.cards[8]]} onClick= {this.changeMe.bind(this)} />
	    			<img id="10" src={this.state.images[this.state.cards[10]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    		
	    		</div>

	    		<div className="row">
	    			<img id="7" src={this.state.images[this.state.cards[7]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
	    			<img id="9" src={this.state.images[this.state.cards[9]]} onClick= {this.changeMe.bind(this)} />
	    			<img id="11" src={this.state.images[this.state.cards[11]]} onClick= {this.changeMe.bind(this)} alt="cover"/>
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
	return <div className="row">
	{this.try_me()}
	</div>
  }
}

function ChatInput(params) {
  let {on_chat} = params;
  return (<div id="messages">
    <p><b>Chat Box</b></p>
    <p><input id ="chat-input" type="text" value="" onChange={on_chat} /></p>
  </div>);
}

