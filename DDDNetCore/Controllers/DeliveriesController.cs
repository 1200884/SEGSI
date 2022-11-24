using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Deliveries;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveriesController(DeliveryService service)
        {
            _service = service;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/D1
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(String id)
        {
            var del = await _service.GetByIdAsync(new DeliveryId(id));

            if (del == null)
            {
                return NotFound();
            }

            return del;
        }

        // POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(DeliveryDto dto)
        {
            var del = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = del.Id }, del);
        }

        // PUT: api/Deliveries/D5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(String id,DeliveryDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var del = await _service.UpdateAsync(dto);
                
                if (del == null)
                {
                    return NotFound();
                }
                return Ok(del);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Deliveries/D5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(String id)
        {
            var del = await _service.InactivateAsync(new DeliveryId(id));

            if (del == null)
            {
                return NotFound();
            }

            return Ok(del);
        }

        // DELETE: api/Deliveries/D5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(String id)
        {
            try
            {
                var del = await _service.DeleteAsync(new DeliveryId(id));

                if (del == null)
                {
                    return NotFound();
                }

                return Ok(del);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}