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
	game = GameServer.peek(name)
	BackupAgent.put(name,game)
	socket = socket
        |>assign(:name,name)
	{:ok, %{"join" => name, "game" => Game.client_view(game)},socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end

def handle_in("cardDrawn", %{"deckCount" => dc, "drawn" => d, "prev" => p}, socket) do
    name = socket.assigns[:name]	
    game = GameServer.cardDrawn(name,dc,d,p)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
  #  game = Game.cardDraw(socket.assigns[:game], dc, d, p)
  #  socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
   def handle_in("cvOpened", %{"cards" => cards1, "pos1" => post1, "pos2" => post2}, socket) do
   name = socket.assigns[:name]
    game = GameServer.cvOpen(name, cards1, post1, post2)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    #socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
  def handle_in("swap", %{"cards" => cards1, "pos1" => post1, "pos2" => post2, "deck" => deck1, "deckPos" => dp1, "newDPos" => dp2}, socket) do
  	name = socket.assigns[:name]
    game = GameServer.swap(name, cards1, post1, post2, deck1, dp1, dp2)
    broadcast!(socket,"update",%{"game" => Game.client_view(game)})
    #socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game) }}, socket}

  end
  
  def handle_in("changeTurn", %{"cards" => cards1, "deck" => deck1, "turn" => turn1}, socket) do
  name = socket.assigns[:name]
    game = GameServer.chnTurn(name, cards1, deck1, turn1)
    socket = assign(socket, :game, game)
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
