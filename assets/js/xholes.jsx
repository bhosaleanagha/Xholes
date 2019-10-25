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
      console.log("Player is: asd" + window.playerName);
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
		  p1count: 0,
		  p2count: 0,
		  p1score: 0,
		  p2score: 0,
		  lastMove: 0,
		  round: 1,
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
	  
	  var play1 = document.getElementById("P1");
	  var play2 = document.getElementById("P2");
	  console.log("P1->" + play1.disabled);
	  console.log("P2->" + play2.disabled);
	  
	  if(this.state.turn == 0)
	  {
	  		console.log(this.state.turn);
	  		play2.disabled = false;
	  		console.log("P1->" + play1.disabled);
	  }
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
	   var p1_score = 0;
	   var p2_score = 0;

	  if(evt.target.alt === "cover") {		  
		  
		  if(this.state.prev == "") {
		  	evt.target.alt = "NS";		  	
		  	this.channel.push("cvOpened", {cards: this.state.cards, pos1: ind, pos2: this.state.shuf[ind] })
			.receive("ok",this.new_view.bind(this));
			
			
			
			var currVal = this.state.ids[this.state.shuf[ind]];
			
			if(ind%2 == 0) {
				
					
					if(currVal == this.state.ids[this.state.cards[ind+1]]) {
						currVal = currVal*-1;	
						
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
								
			}//even end
			
			else 	{
			
					if(currVal == this.state.ids[this.state.cards[ind-1]]) {
						currVal = currVal*-1;	
						
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
			
				}//odd-end	
			
			
			  
		  } //cover-open
		  
		  
		  
		  else {
		  
		    evt.target.alt = "NS";	
		  	var newop = this.state.deck[this.state.deckCount];  
		    this.channel.push("swap", {cards: this.state.cards, pos1: ind, pos2: newop, deck: this.state.deck, deckPos: this.state.deckCount, newDPos: this.state.shuf[ind]})
			.receive("ok",this.new_view.bind(this));
			
				
			var currVal = this.state.ids[this.state.deck[this.state.deckCount]];
			
			if(ind%2 == 0) {
				
					
					if(currVal == this.state.ids[this.state.cards[ind+1]]) {
						currVal = currVal*-1;	
						
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
								
			}
			
			else 	{
			
					if(currVal == this.state.ids[this.state.cards[ind-1]]) {
						currVal = currVal*-1;	
						
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
			
			}
				
		  				
		  } //cover swap
		  
		  
		  
		  
		  setTimeout(this.changeTurn.bind(this), 100);  

	  }

	  else if(evt.target.alt != "NS") {
			
 	  	if(this.state.prev != "") {
 	
 	  	
 	  		var newop = this.state.deck[this.state.deckCount];
		    this.channel.push("swap", {cards: this.state.cards, pos1: ind, pos2: newop, deck: this.state.deck, deckPos: this.state.deckCount, newDPos: this.state.cards[ind]})
			.receive("ok",this.new_view.bind(this));
			
			var currVal = this.state.ids[this.state.deck[this.state.deckCount]];
			var thisVal = this.state.ids[this.state.cards[ind]];
			
						
			if(ind%2 == 0) {
				
					
					if(currVal == this.state.ids[this.state.cards[ind+1]]) {	
						
						var newScore = (currVal + this.state.ids[this.state.cards[ind]])*-1;
						 
						//currVal = currVal - thisVal;
						
						if(ind < 6) {	
						
								this.channel.push("updateScore", {p1score: newScore, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: newScore})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						currVal = currVal - thisVal;
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
								
			}
			
			else 	{
			
					if(currVal == this.state.ids[this.state.cards[ind-1]]) {
						var newScore = (currVal + this.state.ids[this.state.cards[ind]])*-1;	
						console.log("In odd when match");
						console.log(currVal + " " + this.state.cards[ind]);
						console.log(newScore);
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: newScore, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: newScore})
		  							.receive("ok",this.new_view.bind(this));
						}
					}
					
					else {
					
						currVal = currVal - thisVal;
					
						if(ind < 6) {
								this.channel.push("updateScore", {p1score: currVal, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
						}
						
						else {
								this.channel.push("updateScore", {p1score: 0, p2score: currVal})
		  							.receive("ok",this.new_view.bind(this));
						}
					
					}
			
			}
			
			
			
			  		
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
	 {
	 	if(!document.getElementById("C1").disabled) {
	  	//$('#C1').addClass('disabledClicks');
	  	var c1 = document.getElementById("C1");
	  	C1.disabled = true;
	  	C1.style.opacity = "0.7";
	 
	 	}	
	 }
	 
	 if(val3 == val4 && val3!=-1)
	 {
	 //$('#C2').addClass('disabledClicks');
	 	var c2 = document.getElementById("C2");
	  	C2.disabled = true;
	  	C2.style.opacity = "0.7";
	 
	 document.getElementById("2").alt="NS";
	 document.getElementById("3").alt="NS";
	 }
	 	
	 
	 if(val5 == val6 && val5!=-1)
	 {
	 	if(!document.getElementById("C3").disabled) {
	 		var c3 = document.getElementById("C3");
	  		C3.disabled = true;
	  		C3.style.opacity = "0.7";
	 	
	 	//$('#C3').addClass('disabledClicks');
	 	
	 	}	
	 }
	 
	 if(val7 == val8 && val7!=-1)
	 {
	 console.log(document.getElementById("C4").disabled);
	 if(!document.getElementById("C4").disabled) {
	  
	 	var c4 = document.getElementById("C4");
	  	C4.disabled = true;
	  	C4.style.opacity = "0.7";
	  //$('#C4').addClass('disabledClicks');
	  
		
	 }
	 }
	 
	 if(val9 == val10 && val9!=-1) {
	 
	 //$('#C5').addClass('disabledClicks');
	 	 	var c5 = document.getElementById("C5");
	  		C5.disabled = true;
	  		C5.style.opacity = "0.7";

	 
	 document.getElementById("8").alt="NS";
	 document.getElementById("9").alt="NS";
	 }
	 
	 if(val11 == val12 && val11!=-1) {
	 	
	 	//console.log(document.getElementById("C6").disabled);
	 	if(!document.getElementById("C6").disabled) {
	 		 	var c6 = document.getElementById("C6");
	  			C6.disabled = true;
	  			C6.style.opacity = "0.7";

	 	//$('#C6').addClass('disabledClicks');
	 	
	 	}	
	
	 }
	 
	 if(this.state.lastMove == 0 ) {
	 if(this.state.turn == 0) {
	 	
	 	var card0 = document.getElementById("0");
	 	var card1 = document.getElementById("1");
	 	var card4 = document.getElementById("4");
	 	var card5 = document.getElementById("5");
	 	
	 	if(card0.alt == "NS" && card1.alt == "NS" 
	 	&& card4.alt == "NS"  && card5.alt == "NS") {
	 		//alert("Last Move for Player2");
	 		//$('#P1').addClass('disabledClicks');
	 		var p1 = document.getElementById("P1");
	 		p1.disabled = true;
	 		
	 		
	 		this.channel.push("lastMove", {lastMove: 1})
			.receive("ok",this.new_view.bind(this));
	 		
	 		//set lastMove
	 	}
	 
	 }
	 
	 else {
	 
	 	var card6 = document.getElementById("6");
	 	var card7 = document.getElementById("7");
	 	var card10 = document.getElementById("10");
	 	var card11 = document.getElementById("11");
	 	
	 	if(card6.alt == "NS" && card7.alt == "NS" 
	 	&& card10.alt == "NS"  && card11.alt == "NS") {
	 		//alert("Last Move for Player1");
	 		//$('#P2').addClass('disabledClicks');
	 		var p1 = document.getElementById("P1");
	 		p1.disabled = true;
	 		this.channel.push("lastMove", {lastMove: 1})
			.receive("ok",this.new_view.bind(this));
	 	}
	 
	 }
	 
	 }
	 
	 if(this.state.lastMove == 1) {
	 
	 	if(this.state.turn == 0) {
	 		
	 		var card0 = document.getElementById("0");
	 		var card1 = document.getElementById("1");
	 		var card4 = document.getElementById("4");
	 		var card5 = document.getElementById("5");
	 		var p1s = 0;
	 		
	 		if(card0.alt != "NS") {
	 				card0.src = this.state.images[this.state.shuf[0]];
	 				card0.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 0, pos2: this.state.shuf[0] })
						.receive("ok",this.new_view.bind(this));
	 				p1s = p1s + this.state.ids[this.state.shuf[0]];
	 		}
	 		
	 		if(card1.alt != "NS") {
	 				card1.src = this.state.images[this.state.shuf[1]];
	 				card1.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 1, pos2: this.state.shuf[1] })
						.receive("ok",this.new_view.bind(this));
	 				p1s = p1s + this.state.ids[this.state.shuf[1]];
	 		}
	 		
	 		if(card4.alt != "NS") {
	 				card4.src = this.state.images[this.state.shuf[4]];
	 				card4.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 4, pos2: this.state.shuf[4] })
						.receive("ok",this.new_view.bind(this));
	 				p1s = p1s + this.state.ids[this.state.shuf[4]];
	 		}
	 		
	 		if(card5.alt != "NS") {
	 				card5.src = this.state.images[this.state.shuf[5]];
	 				card5.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 5, pos2: this.state.shuf[5] })
			.receive("ok",this.new_view.bind(this));
	 				p1s = p1s + this.state.ids[this.state.shuf[5]];
	 		}
	 		
	 		//$('#P1').addClass('disabledClicks');
	 		var p1 = document.getElementById("P1");
	 		p1.disabled = true;
	 		
	 		
	 		console.log("Final Score : " + p1s);
	 		
	 		this.channel.push("updateScore", {p1score: p1s, p2score: 0})
		  							.receive("ok",this.new_view.bind(this));
		  							
		  							
		  	
	 		
	 		this.channel.push("nextRound", {round: this.state.round})
	 			.receive("ok",this.new_view.bind(this));
	 	}
	 	
	 	else {
	 		
	 		var card6 = document.getElementById("6");
	 		var card7 = document.getElementById("7");
	 		var card10 = document.getElementById("10");
	 		var card11 = document.getElementById("11");
	 		var p2s = 0;
	 		
	 		if(card6.alt != "NS") {
	 				card6.src = this.state.images[this.state.shuf[6]];
	 				card6.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 6, pos2: this.state.shuf[6] })
						.receive("ok",this.new_view.bind(this));
	 				p2s = p2s + this.state.ids[this.state.shuf[6]];
	 		}
	 		
	 		if(card7.alt != "NS") {
	 				card7.src = this.state.images[this.state.shuf[7]];
	 				card7.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 7, pos2: this.state.shuf[7] })
						.receive("ok",this.new_view.bind(this));
	 				p2s = p2s + this.state.ids[this.state.shuf[7]];
	 		}
	 		
	 		if(card10.alt != "NS") {
	 				card10.src = this.state.images[this.state.shuf[10]];
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 10, pos2: this.state.shuf[10] })
						.receive("ok",this.new_view.bind(this));
					card10.alt= "NS";
	 				p2s = p2s + this.state.ids[this.state.shuf[10]];
	 		}
	 		
	 		if(card11.alt != "NS") {
	 				card11.src = this.state.images[this.state.shuf[11]];
	 				card11.alt= "NS";
	 				this.channel.push("openAll", {cards: this.state.cards, pos1: 11, pos2: this.state.shuf[11] })
						.receive("ok",this.new_view.bind(this));
	 				p2s = p2s + this.state.ids[this.state.shuf[11]];
	 		}
	 		
	 		console.log("Final Score : " + p2s);
	 		
	 		
	 		this.channel.push("updateScore", {p1score: 0, p2score: p2s})
		  		.receive("ok",this.new_view.bind(this));
		  		
		  		
		  		
		  		
			setTimeout(this.callMeBack.bind(this), 50);
			
			
		
				 		
				 		
			this.readyForNext();
				 		
	 		this.channel.push("nextRound", {round: this.state.round})
	 			.receive("ok",this.new_view.bind(this),()=> setTimeout(this.callMeBack.bind(this), 100));
	 			
	 			//location.reload();
	 			
	 	}
	 	
	
	 	return;
	 }
	 	
	 	
	 if(this.state.drawn == 1) {
	 this.channel.push("resetDrawn", {drawn: this.state.drawn, deckPos: this.state.deckCount})
			.receive("ok",this.new_view.bind(this));}
	
	console.log(this.state.turn);
	 this.channel.push("changeTurn", {cards: this.state.cards, deck: this.state.deck, turn: this.state.turn})
			.receive("ok",this.new_view.bind(this));
	 
			
  }
  
  readyForNext() {
  		
  		alert("Will start a new round");
  		var play1 = document.getElementById("P1");
  		alert(play1);
  		
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
	  
	  	this.channel.push("cardDrawn", {deck: this.state.deck, deckCount: this.state.deckCount, drawn: this.state.drawn, prev: "empty"})
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
  		if(event.keyCode === 13) {
  		let text = playerName+" : "+chatInput.value
    		this.channel.push("new_msg", {body: text})
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
 
 
 
	 var play1 = document.getElementById("P1");
	 var play2 = document.getElementById("P2");
	 var deck1 = document.getElementById("deck");
	 
	 if(this.state.round > 1) {
	 	
	 	
	 	console.log("new round "+document.getElementById("P1"));
	 	console.log(play1.disabled);
	 	console.log(play2.disabled);
	 	if(play1.disabled) {
	 		console.log("Turn is " + this.state.turn);
	 		play1.disabled = false;
	 		console.log(play1.disabled);
	 		play2.disabled = false;
	 		console.log(play1.disabled);
	 	}
	 	  
	 	
	 } 
	 
	 
	 if(window.playerName == this.state.player1) {
	 		console.log("You're Player1");
		
	 	play2.disabled = true;
	 
	 	if(this.state.turn==1) {
	 		deck1.disabled = true;
	 		 play1.disabled = true;
	 		 play1.style.opacity = "0.5";
	 		 deck1.style.opacity = "0.5";
	 	}
	 	
	 	else {
	 		 deck1.disabled = false;
	 		 play1.disabled = false;
	 		 play1.style.opacity = "1.0";
	 		 deck1.style.opacity = "1.0";
	 	}
	 
	 }
	 
	 
	 if(window.playerName == this.state.player2) {
	 
	    console.log("You're Player2");
	 	play1.disabled = true;
	 		
	 	
	 	if(this.state.turn== 0) {
	 		 deck1.disabled = true;
	 		 deck1.style.opacity = "0.5";
	 		 play2.disabled = true;
	 		 play2.style.opacity = "0.5";
	 	}
	 	
	 	else {
	 	console.log("enabling p2");
	 		 deck1.disabled = false;
	 		 play2.disabled = false;
	 		 play2.style.opacity = "1.0";
	 		 deck1.style.opacity = "1.0";
	 	}
	 }
	 
	 var now = window.playerName; 
	 console.log("now: asd");
	 
	 if(window.playerName !== this.state.player1)  {
	 	if(window.playerName !== this.state.player2) {
	 			console.log("Ydddddd");
	 			if(play2!=null)
	 			{play2.disabled = true;}
	 			if(play1!=null)
	 			{play1.disabled = true;}
	 		}
	 		
	 	
	 }
	 if(play1!=null)
	 console.log("P1->" + play1.disabled);
	 if(play2!=null)
	 console.log("P2->" + play2.disabled);
	 
	 
	  
	  
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
		  				<img id= "0" src={this.state.images[this.state.cards[0]]} onClick = {this.changeMe.bind(this)} alt="cover" />
		  				<img id= "1" src={this.state.images[this.state.cards[1]]} onClick = {this.changeMe.bind(this)} alt="cover" />
		  			</div>
		  			</fieldset>
		  			
		  			<fieldset id="C2">
		  			<div className="column">
	    	  			<img id= "2" src={this.state.images[this.state.cards[2]]} onClick = {this.changeMe.bind(this)} />
	    	  			<img id= "3" src={this.state.images[this.state.cards[3]]} onClick = {this.changeMe.bind(this)} /> 
	    	  		</div>
	    	  		</fieldset>
	    	  		
	    	  		<fieldset id="C3">
	    	  		<div className="column">
	    	 			<img id= "4" src={this.state.images[this.state.cards[4]]} onClick = {this.changeMe.bind(this)} alt="cover" />
		  				<img id= "5" src={this.state.images[this.state.cards[5]]} onClick = {this.changeMe.bind(this)} alt="cover" />
					</div>
	    		    </fieldset>		
	    		
	    		</div>
	    		</fieldset>
	    		<p>P1 Score :{this.state.p1score}</p>
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
	    				<img id= "6" src={this.state.images[this.state.cards[6]]} onClick = {this.changeMe.bind(this)} alt="cover"/>
	    				<img id= "7" src={this.state.images[this.state.cards[7]]} onClick = {this.changeMe.bind(this)} alt="cover"/>
	    			</div>
	    			</fieldset>
	    			
	    			<fieldset id="C5">	
	    			<div className="column" id="c5">
	    				<img id= "8" src={this.state.images[this.state.cards[8]]} onClick = {this.changeMe.bind(this)} />
	    				<img id= "9" src={this.state.images[this.state.cards[9]]} onClick = {this.changeMe.bind(this)} />
	    			</div>	
	    			</fieldset>
	    				
	    			<fieldset id="C6">	
	    			<div className="column">
	    				<img id= "10" src={this.state.images[this.state.cards[10]]} onClick = {this.changeMe.bind(this)} alt="cover"/>
	    				<img id= "11" src={this.state.images[this.state.cards[11]]} onClick = {this.changeMe.bind(this)} alt="cover"/>
	    			</div>
	    			</fieldset>
	    			
	    		</div>
	    	</fieldset>
	    	<p>P2 Score :{this.state.p2score}</p>
	    	</div> 
	    	
	    	
    	</div>
    	<div className="row">
	    <h1>New Row</h1>
	</div>
		<div id="messages">
		<input id = "chat-input" type="text" />
		<button>Send</button>
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

  


