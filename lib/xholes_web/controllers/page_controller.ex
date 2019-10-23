defmodule XholesWeb.PageController do
  use XholesWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def xholes(conn, %{"x" => x,"y" => y}) do
    render(conn, "xholes.html", x: x, y: y )
  end
end
