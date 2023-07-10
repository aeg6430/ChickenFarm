using System.Web;
using System.Web.Optimization;

namespace ChickenFarm
{
    public class BundleConfig
    {
        // 如需統合的詳細資訊，請瀏覽 https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/Vue.js").Include(
                        "~/Scripts/Vue.js"));
            bundles.Add(new ScriptBundle("~/bundles/vueVM.js").Include(
                       "~/Scripts/vueVM.js"));



        }
    }
}
