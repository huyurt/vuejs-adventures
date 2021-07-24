using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Travel.Application.Common.Interfaces;
using Travel.Application.Dtos.Tour;

namespace Travel.Application.TourLists.Queries.GetTours
{
    public class GetToursQuery : IRequest<ToursVm>
    {
    }

    public class GetToursQueryHandler : IRequestHandler<GetToursQuery, ToursVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _distributedCache;

        public GetToursQueryHandler(IApplicationDbContext context, IMapper mapper, IDistributedCache distributedCache)
        {
            _context = context;
            _mapper = mapper;
            _distributedCache = distributedCache;
        }

        public async Task<ToursVm> Handle(GetToursQuery request, CancellationToken cancellationToken)
        {
            const string cacheKey = "GetTours";
            ToursVm tourLists = new ToursVm
            {
                Lists = await _context.TourLists
                    .ProjectTo<TourListDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.City)
                    .ToListAsync(cancellationToken)
            };

            return tourLists;
        }
    }
}