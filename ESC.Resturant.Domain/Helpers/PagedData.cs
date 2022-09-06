using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Helpers
{
  public  class PagedData<T>
    {
        public int TotalCount { get; set; }
        public IEnumerable<T> Items { get; set; }
        
    }
}
