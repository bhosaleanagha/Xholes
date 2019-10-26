defmodule XholesWeb.GameChannel do
  use XholesWeb, :channel

	alias Xholes.Game
	alias Xholes.BackupAgent
	alias Xholes.GameServer
  def join("game:" <> name , payload, socket) do
	IO.puts(name);
	p1 = payload;
	IO.puts(p1);
    if authorized?(payload) do
	GameServer.start(name)
	game = GameServer.setPlayer(name, p1)
	BackupAgent.put(name,game)
	socket = socket
        |>assign(:name,name)
	{:ok, %{"join" => name, "game" => Game.client_view(game)},socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("xyz", %{"game" => game}, socket) do
    broadcast!(socket, "update", %{game: game})
    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
 name = socket.assigns[:name]	
    GameServer.chat(name)
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end

def handle_in("cardDrawn", %{"deck" => d1, "deckCount" => dc, "drawn" => d, "prev" => p}, socket) do
    name = socket.assigns[:name]	
    game = GameServer.cardDrawn(name,d1,dc,d,p)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
   def handle_in("cvOpened", %{"cards" => cards1, "pos1" => post1, "pos2" => post2}, socket) do
   name = socket.assigns[:name]
    game = GameServer.cvOpen(name, cards1, post1, post2)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
  def handle_in("swap", %{"cards" => cards1, "pos1" => post1, "pos2" => post2, "deck" => deck1, "deckPos" => dp1, "newDPos" => dp2}, socket) do
  	name = socket.assigns[:name]
    game = GameServer.swap(name, cards1, post1, post2, deck1, dp1, dp2)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
  def handle_in("changeTurn", %{"cards" => cards1, "deck" => deck1, "turn" => turn1}, socket) do
  name = socket.assigns[:name]
    game = GameServer.chnTurn(name, cards1, deck1, turn1)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
 
  def handle_in("openCard", %{"prev" => prev1}, socket) do
    name = socket.assigns[:name]
    game = GameServer.openCard(name, prev1)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("resetDiscarded", %{"discarded"=> discarded1, "prev" => prev1}, socket) do
    name = socket.assigns[:name]
    game = GameServer.resetDiscarded(name,discarded1,prev1)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("resetDrawn", %{"drawn"=> drawn1, "deckPos" => dc}, socket) do
  	name = socket.assigns[:name]
    game = GameServer.resetDrawn(name, drawn1, dc)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
  def handle_in("updateScore", %{"p1score" => p1_score, "p2score" => p2_score}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.updateScore(name, p1_score,p2_score)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
   def handle_in("lastMove", %{"lastMove" => lm,}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.lastMove(name, lm)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("openAll", %{"cards" => cards1, "pos1" => p1, "pos2" => p2}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.openAll(name, cards1, p1, p2)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("nextRound", %{"round" => round1}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.nextRound(name, round1)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("winner", %{"winner" => winner1}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.winner(name, winner1)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  def handle_in("rejoin", %{"player" => player}, socket) do
 	name = socket.assigns[:name]	
    game = GameServer.rejoin(name, player)
    socket = assign(socket, :game, game)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}
  end
  
  
  
  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
