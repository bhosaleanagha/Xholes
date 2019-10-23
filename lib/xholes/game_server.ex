defmodule Xholes.GameServer do
  use GenServer

  def reg(name) do
    {:via, Registry, {Xholes.GameReg, name}}
  end

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker,
    }
    Xholes.GameSup.start_child(spec)
  end

  def start_link(name)do
	IO.puts("in start");
    game = Xholes.BackupAgent.get(name) || Xholes.Game.new()
    GenServer.start_link(__MODULE__, game, name: reg(name))
  end

  def cardDrawn(name, dc , d , p) do
    GenServer.call(reg(name), {:cardDrawn, name, dc, d, p})
  end
  
  def cvOpen(name, cards1, post1, post2) do
    GenServer.call(reg(name), {:cvOpen, name, cards1, post1, post2})
  end

	def swap(name, cards1, post1, post2, deck1, dp1, dp2) do
    GenServer.call(reg(name), {:swap, name, cards1, post1, post2, deck1, dp1, dp2})
  end
  
  def chnTurn(name, cards1, deck1, turn1) do
    GenServer.call(reg(name), {:chnTurn, name, cards1, deck1, turn1})
  end

  def peek(name) do
    GenServer.call(reg(name), {:peek, name})
  end

  def init(game) do
    {:ok, game}
  end

def handle_call({:cardDrawn, name, dc, d, p}, _from, game) do
    game = Xholes.Game.cardDraw(game, dc, d, p)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:cvOpen, name, cards1, post1, post2}, _from, game) do
    game = Xholes.Game.cvOpen(game, cards1, post1 ,post2)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end

def handle_call({:swap, name,cards1, post1, post2, deck1, dp1, dp2}, _from, game) do
    game = Xholes.Game.swap(game ,cards1 , post1, post2, deck1, dp1, dp2)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:chnTurn, name, cards1, deck1, turn1 }, _from, game) do
    game = Xholes.Game.chnTurn(game ,cards1 ,cards1, deck1, turn1 )
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:peek, _name}, _from, game) do
    {:reply, game, game}
  end
end
