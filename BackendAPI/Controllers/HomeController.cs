using DapperUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BackendAPI.Controllers
{
    public class HomeController : Controller
    {
        DapperUser.DapperUser user = new DapperUser.DapperUser();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
