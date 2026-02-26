import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Clock, Cloud, Thermometer, Wind, ExternalLink, Mail } from 'lucide-react';
import { useDCNews } from '@/hooks/useDCNews';

const DCNewsLanding = () => {
  const [searchValue, setSearchValue] = useState('');
  const { articles, loading } = useDCNews();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hidden shortcut: typing "137" redirects to james_library
    if (searchValue === '137') {
      window.location.href = 'https://github.com/topherchris420/james_library';
    }
  };

  const navLinks = ['Local', 'Politics', 'Crime & Safety', 'Weather', 'Traffic', 'Sports', 'Entertainment', 'Contact'];

  const sidebarStories = [
    "Council approves new bike lane network for NW",
    "Nationals announce spring training roster changes",
    "Local chef wins James Beard Award nomination",
    "New art installation opens at Union Market",
    "Weekend road closures planned for Marathon prep",
  ];

  const isContactPage = searchValue.toLowerCase() === 'contact';

  // Format published time
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Get current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Current weather (simulated)
  const [weather] = useState({
    temp: 58,
    condition: 'Partly Cloudy',
    high: 64,
    low: 41,
    wind: 'NW 8 mph'
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> {weather.temp}°F</span>
            <span className="flex items-center gap-1"><Cloud className="h-3 w-3" /> {weather.condition}</span>
            <span className="flex items-center gap-1"><Wind className="h-3 w-3" /> {weather.wind}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{today}</span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <button key={link} className="px-4 py-2.5 text-sm font-medium hover:bg-blue-800 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-white/50">
                  {link}
                </button>
              ))}
            </div>
            <a
              href="mailto:ciao_chris@proton.me"
              className="px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Breaking News Ticker */}
      <div className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-3 text-sm">
          <span className="bg-white text-red-700 px-2 py-0.5 rounded-sm text-xs font-black tracking-wide shrink-0">BREAKING</span>
          <p className="truncate font-medium">
            {loading ? 'Loading latest news...' : articles[0]?.title || 'Refresh for latest updates'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-0">
            {/* Lead Story */}
            {articles.length > 0 && (
              <article className="bg-white border border-gray-200 p-6 mb-4">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Top Story</span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  {articles[0].title}
                </h1>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {articles[0].description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatTime(articles[0].publishedAt)}</span>
                  <span>|</span>
                  <span>By {articles[0].source.name}</span>
                  <a
                    href={articles[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline ml-auto"
                  >
                    Read more <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            )}

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-5 animate-pulse">
                    <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded mt-4"></div>
                  </div>
                ))
              ) : (
                articles.slice(1, 5).map((article, idx) => (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow group cursor-pointer"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5">
                        {article.source.name}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatTime(article.publishedAt)}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* More Articles */}
            {!loading && articles.length > 5 && (
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {articles.slice(5, 9).map((article) => (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200 p-4 hover:shadow-md transition-shadow group cursor-pointer"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-1 leading-snug group-hover:text-blue-900 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {formatTime(article.publishedAt)}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Weather Widget */}
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b-2 border-blue-900 pb-2 mb-3">Weather</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-light text-gray-800">{weather.temp}°</span>
                  <p className="text-xs text-gray-500 mt-1">{weather.condition}</p>
                </div>
                <div className="text-right text-xs text-gray-500 space-y-1">
                  <p>High: {weather.high}°F</p>
                  <p>Low: {weather.low}°F</p>
                  <p>Wind: {weather.wind}</p>
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

            {/* Contact CTA */}
            <div className="bg-red-600 text-white p-4">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2">Get In Touch</h3>
              <p className="text-xs text-red-100 mb-3">Have a story tip or want to connect?</p>
              <a
                href="mailto:ciao_chris@proton.me"
                className="flex items-center justify-center gap-2 w-full h-10 bg-white text-red-700 hover:bg-gray-100 rounded-sm text-sm font-bold transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
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
