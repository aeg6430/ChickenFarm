using Core;
using DapperUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

using RouteAttribute = System.Web.Http.RouteAttribute;


namespace BackendAPI.Controllers
{
    [EnableCors(origins: "https://localhost:44314", headers: "*", methods: "*")] 


    public class UserController : ApiController
    {
        IUser user = new DapperUser.DapperUser();
        // GET: api/User
        public IEnumerable<UserInfo> Get()
        {
            return user.GetAll();
        }

        // GET: api/User/5
        public UserInfo Get(string id)
        {
            return user.GetById(id);
        }

        
        [Route("api/UserPostByRequest")]
        public IEnumerable<UserInfo> PostByRequest([FromBody] UserInfo request)
        {
            return user.GetByRequest(request);
        }


        // POST: api/User
        public void Post([FromBody] UserInfo insert)
        {
            this.user.PostByRequest(insert);
        }


        // PUT: api/User/5
        public void Put(string id, [FromBody] UserInfo update)
        {
            this.user.PutById(id, update);
        }




    }
}
