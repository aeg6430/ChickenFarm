using Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace BackendAPI.Controllers
{
    [EnableCors(origins: "https://localhost:44314", headers: "*", methods: "*")]


    public class GameController : ApiController
    {
        IGame game = new DapperGame.DapperGame();

        // POST: api/Game
        public void Post([FromBody] GameInfo insert)
        {
            this.game.PostByRequest(insert);
        }
        // GET: api/Game
        public IEnumerable<GameInfo> Get()
        {
            return game.GetAll();
        }
        // GET: api/Game/5
        public GameInfo Get(string id)
        {
            return game.GetById(id);
        }
        [System.Web.Http.Route("api/GameGetByRequest")]
        public IEnumerable<GameInfo> PostByRequest([FromBody] GameInfo request)
        {
            return game.GetByRequest(request);
        }
        // PUT: api/Game/5
        public void Put(string id, [FromBody] GameInfo update)
        {
            this.game.PutById(id, update);
        }
        // DELETE: api/Game/5
        public void DELETE(string id)
        {
            this.game.DeleteById(id);
        }

        

    }
}
