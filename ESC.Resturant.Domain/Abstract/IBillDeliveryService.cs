using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IBillDeliveryService
    {
        List<BillDeliveriesModel> GetAllBillDelivery();
        BillDeliveriesModel InsertOrUpdate(BillDeliveriesModel billDeliveryModel);

    }
}
