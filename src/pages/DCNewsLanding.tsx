import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const DCNewsLanding = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue === '401') {
      navigate('/mythos');
    }
  };

  const newsArticles = [
    {
      id: 1,
      headline: "Metro Announces New Purple Line Extension Plans",
      snippet: "WMATA officials unveiled comprehensive plans for extending the Purple Line through downtown DC, connecting Silver Spring to Bethesda with new stations planned for H Street and Capitol Hill areas.",
      category: "Transportation",
      time: "2 hours ago"
    },
    {
      id: 2,
      headline: "Cherry Blossom Festival Sets Record Attendance",
      snippet: "The National Cherry Blossom Festival concluded with over 1.5 million visitors, marking the highest attendance in the event's history. Peak bloom lasted an unprecedented 12 days this year.",
      category: "Culture",
      time: "4 hours ago"
    },
    {
      id: 3,
      headline: "Capitol Hill Farmers Market Expands Weekend Hours",
      snippet: "Eastern Market's popular farmers market will now operate Saturday and Sunday mornings year-round, featuring local vendors from Maryland and Virginia farms.",
      category: "Local Business",
      time: "6 hours ago"
    },
    {
      id: 4,
      headline: "Smithsonian Opens New Climate Change Exhibition",
      snippet: "The National Museum of Natural History unveils 'Our Planet's Future,' an interactive exhibition exploring climate science and environmental solutions.",
      category: "Science",
      time: "8 hours ago"
    },
    {
      id: 5,
      headline: "DC Housing Authority Announces Affordable Units",
      snippet: "Mayor announces 500 new affordable housing units across Wards 6, 7, and 8, with applications opening next month for income-qualified residents.",
      category: "Housing",
      time: "12 hours ago"
    },
    {
      id: 6,
      headline: "Georgetown Waterfront Park Renovation Complete",
      snippet: "The historic waterfront park reopens with new walking trails, improved lighting, and enhanced public art installations celebrating DC's maritime heritage.",
      category: "Parks",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-6xl font-bold text-white">4</span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">WASHINGTON</span>
                  <span className="text-sm text-blue-200">DC LOCAL NEWS</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                LIVE 24/7
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Breaking News
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Trending Bar */}
        <div className="bg-blue-800/50 py-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-orange-400 font-semibold text-sm">TRENDING</span>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">🚨 DC Police Takeover</span>
                <span className="text-blue-200 text-sm">📍 Reagan National Update</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Live Stream Card */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-blue-800/90 to-blue-700/90 border-blue-600 overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-2">
                  ● LIVE: NBC4
                </div>
                <span className="text-blue-200 text-sm">Watch Now: News4 Streaming 24/7</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Breaking: Trump admin agrees to keep DC police chief in place, but with immigration order
              </h2>
              <div className="flex items-center text-sm text-blue-200">
                <span className="bg-blue-700 px-2 py-1 rounded text-xs mr-3">DC POLICE TAKEOVER</span>
                <span>13 HOURS AGO</span>
              </div>
            </div>
          </Card>
        </section>

        {/* News Grid */}
        <section className="mb-12">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {newsArticles.map((article) => (
              <Card key={article.id} className="bg-white/95 hover:bg-white transition-all border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500 font-medium">{article.time.toUpperCase()}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-3 text-gray-900 font-bold">
                    {article.headline}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {article.snippet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <Card className="max-w-2xl mx-auto bg-white/95 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-900">Search Local News</CardTitle>
              <p className="text-gray-600">
                Find articles, events, and updates from around the DC area
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Search news, events, neighborhoods..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 h-12 border-blue-200 focus:border-blue-500"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-blue-700 hover:bg-blue-800">
                  Search News
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900/80 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-white">Local News</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Capitol Hill</li>
                <li>Georgetown</li>
                <li>Dupont Circle</li>
                <li>Adams Morgan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Government</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>DC Council</li>
                <li>Mayor's Office</li>
                <li>Federal Updates</li>
                <li>Public Records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Events</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Cultural Events</li>
                <li>Food & Dining</li>
                <li>Sports</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Weather</li>
                <li>Traffic</li>
                <li>Metro Updates</li>
                <li>Emergency Alerts</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>&copy; 2024 DC Local News. All rights reserved. <span className="text-xs text-blue-300">1</span></p>
            <p className="mt-2 text-xs text-blue-300">Stay informed with News<span className="text-white font-bold">4</span> Washington • <span className="text-blue-300">0</span>% bias guarantee</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DCNewsLanding;