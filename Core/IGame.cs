using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface IGame
    {
        string ConnectionTest();
        void PostByRequest(GameInfo insert);
        IEnumerable<GameInfo> GetAll();
        GameInfo GetById(string id);
        IEnumerable<GameInfo> GetByRequest(GameInfo request);
        void PutById(string id, GameInfo update);
        void DeleteById(string id);
    }
}
