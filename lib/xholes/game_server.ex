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
	IO.puts("in start link");
    game = Xholes.BackupAgent.get(name) || Xholes.Game.new()
    GenServer.start_link(__MODULE__, game, name: reg(name))
  end
  
  def setPlayer(name, p1) do
    GenServer.call(reg(name), {:setPlayer, name, p1})
  end

  def cardDrawn(name, d1, dc , d , p) do
    GenServer.call(reg(name), {:cardDrawn, name, d1, dc, d, p})
  end
  
  def chat(name) do
    GenServer.call(reg(name), {:chat, name})
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
  
  def openCard(name, prev1) do
    GenServer.call(reg(name), {:openCard,name, prev1})
  end
  
  def resetDrawn(name, drawn1, dc) do
    GenServer.call(reg(name), {:resetDrawn, name, drawn1, dc})
  end
  
  def resetDiscarded(name, discarded1 , prev1) do
    GenServer.call(reg(name), {:resetDiscarded, name, discarded1, prev1})
  end
  
  def updateScore(name, p1_score, p2_score) do
    GenServer.call(reg(name), {:updateScore, name, p1_score, p2_score})
  end
  
  def lastMove(name, lm) do
    GenServer.call(reg(name), {:lastMove, name, lm})
  end
  
  def openAll(name, cards1, p1, p2) do
    GenServer.call(reg(name), {:openAll, name, cards1, p1, p2})
  end
  
  def nextRound(name, round1) do
    GenServer.call(reg(name), {:nextRound, name, round1})
  end
  
  def winner(name, winner1) do
    GenServer.call(reg(name), {:winner, name, winner1})
  end
  
  def rejoin(name, player) do
    GenServer.call(reg(name), {:rejoin, name, player})
  end

  def peek(name) do
    GenServer.call(reg(name), {:peek, name})
  end

  def init(game) do
    {:ok, game}
  end

def handle_call({:setPlayer, name, p1}, _from, game) do
    game = Xholes.Game.setPlayer(game, p1)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end

def handle_call({:cardDrawn, name, d1, dc, d, p}, _from, game) do
    game = Xholes.Game.cardDraw(game, d1, dc, d, p)
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
    game = Xholes.Game.chnTurn(game ,cards1 , deck1, turn1 )
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:openCard, name, prev1}, _from, game) do
    game = Xholes.Game.openCard(game ,prev1)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:resetDrawn, name, drawn1, dc }, _from, game) do
    game = Xholes.Game.resetDrawn(game ,drawn1, dc )
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:resetDiscarded, name, discarded1, prev1}, _from, game) do
    game = Xholes.Game.resetDiscarded(game ,discarded1, prev1 )
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:updateScore, name, p1_score, p2_score}, _from, game) do
    game = Xholes.Game.updateScore(game ,p1_score, p2_score )
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:lastMove, name, lm}, _from, game) do
    game = Xholes.Game.lastMove(game , lm)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
 
  
  def handle_call({:openAll, name, cards1, p1, p2}, _from, game) do
    game = Xholes.Game.openAll(game , cards1, p1, p2)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
   def handle_call({:nextRound, name, round1}, _from, game) do
    game = Xholes.Game.nextRound(game , round1)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:winner, name, winner1}, _from, game) do
    game = Xholes.Game.winner(game , winner1)
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:rejoin, name, player}, _from, game) do
    game = Xholes.Game.new();
    game = Xholes.Game.setPlayer(game, player);
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:chat, name }, _from, game) do
    Xholes.BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  def handle_call({:peek, _name}, _from, game) do
    {:reply, game, game}
  end
end
