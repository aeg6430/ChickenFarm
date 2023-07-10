using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChickenFarm.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult LandingPage()
        {


            return View();
        }
        public ActionResult Index()
        {
            return View();
        
        }

        public ActionResult SettingPage()
        {
            return View();
           
        }

        public ActionResult RankingPage()
        {
            return View();

        }

        public ActionResult StorePage()
        {
            return View();

        }






    }
}