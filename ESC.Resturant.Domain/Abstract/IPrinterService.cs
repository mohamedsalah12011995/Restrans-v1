using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IPrinterService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IPrinterService
    {

        List<PrinterModel> GetAllPrinters( );
        PrinterModel GetPrinterBy(int id);



        /// <summary>
        /// Insert or update printer depend on printer id if =0 
        /// </summary>
        /// <param name="Printer"></param>
        /// <returns></returns>
        PrinterModel InsertOrUpdate(PrinterModel PrinterModel);

        bool DeletePrinter(int id);
        bool CheckIsPrinterExist(int id);
        void Print(string PrinterName);


    }
}
