using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using ProbeAufgabe.Models;

namespace ProbeAufgabe.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PosMsgsController : ControllerBase
    {
        private readonly PosMsgContext _context;

        public PosMsgsController(PosMsgContext context)
        {
            _context = context;
        }

        
        // GET: api/PosMsgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PosMsg>>> GetPosMsg()
        {
            
            var source = await _context.PosMsg.ToListAsync();
            //Grouping for Unit and Gpts, I need to get the last Unit
            var unitGpstGroup = source.GroupBy(c1 => c1.Unit, c2 => c2.GpsT, (c1, c2) => new { Unit = c1, Gpts = c2 }); 
            //Getting the last Unit with Gpst Date Time            
            var unitGpts = unitGpstGroup.Select(item => new { Unit = item.Unit, Gpts = item.Gpts.OrderByDescending(datetimeRecord => datetimeRecord.ToLocalTime()).ToArray()[0] });
            //Joining the source with the table of unit with the single Gpts, I get all records for the last Units
            var srcJoinUnit = source.Join(unitGpts,
                                     src => src.Unit.ToString() + src.GpsT.ToString(),
                                     unitGptsInner => unitGptsInner.Unit.ToString() + unitGptsInner.Gpts.ToString(),
                                     (fromTab, innerTab) => new { rc = fromTab.Id, inner = innerTab.Unit});
            //Removing of duplicates, Could be for UnitGpts key more records 
            var recorsIds = srcJoinUnit.GroupBy(g => g.inner).Select(k => new { ID = k.First().rc });
            //I get all record with unique and last in GpsTime Units without duplicates
            var result = source.Join(recorsIds, src => src.Id, srcJoinUnit => srcJoinUnit.ID, (src, inner) => src);
            
            return result.ToList();

        }

        // GET: api/PosMsgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PosMsg>> GetPosMsg(long id)
        {
            var posMsg = await _context.PosMsg.FindAsync(id);

            if (posMsg == null)
            {
                return NotFound();
            }

            return posMsg;
        }

        // PUT: api/PosMsgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosMsg(long id, PosMsg posMsg)
        {
            if (id != posMsg.Id)
            {
                return BadRequest();
            }

            _context.Entry(posMsg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PosMsgExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PosMsgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PosMsg>> PostPosMsg(PosMsg posMsg)
        {
            _context.PosMsg.Add(posMsg);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PosMsgExists(posMsg.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPosMsg", new { id = posMsg.Id }, posMsg);
        }

        // DELETE: api/PosMsgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PosMsg>> DeletePosMsg(long id)
        {
            var posMsg = await _context.PosMsg.FindAsync(id);
            if (posMsg == null)
            {
                return NotFound();
            }

            _context.PosMsg.Remove(posMsg);
            await _context.SaveChangesAsync();

            return posMsg;
        }

        private bool PosMsgExists(long id)
        {
            return _context.PosMsg.Any(e => e.Id == id);
        }
    }
}
