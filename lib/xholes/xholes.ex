defmodule Xholes.Game do
  def new() do
    IO.puts("i am in new");    
    tag=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
    newtag = slist(tag);
    IO.puts(Enum.at(newtag,2));
	cards = [53,53,Enum.at(newtag,2),Enum.at(newtag,3),53,53,53,53,Enum.at(newtag,8),Enum.at(newtag,9),53,53];
	deck = List.insert_at((Enum.slice(newtag, 12, 41)),0,54);
	
	
        %{
		p1score: 0,
		p2score: 0,
		player1: "",
		player2: "",
		shuf: newtag,
		cards: cards,
		deck: deck,
		drawn: 0,
        deckCount: 0,
		prev: "",
		turn: 0,
		discarded: 0,
        }
  end


  def setPlayer(game, p1) do
  
  	  if game.player1 == "" do
  	  	Map.put(game, :player1, p1)
  	  else 
  	    if game.player2 == "" do
  	  		Map.put(game, :player2, p1)
  	  		
  	  	else
  	  		%{
	  			p1score: game.p1score,
	  			p2score: game.p2score,
	  			player1: game.player1,
	  			player2: game.player2,
	  			shuf: game.shuf,
	  			cards: game.cards,
	  			deck: game.deck,
	  			drawn: game.drawn,
	  			deckCount: game.deckCount, 
	  			prev: game.prev,
	  			turn: game.turn,
	  			discarded: game.discarded,
        }	  		
  	  	end
  	  end
  		
  end
  

  def cardDraw(game, dc, d, p) do
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: 1,
	  deckCount: dc+1,
	  prev: p,
	  turn: game.turn,
	  discarded: 0,
	}
  
  end 
  
  
   def cvOpen(game, cards1, post1, post2 ) do
   
   IO.puts(post2);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: List.replace_at(cards1,post1,post2),
	  deck: game.deck,
	  drawn: game.drawn,
	  deckCount: game.deckCount,
	  prev: game.prev,
	  turn: game.turn,
	  discarded: game.discarded,
	}
  
  end 
  
  def swap(game, cards1, post1, post2, deck1, dp1, dp2 ) do
   
   IO.puts(post2);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: List.replace_at(cards1,post1,post2),
	  deck: List.replace_at(deck1,dp1,dp2),
	  drawn: game.drawn,
	  deckCount: dp1,
	  prev: game.prev,
	  turn: game.turn,
	  discarded: game.discarded,
	}
  
  end
  
  def chnTurn(game, cards1, deck1, turn1 ) do
   
   IO.puts(turn1);
   turn2 = rem(turn1+1,2);
   IO.puts(turn2);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: cards1,
	  deck: deck1,
	  drawn: game.drawn,
	  deckCount: game.deckCount,
	  prev: game.prev,
	  turn: turn2,
	  discarded: game.discarded,
	}
  
  end  
  
   
  def resetDrawn(game, drawn11, dc) do
   
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: 0,
	  deckCount: game.deckCount,
	  prev: game.prev,
	  turn: game.turn,
	  discarded: game.discarded,
	}
  
  end  
  
  def resetDiscarded(game, discarded1, prev1) do
  	  
  	
  	if discarded1 == 1 do
  	
  	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: 0,
	  deckCount: game.deckCount,
	  prev: "",
	  turn: game.turn,
	  discarded: rem(discarded1+1,2),
	}
	
	else 
	
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: 0,
	  deckCount: game.deckCount,
	  prev: prev1,
	  turn: game.turn,
	  discarded: rem(discarded1+1,2),
	}
  	   
  	end   
   
	
  
  end  
  
  
  def openCard(game, prev1) do
   
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: game.drawn,
	  deckCount: game.deckCount,
	  prev: prev1,
	  turn: game.turn,
	  discarded: game.discarded,
	}
  
  end  

  def client_view(game) do
        %{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  player1: game.player1,
	  player2: game.player2,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: game.drawn,
	  deckCount: game.deckCount, 
	  prev: game.prev,
	  turn: game.turn,
	  discarded: game.discarded,
        }
 end


 def slist(tag) do
	Enum.shuffle(tag);
end
end
