using AutoMapper;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System.Drawing.Printing;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace ESC.Resturant.Domain.Concrete
{
    public class PrinterService : BaseService, IPrinterService
    {


        public PrinterService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }


        public bool DeletePrinter(int id)
        {
            try
            {
                ///get obj for delete 
                var printer = dbcontext.Printers.Find(id);

                ///remove obj from db context 
                dbcontext.Printers.Remove(printer);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<PrinterModel> GetAllPrinters()
        {
            try
            {
                ///retrive list of printers (Entities).
                var listprinters = dbcontext.Printers.ToList();
                ///cast entities to models 
                var PrintersModelList = mapper.Map<List<PrinterModel>>(listprinters);

                ///return models 
                return PrintersModelList;
            }
            catch(Exception e)
            {
                return null;
            }
        }



        /// <summary>
        /// get Printer By Id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public PrinterModel GetPrinterBy(int id)
        {
            try
            {
                ///retrive  printer  (Entitiy).
                var printer = dbcontext.Printers.Find(id);
                ///cast entitiy to model 
                var PrinterModel = mapper.Map<PrinterModel>(printer);

                ///return model
                return PrinterModel;
            }
            catch
            {
                return null;
            }
        }

        public PrinterModel InsertOrUpdate(PrinterModel PrinterModel)
        {
            if (PrinterModel.Id > 0)  ///Update Printer 
            {
                ///Get Printer entity from database by id 
                var printer = dbcontext.Printers.Find(PrinterModel.Id);
                if (printer != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from printermodel to printer 
                        var mappedprinter = mapper.Map<PrinterModel, Printer>(PrinterModel, printer);
                        dbcontext.Printers.Update(mappedprinter);
                        dbcontext.SaveChanges();

                        //  return true;
                        return PrinterModel;
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
                else { return null; }
            }
            else
            {
                try
                {
                    var mappedprinter = mapper.Map<Printer>(PrinterModel);
                    dbcontext.Printers.Add(mappedprinter);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return PrinterModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
            // return false;
        }
        public bool CheckIsPrinterExist(int id)
        {
            throw new NotImplementedException();
        }

        public void Print(string PrinterName)
        {

            PrintDocument pd = new PrintDocument();
            pd.DocumentName = "E:\\wwwroot\\ff.pdf";
            pd.PrinterSettings.PrinterName = PrinterName;
            pd.Print();
        }
    }
}
