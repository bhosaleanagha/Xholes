defmodule XholesWeb.PageController do
  use XholesWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def xholes(conn, %{"name" => name}) do
    render(conn, "xholes.html", name: name)
  end
end
