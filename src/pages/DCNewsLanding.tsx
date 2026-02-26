import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Clock, ChevronRight, Cloud, Thermometer, Wind } from 'lucide-react';

const DCNewsLanding = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue === '401') {
      navigate('/mythos');
    }
  };

  const navLinks = ['Local', 'Politics', 'Crime & Safety', 'Weather', 'Traffic', 'Sports', 'Entertainment'];

  const newsArticles = [
    {
      id: 1,
      headline: "Metro Announces New Purple Line Extension Plans",
      snippet: "WMATA officials unveiled comprehensive plans for extending the Purple Line through downtown DC, connecting Silver Spring to Bethesda with new stations planned for H Street and Capitol Hill areas.",
      category: "Transportation",
      time: "2 hours ago",
      author: "Sarah Mitchell"
    },
    {
      id: 2,
      headline: "Cherry Blossom Festival Sets Record Attendance",
      snippet: "The National Cherry Blossom Festival concluded with over 1.5 million visitors, marking the highest attendance in the event's history. Peak bloom lasted an unprecedented 12 days this year.",
      category: "Culture",
      time: "4 hours ago",
      author: "James Rivera"
    },
    {
      id: 3,
      headline: "Capitol Hill Farmers Market Expands Weekend Hours",
      snippet: "Eastern Market's popular farmers market will now operate Saturday and Sunday mornings year-round, featuring local vendors from Maryland and Virginia farms.",
      category: "Local Business",
      time: "6 hours ago",
      author: "Linda Park"
    },
    {
      id: 4,
      headline: "Smithsonian Opens New Climate Change Exhibition",
      snippet: "The National Museum of Natural History unveils 'Our Planet's Future,' an interactive exhibition exploring climate science and environmental solutions.",
      category: "Science",
      time: "8 hours ago",
      author: "David Chen"
    },
    {
      id: 5,
      headline: "DC Housing Authority Announces Affordable Units",
      snippet: "Mayor announces 500 new affordable housing units across Wards 6, 7, and 8, with applications opening next month for income-qualified residents.",
      category: "Housing",
      time: "12 hours ago",
      author: "Maria Santos"
    },
    {
      id: 6,
      headline: "Georgetown Waterfront Park Renovation Complete",
      snippet: "The historic waterfront park reopens with new walking trails, improved lighting, and enhanced public art installations celebrating DC's maritime heritage.",
      category: "Parks",
      time: "1 day ago",
      author: "Tom Bradley"
    }
  ];

  const sidebarStories = [
    "Council approves new bike lane network for NW",
    "Nationals announce spring training roster changes",
    "Local chef wins James Beard Award nomination",
    "New art installation opens at Union Market",
    "Weekend road closures planned for Marathon prep",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> 58°F</span>
            <span className="flex items-center gap-1"><Cloud className="h-3 w-3" /> Partly Cloudy</span>
            <span className="flex items-center gap-1"><Wind className="h-3 w-3" /> 8 mph NW</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Wednesday, February 26, 2026</span>
            <span className="text-blue-300">|</span>
            <span className="text-red-400 font-semibold animate-pulse">● LIVE</span>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header className="bg-white border-b-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-blue-900 leading-none tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>4</span>
              <div className="flex flex-col ml-1">
                <span className="text-2xl font-black text-blue-900 tracking-wide leading-tight" style={{ fontFamily: 'Georgia, serif' }}>WASHINGTON</span>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">DC Local News & Updates</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Search stories..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-8 h-8 w-48 text-sm border-gray-300 rounded-sm bg-gray-50"
                />
              </div>
              <Button type="submit" size="sm" className="h-8 bg-blue-900 hover:bg-blue-800 rounded-sm text-xs px-3">
                Go
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => (
              <button key={link} className="px-4 py-2.5 text-sm font-medium hover:bg-blue-800 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-white/50">
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Breaking News Ticker */}
      <div className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-3 text-sm">
          <span className="bg-white text-red-700 px-2 py-0.5 rounded-sm text-xs font-black tracking-wide shrink-0">BREAKING</span>
          <p className="truncate font-medium">Trump admin agrees to keep DC police chief in place, but with immigration order — Full coverage at NBC<span className="font-bold">4</span></p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-0">
            {/* Lead Story */}
            <article className="bg-white border border-gray-200 p-6 mb-4">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Top Story</span>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Breaking: DC Police Chief to Remain, Administration Issues New Immigration Order
              </h1>
              <p className="text-gray-600 leading-relaxed mb-3">
                In a developing story, the Trump administration has agreed to maintain the current DC police chief's position in exchange for compliance with a new federal immigration enforcement directive affecting the District.
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 13 hours ago</span>
                <span>|</span>
                <span>By Staff Reports</span>
              </div>
            </article>

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {newsArticles.map((article, idx) => (
                <article key={article.id} className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.headline}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {article.snippet}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span>{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.time}</span>
                  </div>
                  {/* cryptic 0 hidden in the 4th article */}
                  {idx === 3 && <span className="text-[0px] select-none" aria-hidden="true">0</span>}
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Weather Widget */}
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b-2 border-blue-900 pb-2 mb-3">Weather</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-light text-gray-800">58°</span>
                  <p className="text-xs text-gray-500 mt-1">Partly Cloudy</p>
                </div>
                <div className="text-right text-xs text-gray-500 space-y-1">
                  <p>High: 64°F</p>
                  <p>Low: 4<span className="text-gray-500">1</span>°F</p>
                  <p>Wind: NW 8 mph</p>
                </div>
              </div>
            </div>

            {/* Most Read */}
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b-2 border-red-600 pb-2 mb-3">Most Read</h3>
              <ol className="space-y-3">
                {sidebarStories.map((story, i) => (
                  <li key={i} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-2xl font-black text-gray-200 leading-none">{i + 1}</span>
                    <p className="text-sm text-gray-700 leading-snug group-hover:text-blue-900 transition-colors font-medium pt-0.5">
                      {story}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-blue-900 text-white p-4">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2">Daily Briefing</h3>
              <p className="text-xs text-blue-200 mb-3">Get DC's top stories in your inbox every morning.</p>
              <Input placeholder="Email address" className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-blue-300 rounded-sm mb-2" />
              <Button className="w-full h-8 bg-white text-blue-900 hover:bg-gray-100 rounded-sm text-xs font-bold">
                Subscribe
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden bg-white border border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Search stories..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-8 h-9 text-sm border-gray-300 rounded-sm"
                  />
                </div>
                <Button type="submit" className="w-full h-9 bg-blue-900 hover:bg-blue-800 rounded-sm text-sm">
                  Search
                </Button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Neighborhoods</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="hover:text-white cursor-pointer">Capitol Hill</li>
                <li className="hover:text-white cursor-pointer">Georgetown</li>
                <li className="hover:text-white cursor-pointer">Dupont Circle</li>
                <li className="hover:text-white cursor-pointer">Adams Morgan</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Government</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="hover:text-white cursor-pointer">DC Council</li>
                <li className="hover:text-white cursor-pointer">Mayor's Office</li>
                <li className="hover:text-white cursor-pointer">Federal Updates</li>
                <li className="hover:text-white cursor-pointer">Public Records</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Sections</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="hover:text-white cursor-pointer">Investigations</li>
                <li className="hover:text-white cursor-pointer">Opinion</li>
                <li className="hover:text-white cursor-pointer">Obituaries</li>
                <li className="hover:text-white cursor-pointer">Classifieds</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Connect</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="hover:text-white cursor-pointer">Tip Line</li>
                <li className="hover:text-white cursor-pointer">Advertise</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <p>&copy; 2026 Washington <span className="font-bold text-white">4</span> News. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Accessibility</span>
              <span className="text-gray-700">v1.<span className="text-gray-700">0</span></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DCNewsLanding;
