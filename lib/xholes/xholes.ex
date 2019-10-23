defmodule Xholes.Game do

  def new do

        tag=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]

        newtag = slist(tag);

        IO.puts(Enum.at(newtag,2));

	cards = [53,53,Enum.at(newtag,2),Enum.at(newtag,3),53,53,53,53,Enum.at(newtag,8),Enum.at(newtag,9),53,53];

	deck = List.insert_at((Enum.slice(newtag, 12, 41)),0,54);

        %{
		p1score: 0,
		p2score: 0,
		shuf: newtag,
		cards: cards,
		deck: deck,
		drawn: 0,
        deckCount: 0,
		prev: "",
		turn: 0
        }

  end


  def cardDraw(game, dc, d, p) do
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: 1,
	  deckCount: dc+1,
	  prev: p,
	  turn: game.turn
	}
  end 


   def cvOpen(game, cards1, post1, post2 ) do
   IO.puts(post2);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  shuf: game.shuf,
	  cards: List.replace_at(cards1,post1,post2),
	  deck: game.deck,
	  drawn: game.drawn,
	  deckCount: game.deckCount,
	  prev: game.prev,
	  turn: game.turn
	}

end 

  def swap(game, cards1, post1, post2, deck1, dp1, dp2 ) do
   IO.puts(post2);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  shuf: game.shuf,
	  cards: List.replace_at(cards1,post1,post2),
	  deck: List.replace_at(deck1,dp1,dp2),
	  drawn: game.drawn,
	  deckCount: dp1,
	  prev: game.prev,
	  turn: game.turn
	}

  end

  def chnTurn(game, cards1, deck1, turn1 ) do
   IO.puts(turn1);
	%{
	  p1score: game.p1score,
	  p2score: game.p2score,
	  shuf: game.shuf,
	  cards: cards1,
	  deck: deck1,
	  drawn: game.drawn,
	  deckCount: game.deckCount,
	  prev: game.prev,
	  turn: rem(turn1+1,2)
	}

  end  

  def client_view(game) do
        %{
	  p1score: game.p1score,
	  p2score: game.p1score,
	  shuf: game.shuf,
	  cards: game.cards,
	  deck: game.deck,
	  drawn: game.drawn,
	  deckCount: game.deckCount, 
	  prev: game.prev,
	  turn: game.turn
        }

 end



 def slist(tag) do
	Enum.shuffle(tag);
end

end
