using AutoMapper;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESC.Resturant.Domain.Concrete
{
    public class StockService : BaseService, IStockService
    {
        public StockService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }
        public bool CheckIsStockExist(int id)
        {
            return dbcontext.Stocks.Any(e => e.Id == id);
        }

        public bool DeleteStock(int id)
        {
            try
            {
                ///get obj for delete 
                var stock = dbcontext.Stocks.Find(id);

                ///remove obj from db context 
                dbcontext.Stocks.Remove(stock);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public StockModel GetStock(int Id)
        {
            try
            {
                ///retrive  ItemPrice  (Entitiy).
                var Stock = dbcontext.Stocks.Find(Id);
                ///cast entitiy to model 
                var StockModel = mapper.Map<StockModel>(Stock);

                ///return model
                return StockModel;
            }
            catch
            {
                return null;
            }
        }

        public List<StockModel> GetStocks()
        {
            try
            {
                ///retrive list of ItemPrice (Entities).
                var listStocks = dbcontext.Stocks.ToList();
                ///cast entities to models 
                var StockModelList = mapper.Map<List<StockModel>>(listStocks);

                ///return models 
                return StockModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public StockModel InsertOrUpdate(StockModel stock)
        {
            if (stock.Id > 0)  ///Update itemPrice 
            {
                ///Get itemPrice entity from database by id 
                var _stock = dbcontext.Stocks.Find(stock.Id);
                if (_stock != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from itemPriceModel to itemPrice 
                        var mappedstock = mapper.Map<StockModel, Stock>(stock, _stock);
                        dbcontext.Stocks.Update(mappedstock);
                        dbcontext.SaveChanges();

                        //  return true;
                        return stock;
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
                    var mappedstock = mapper.Map<Stock>(stock);
                    dbcontext.Stocks.Add(mappedstock);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return stock;
                }
                catch(Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }
    }
}
