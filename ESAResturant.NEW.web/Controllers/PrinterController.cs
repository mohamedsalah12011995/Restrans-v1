using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Management;
using System.Threading.Tasks;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Printer")]
    public class PrinterController : Controller
    {
        private IPrinterService PrinterService;


        public PrinterController(IPrinterService _printerService)
        {
            PrinterService = _printerService;
        }
        // GET: api/Printer
        [HttpGet]
        [Route("GetPrinters")]
        public IEnumerable<PrinterModel> GetAllPrinters()
        {
            return PrinterService.GetAllPrinters().ToList();
        }

        // GET: api/Printer/5
        [HttpGet]
        [Route("GetPrintersById")]
        public PrinterModel GetPrinterById(int id)
        {
            return PrinterService.GetPrinterBy(id);
        }

        // POST: api/Printer
        [HttpPost]
        [Route("InsertOrUpdatePrinter")]
        public void Post([FromBody] PrinterModel PrinterModel)
        {
            PrinterService.InsertOrUpdate(PrinterModel);
        }


        [HttpDelete]
        [Route("DeletePrinter")]
        public void Delete(int id)
        {
            PrinterService.DeletePrinter(id);
        }


        [HttpGet]
        [Route("GetAllPrinterDevice")]
        public IActionResult GetAllPrinterDevice()
        {
            // USING WMI. (WINDOWS MANAGEMENT INSTRUMENTATION)

            System.Management.ManagementScope objMS =
                new System.Management.ManagementScope(ManagementPath.DefaultPath);
            objMS.Connect();

            SelectQuery objQuery = new SelectQuery("SELECT * FROM Win32_Printer");
            ManagementObjectSearcher objMOS = new ManagementObjectSearcher(objMS, objQuery);
            System.Management.ManagementObjectCollection objMOC = objMOS.Get();
            //var _result = object;
            List<string> _result = new List<string>();


            foreach (ManagementObject Printers in objMOC)
            {
                _result.Add(Printers["Name"].ToString());
            }

            //List<string> _result = new List<string>();

            //foreach (string sPrinters in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
            //{
            //    _result.Add(sPrinters);
            //}

            // var result = System.Drawing.Printing.PrinterSettings.InstalledPrinters;
            return Ok(_result);
        }
        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    PrinterService.DeletePrinter(id);
        //}       
        [HttpPost]
        [Route("CunfirmPrint")]
        public void Print(string printerName)
        {
            PrinterService.Print(printerName);
        }
    }
}
