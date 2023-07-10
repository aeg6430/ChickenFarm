using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface IUser
    {
        string ConnectionTest();
        void PostByRequest(UserInfo insert);
        IEnumerable<UserInfo> GetAll();
        UserInfo GetById(string id);
        IEnumerable<UserInfo> GetByRequest(UserInfo request);
        void PutById(string id, UserInfo update);
        
    }
}
