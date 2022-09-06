using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Angular5FileUpload.Controllers

{

    [Produces("application/json")]

    [Route("api/Upload")]

    public class UploadController : Controller

    {

        private IHostingEnvironment _hostingEnvironment;



        public UploadController(IHostingEnvironment hostingEnvironment)

        {

            _hostingEnvironment = hostingEnvironment;

        }
        [HttpGet]
        public ActionResult GetImg()
        {
            var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "img");
            return Ok(webRootPath);
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFile_Item")]
        public ActionResult UploadFile_Item()

        {

            try

            {

                var file = Request.Form.Files[0];

                string folderName = "img";

                //string webRootPath = _hostingEnvironment.WebRootPath;
                var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files");

                //string webRootPath = "ClientApp\\dist\\assets\\img";

                string newPath = Path.Combine(webRootPath, folderName);

                if (!Directory.Exists(newPath))

                {

                    Directory.CreateDirectory(newPath);

                }
                if (file.Length > 0)

                {

                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');


                    var _guid = Guid.NewGuid() + Path.GetExtension(fileName);

                    string fullPath = Path.Combine(newPath, _guid);

                    using (var stream = new FileStream(fullPath, FileMode.Create))

                    {

                        file.CopyTo(stream);

                    }
                    return Ok(_guid);

                }

                return BadRequest(" Error  in Copy Image");

            }

            catch (System.Exception ex)

            {

                return Json("Upload Failed: " + ex.Message);

            }

        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFileItem")]
        public async Task<string> UploadFile([FromForm] IFormFile file)
        {
            try
            {
                string fileName = null;
                if (file.Length > 0)
                {
                    var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "Item");
                    if (!Directory.Exists(webRootPath)){ Directory.CreateDirectory(webRootPath);}
                    fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    string fullPath = Path.Combine(webRootPath, fileName);
                    using (FileStream fileStream = System.IO.File.Create(fullPath))
                    {
                        await file.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
                return fileName;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFileCategory")]
        public async Task<string> UploadFileCategory([FromForm] IFormFile file)
        {
            try
            {
                string fileName = null;
                if (file.Length > 0)
                {
                    var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "Category");

                    if (!Directory.Exists(webRootPath)) { Directory.CreateDirectory(webRootPath); }
                    fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    string fullPath = Path.Combine(webRootPath, fileName);
                    using (FileStream fileStream = System.IO.File.Create(fullPath))
                    {
                        await file.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
                return fileName;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFileUser")]
        public async Task<string> UploadFileUser([FromForm] IFormFile file)
        {
            try
            {
                string fileName = null;
                if (file.Length > 0)
                {
                    var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "User");

                    if (!Directory.Exists(webRootPath)) { Directory.CreateDirectory(webRootPath); }
                    fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    string fullPath = Path.Combine(webRootPath, fileName);
                    using (FileStream fileStream = System.IO.File.Create(fullPath))
                    {
                        await file.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
                return fileName;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFileApplication")]
        public async Task<string> UploadFileApplication([FromForm] IFormFile file)
        {
            try
            {
                string fileName = null;
                if (file.Length > 0)
                {
                    var webRootPath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "Application");

                    if (!Directory.Exists(webRootPath)) { Directory.CreateDirectory(webRootPath); }
                    fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    string fullPath = Path.Combine(webRootPath, fileName);
                    using (FileStream fileStream = System.IO.File.Create(fullPath))
                    {
                        await file.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
                return fileName;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

    }

}